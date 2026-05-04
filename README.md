# Drift

自托管代码片段分享平台，类似 GitHub Gist。

## 功能特性

- 代码片段创建与分享
- 语法高亮
- 公开/私有片段
- 多文件支持
- SQLite 存储
- 中文界面

## 快速部署

```bash
docker run -d -p 3000:3000 -v $(pwd)/data:/app/data --name drift wsng911/drift:latest
```

访问 `http://localhost:3000`
