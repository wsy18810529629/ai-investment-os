# WealthOS v1.1 local-sync prototype

This directory preserves the tested WealthOS mobile habit-test prototype without changing the current Next.js Phase 1 application.

## Included

- Companion-style WealthOS dashboard and Atlas AI CFO interface
- Mobile-first onboarding
- Local asset, profile, action, and journal workflows
- Standard-library Python HTTP server
- SQLite account and cross-device state synchronization
- PBKDF2-SHA256 password hashing and HttpOnly session cookies
- Trusted-LAN phone access

## Run

```bash
python3 server.py
```

Then open:

```text
http://127.0.0.1:4174
```

For a phone on the same trusted Wi-Fi, replace `127.0.0.1` with the Mac's LAN IP.

## Boundaries

- This is a local-network product experiment, not a public deployment.
- Do not expose port 4174 to the public internet.
- Public use requires HTTPS, production authentication, backups, and a deployment review.
- It does not execute trades or send financial data to a model provider.
- Runtime SQLite databases, sessions, logs, and cached user data must not be committed.

## Integration status

This prototype intentionally remains isolated from `src/`. The main app uses Next.js, React, and TypeScript and has stricter Phase 1 scope. Product concepts should be migrated into that architecture deliberately rather than copying the static implementation into production.
