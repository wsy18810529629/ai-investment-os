#!/usr/bin/env python3
"""WealthOS local sync server. Standard-library only."""
from __future__ import annotations

import hashlib
import hmac
import json
import mimetypes
import os
import secrets
import sqlite3
import time
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
RESEARCH_ROOT = ROOT.parent / "investment_system"
DATA_ROOT = ROOT / "data"
DB_PATH = DATA_ROOT / "wealthos.db"
SESSION_DAYS = 30
MAX_BODY = 1_000_000


def connect():
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    db.execute("PRAGMA foreign_keys=ON")
    return db


def initialize():
    DATA_ROOT.mkdir(exist_ok=True)
    with connect() as db:
        db.executescript("""
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          username TEXT NOT NULL UNIQUE COLLATE NOCASE,
          password_hash BLOB NOT NULL,
          salt BLOB NOT NULL,
          created_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS sessions (
          token_hash BLOB PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS user_state (
          user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          revision INTEGER NOT NULL DEFAULT 1,
          state_json TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        );
        """)
        db.execute("DELETE FROM sessions WHERE expires_at < ?", (int(time.time()),))


def password_hash(password: str, salt: bytes) -> bytes:
    return hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 600_000, dklen=32)


def token_digest(token: str) -> bytes:
    return hashlib.sha256(token.encode()).digest()


