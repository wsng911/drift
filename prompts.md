# drift Prompts

> 项目：MaxLeiter/Drift
> 技术栈：Next.js + TypeScript + Prisma + SQLite，自托管 Gist/Paste 代码分享服务

---

## 功能迭代

**1. 添加代码片段版本历史**
在 Drift 中为每个 Gist 添加版本历史功能。每次编辑保存时自动创建新版本，用户可以查看历史版本列表，对比不同版本的差异（diff 视图），并恢复到任意历史版本。

**2. 支持 Gist 评论功能**
在 Drift 中为 Gist 添加评论系统。登录用户可以在 Gist 详情页发表评论，支持 Markdown 格式，评论支持编辑和删除，Gist 作者可以收到评论通知。

**3. 添加 Gist 搜索功能**
在 Drift 中添加全文搜索功能，支持搜索 Gist 标题、描述和代码内容。搜索结果按相关度排序，支持按语言、可见性（公开/私有）筛选，搜索框放置在导航栏。

**4. 支持 Gist 嵌入功能**
在 Drift 中为每个公开 Gist 生成可嵌入的 `<script>` 标签，允许用户将代码片段嵌入到外部网站，嵌入后显示带语法高亮的代码块，样式与 GitHub Gist 嵌入类似。

**5. 添加 Gist 访问统计**
在 Drift 中为每个 Gist 记录访问次数和独立访客数，在 Gist 详情页显示统计数据，在用户个人主页显示所有 Gist 的总访问量排行。

---

## Bug 修复

**6. 修复大文件上传时编辑器卡顿**
在 Drift 中，当粘贴超过 1000 行的代码时，编辑器响应明显卡顿。请为代码编辑器添加虚拟滚动支持，或限制实时语法高亮的行数，超出阈值时降级为纯文本模式。

**7. 修复私有 Gist 被搜索引擎索引**
在 Drift 中，私有 Gist 的 URL 虽然需要登录才能访问，但页面没有添加 `noindex` meta 标签，可能被搜索引擎收录。请为私有 Gist 页面添加 `<meta name="robots" content="noindex">` 标签。

**8. 修复 Gist 分享链接在社交媒体预览不正确**
在 Drift 中，分享 Gist 链接到社交媒体时，OpenGraph 预览显示的是通用标题而非 Gist 的实际标题和描述。请为每个 Gist 页面动态生成 OpenGraph meta 标签。

**9. 修复多文件 Gist 中文件排序不稳定**
在 Drift 中，包含多个文件的 Gist 在每次加载时文件顺序可能不一致。请在数据库中为文件添加排序字段，确保文件按创建顺序稳定显示。

**10. 修复代码复制按钮在 Firefox 中不工作**
在 Drift 中，代码块右上角的复制按钮在 Firefox 浏览器中点击无响应。请检查 Clipboard API 的兼容性，添加 Firefox 的降级处理（使用 `document.execCommand('copy')`）。

---

## 重构

**11. 将 Prisma 数据库操作封装为 Repository 层**
Drift 中 Prisma 查询直接写在 API 路由中，缺乏抽象。请创建 `lib/repositories/` 目录，将 Gist、User、File 的数据库操作封装为独立的 Repository 类，路由只调用 Repository 方法。

**12. 统一 API 错误响应格式**
Drift 的 API 路由在不同情况下返回不同格式的错误响应。请创建统一的错误处理中间件，确保所有 API 错误响应格式为 `{ error: string, status: number }`。

---

## 测试

**13. 为 Gist CRUD API 编写集成测试**
使用 Jest + Supertest 为 Drift 的 Gist API 编写集成测试，覆盖：创建 Gist、获取 Gist、更新 Gist、删除 Gist、获取用户 Gist 列表。使用内存 SQLite 数据库隔离测试。

**14. 为代码高亮组件编写快照测试**
使用 React Testing Library 为 Drift 的代码高亮组件编写快照测试，覆盖：不同编程语言的语法高亮、行号显示、复制按钮、深色/浅色主题切换。

**15. 为用户认证流程编写 E2E 测试**
使用 Playwright 为 Drift 编写端到端测试，覆盖：注册账户、登录、创建公开/私有 Gist、编辑 Gist、删除 Gist、退出登录。

---

## 代码理解

**16. 解释 Drift 的认证机制**
在 Drift 中，用户认证是如何实现的？使用了哪个认证库（NextAuth？）？Session 如何存储？如何区分公开 Gist 和私有 Gist 的访问权限？API Token 是如何生成和验证的？

**17. 解释 Drift 的文件存储架构**
在 Drift 中，Gist 的代码内容是存储在数据库中还是文件系统中？Prisma Schema 中 Gist 和 File 的数据模型是怎样的？如何支持一个 Gist 包含多个文件？

---

## DevOps

**18. 编写 GitHub Actions 多架构构建流水线**
为 Drift 编写 `.github/workflows/docker-build.yml`，实现推送 main 分支时自动构建多架构（amd64/arm64）Docker 镜像并推送到 Docker Hub，使用 pnpm 缓存加速构建。

**19. 编写 docker-compose.yml 生产部署配置**
为 Drift 编写 `docker-compose.yml`，包含：drift 服务（映射 3000 端口）、数据目录挂载（`./data:/app/data`）、环境变量配置（DATABASE_URL、NEXTAUTH_SECRET、NEXTAUTH_URL）、健康检查、自动重启。

**20. 编写数据库备份脚本**
为 Drift 编写自动备份脚本，定期备份 SQLite 数据库文件，保留最近 7 天的备份，支持通过环境变量配置备份目录，并在备份完成后输出文件大小和时间戳。

---

## 构建与截图命令

**构建截图：**
```bash
cd /path/to/drift && docker build -t drift-test .
```

**网页截图：**
```bash
docker run -d -p 3000:3000 --name drift-test drift-test && sleep 5 && open http://localhost:3000
```

**清理：**
```bash
docker rm -f drift-test && docker rmi drift-test
```
