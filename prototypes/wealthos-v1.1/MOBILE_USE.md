# WealthOS 手机试用

## 打开地址

Mac 与手机连接同一个可信 Wi-Fi，Mac 保持开机，然后在手机 Safari 打开：

```text
http://192.168.1.46:4174
```

第一次打开：

1. 选择“创建账号”；
2. 使用至少 8 位的独立密码；
3. 完成财富画像；
4. 录入资产；
5. 在 Mac 使用同一地址和账号登录，即可同步。

Safari 可通过“分享 → 添加到主屏幕”把 WealthOS 作为每日入口。

## 运行方式

服务由 macOS LaunchAgent 自动启动：

```text
~/Library/LaunchAgents/com.tz.wealthos.plist
```

运行数据保存在：

```text
~/Library/Application Support/WealthOS/
```

其中 SQLite 数据库为：

```text
~/Library/Application Support/WealthOS/investment_platform/data/wealthos.db
```

## 安全边界

当前是家庭局域网试用版，不是公网生产版：

- 仅在可信的家庭 Wi-Fi 使用；
- 不要把 4174 端口映射到公网；
- 不要在公共 Wi-Fi 输入密码或财富数据；
- 当前局域网使用 HTTP，公网使用前必须增加 HTTPS；
- Mac 关机、休眠或离开当前网络后，手机无法访问；
- 数据不会发送给第三方模型，也不会执行交易。

## 常用检查

```bash
launchctl print gui/501/com.tz.wealthos
curl http://127.0.0.1:4174/api/me
```

如果 Mac 的局域网 IP 发生变化，重新执行：

```bash
ipconfig getifaddr en0
```

然后用新的 IP 替换手机地址中的 `192.168.1.46`。