class WealthHandler(BaseHTTPRequestHandler):
    server_version = "WealthOS/1.1"

    def log_message(self, fmt, *args):
        print(f"[{self.log_date_time_string()}] {self.address_string()} {fmt % args}")

    def json_response(self, status, payload, headers=None):
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        for key, value in (headers or {}).items():
            self.send_header(key, value)
        self.end_headers()
        self.wfile.write(body)

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0 or length > MAX_BODY:
            raise ValueError("请求大小不合法")
        return json.loads(self.rfile.read(length))

    def same_origin(self):
        origin = self.headers.get("Origin")
        if not origin:
            return True
        parsed = urlparse(origin)
        return parsed.netloc == self.headers.get("Host") and parsed.scheme in {"http", "https"}

    def current_user(self):
        cookie = SimpleCookie(self.headers.get("Cookie", ""))
        morsel = cookie.get("wealthos_session")
        if not morsel:
            return None
        with connect() as db:
            return db.execute("""SELECT users.id, users.username FROM sessions
              JOIN users ON users.id=sessions.user_id
              WHERE sessions.token_hash=? AND sessions.expires_at>?""",
              (token_digest(morsel.value), int(time.time()))).fetchone()

    def require_user(self):
        user = self.current_user()
        if not user:
            self.json_response(HTTPStatus.UNAUTHORIZED, {"error": "请先登录"})
        return user

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/me":
            user = self.current_user()
            return self.json_response(200, {"authenticated": bool(user), "username": user["username"] if user else None})
        if path == "/api/state":
            user = self.require_user()
            if not user: return
            with connect() as db:
                row = db.execute("SELECT revision,state_json,updated_at FROM user_state WHERE user_id=?", (user["id"],)).fetchone()
            payload = json.loads(row["state_json"]) if row else {}
            return self.json_response(200, {"revision": row["revision"] if row else 0, "updatedAt": row["updated_at"] if row else None, "state": payload})
        return self.serve_static(path)

    def do_POST(self):
        if not self.same_origin():
            return self.json_response(HTTPStatus.FORBIDDEN, {"error": "拒绝跨站写入"})
        path = urlparse(self.path).path
        try:
            data = self.read_json()
        except Exception:
            return self.json_response(HTTPStatus.BAD_REQUEST, {"error": "请求格式错误"})
        if path == "/api/register": return self.register(data)
        if path == "/api/login": return self.login(data)
        if path == "/api/logout": return self.logout()
        if path == "/api/state": return self.save_state(data)
        return self.json_response(HTTPStatus.NOT_FOUND, {"error": "接口不存在"})

    def register(self, data):
        username = str(data.get("username", "")).strip()
        password = str(data.get("password", ""))
        if not (2 <= len(username) <= 32) or len(password) < 8:
            return self.json_response(400, {"error": "用户名需 2-32 字符，密码至少 8 位"})
        salt = secrets.token_bytes(16)
        try:
            with connect() as db:
                cursor = db.execute("INSERT INTO users(username,password_hash,salt,created_at) VALUES(?,?,?,?)", (username, password_hash(password, salt), salt, int(time.time())))
                user_id = cursor.lastrowid
                db.execute("""INSERT INTO user_state(user_id,state_json,updated_at) VALUES(?,?,?)
                  ON CONFLICT(user_id) DO UPDATE SET revision=1,state_json='{}',updated_at=excluded.updated_at""", (user_id, "{}", int(time.time())))
        except sqlite3.IntegrityError:
            return self.json_response(409, {"error": "用户名已存在"})
        return self.start_session(user_id, username)

    def login(self, data):
        username = str(data.get("username", "")).strip()
        password = str(data.get("password", ""))
        with connect() as db:
            row = db.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
        if not row or not hmac.compare_digest(password_hash(password, row["salt"]), row["password_hash"]):
            time.sleep(.25)
            return self.json_response(401, {"error": "用户名或密码错误"})
        return self.start_session(row["id"], row["username"])

    def start_session(self, user_id, username):
        token = secrets.token_urlsafe(32)
        expires = int(time.time()) + SESSION_DAYS * 86400
        with connect() as db:
            db.execute("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)", (token_digest(token), user_id, expires))
        cookie = f"wealthos_session={token}; Path=/; HttpOnly; SameSite=Strict; Max-Age={SESSION_DAYS * 86400}"
        return self.json_response(200, {"ok": True, "username": username}, {"Set-Cookie": cookie})

    def logout(self):
        cookie = SimpleCookie(self.headers.get("Cookie", ""))
        if cookie.get("wealthos_session"):
            with connect() as db: db.execute("DELETE FROM sessions WHERE token_hash=?", (token_digest(cookie["wealthos_session"].value),))
        return self.json_response(200, {"ok": True}, {"Set-Cookie": "wealthos_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"})

    def save_state(self, data):
        user = self.require_user()
        if not user: return
        state = data.get("state")
        if not isinstance(state, dict):
            return self.json_response(400, {"error": "state 必须是对象"})
        encoded = json.dumps(state, ensure_ascii=False, separators=(",", ":"))
        if len(encoded.encode()) > 800_000:
            return self.json_response(413, {"error": "数据过大"})
        with connect() as db:
            db.execute("""INSERT INTO user_state(user_id,revision,state_json,updated_at) VALUES(?,1,?,?)
              ON CONFLICT(user_id) DO UPDATE SET revision=revision+1,state_json=excluded.state_json,updated_at=excluded.updated_at""",
              (user["id"], encoded, int(time.time())))
            row = db.execute("SELECT revision,updated_at FROM user_state WHERE user_id=?", (user["id"],)).fetchone()
        return self.json_response(200, {"ok": True, "revision": row["revision"], "updatedAt": row["updated_at"]})

    def serve_static(self, request_path):
        relative = unquote(request_path).lstrip("/") or "index.html"
        if relative in {"investment_system/data/latest_scores.json", "investment_system/data/latest_news.json"}:
            target = (RESEARCH_ROOT / relative.removeprefix("investment_system/")).resolve()
        else:
            target = (ROOT / relative).resolve()
            if ROOT not in target.parents and target != ROOT:
                return self.send_error(403)
        if not target.is_file():
            return self.send_error(404)
        body = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mimetypes.guess_type(target.name)[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "same-origin")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    initialize()
    host = os.environ.get("WEALTHOS_HOST", "0.0.0.0")
    port = int(os.environ.get("WEALTHOS_PORT", "4174"))
    print(f"WealthOS: http://127.0.0.1:{port}  LAN: http://<Mac-IP>:{port}")
    ThreadingHTTPServer((host, port), WealthHandler).serve_forever()
