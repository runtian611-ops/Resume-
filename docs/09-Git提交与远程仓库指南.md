# 09 · Git 提交与远程仓库指南

> 本文把「本地手动提交代码」和「远程仓库是怎么确定、怎么切换」讲清楚，作为本项目日常开发的操作手册。适用于本机（Windows）环境。

---

## 一、先搞懂三层结构

| 层 | 在哪 | 是什么 |
| --- | --- | --- |
| **工作区** | `D:\DS_WorkArea\My_repository\` 里你看到的文件 | 你正在编辑的代码 |
| **本地仓库** | 同目录下隐藏的 `.git\` 文件夹 | 提交历史 + 配置（含远程地址） |
| **远程仓库** | GitHub 服务器上 | `runtian611-ops/Resume-` |

> **核心认知**：远程仓库地址不是「电脑全局记住」的，而是存在**本地 `.git/config`** 里。每个项目文件夹各管各的。

```mermaid
graph LR
  W[工作区<br/>你的文件] -->|git add| S[暂存区]
  S -->|git commit| L[本地仓库 .git]
  L -->|git push| R[远程仓库 GitHub]
  R -->|git pull/fetch| L
```

---

## 二、本地手动提交：标准四步

```bash
# ① 进入仓库目录（PowerShell / Git Bash / cmd 都行）
cd D:\DS_WorkArea\My_repository

# ② 看改了什么（红色=未暂存，绿色=已暂存）
git status

# ③ 暂存 + 提交
git add -A                              # 暂存全部改动（新增/修改/删除）
# 或只提交指定文件：git add src/data/resume.js README.md
git commit -m "feat: 首页增加项目预览"

# ④ 推送到 GitHub
git push origin main
```

- `git push origin main` 可简写为 `git push`（`main` 已跟踪 `origin/main`）。
- 推送后 GitHub Actions 会**自动构建并部署**，一两分钟后线上更新。

---

## 三、提交信息规范（Conventional Commits）

| 前缀 | 用途 |
| --- | --- |
| `feat:` | 新功能 |
| `fix:` | 修 bug |
| `docs:` | 文档改动 |
| `style:` | 样式调整（不影响逻辑） |
| `refactor:` | 重构 |
| `ci:` | 部署 / 工作流 |
| `chore:` | 杂项（依赖、配置） |

示例：`git commit -m "docs: 补充网站预览截图"`

---

## 四、常见操作速查

| 想做的事 | 命令 |
| --- | --- |
| 只提交部分文件 | `git add 文件1 文件2` → `git commit -m "..."` |
| 看还没暂存的改动 | `git diff` |
| 看已暂存、未提交的改动 | `git diff --staged` |
| 查看提交历史 | `git log --oneline -5` |
| 撤销暂存（改动还在） | `git reset HEAD 文件名` |
| 丢弃某文件改动（⚠️不可恢复） | `git checkout -- 文件名` |
| 推送被拒（远程有新提交） | `git pull --rebase origin main` → `git push` |

---

## 五、远程仓库是怎么「确定」的

其实就是在本地执行了一条命令：

```bash
git remote add origin https://github.com/runtian611-ops/Resume-.git
```

含义：**给本地仓库添加一个名叫 `origin` 的远程地址**，并写进 `.git/config` 的 `[remote "origin"]` 段。

- `origin` 只是**名字/别名**（约定俗成，也可叫 `github`、`upstream`）。
- 「确定仓库」= 本地 `.git/config` 里存了 `url` 指向哪个 GitHub 地址。
- 不同文件夹的仓库可以指向不同的远程，互不影响。

本项目真实的 `.git/config`（token 已用 `***` 隐去）：

```ini
[remote "origin"]
	url = https://runtian611-ops:***@github.com/runtian611-ops/Resume-.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[http]
	proxy = http://127.0.0.1:7897
[branch "main"]
	remote = origin
	merge = refs/heads/main
```

---

## 六、电脑是如何识别的

每次执行 `git push`，git 会：

1. **从当前目录向上找 `.git` 文件夹** → 定位到 `D:\DS_WorkArea\My_repository\.git\`；
2. **读 `.git/config`**：
   - `[remote "origin"] url` → 推到哪个地址；
   - URL 里的 `用户名:token@` → HTTP Basic 认证（所以不用每次输密码）；
   - `[http] proxy` → 通过 7897 代理连 GitHub；
   - `[branch "main"] remote = origin` → 知道 `main` 默认推给 `origin/main`；
3. **通过 HTTPS 连接**，把本地提交推上去。

> 「电脑识别」不是靠全局注册表，靠的是**当前目录下的 `.git/config`**。全局配置（`git config --global`）只负责代理、用户名等跨仓库默认值，**远程地址是仓库级配置**。

---

## 七、如何更换远程仓库

### 方法一：直接改地址（推荐）

```bash
cd D:\DS_WorkArea\My_repository

# 公开仓库、只需读
git remote set-url origin https://github.com/新用户名/新仓库名.git

# 新仓库 push 也要认证（URL 里带 token）
git remote set-url origin https://新用户名:<新token>@github.com/新用户名/新仓库名.git

# 验证
git remote -v
```

### 方法二：先删再加

```bash
git remote remove origin
git remote add origin https://github.com/新用户名/新仓库名.git
git remote -v
```

### 换完之后

```bash
# 新仓库是空的 → 直接推
git push -u origin main

# 新仓库已有内容 → 先拉再推，避免被拒
git fetch origin
git rebase origin/main
git push origin main
```

---

## 八、常见坑与提醒

1. **token 是绑在 URL 里的**：换远程时新仓库要 push，URL 必须带 `用户名:token@`，否则会要求输密码（GitHub 已不支持密码认证）。
2. **换远程 ≠ 换本地提交历史**：换的只是「推到哪」，本地 commit 都还在。
3. **`git remote -v` 是唯一可靠检查方式**：改完必跑，确认 fetch/push 两行都是新地址。
4. **代理是单独配的**：`[http] proxy` 是为连 GitHub 加的，换仓库不影响，但换到别的网络环境可能要调。
5. **别用 `git add -A` 把无关文件加进来**：仓库 `.gitignore` 已忽略 `node_modules/`、`dist/`、`ghost-job/`、`downloads/` 等。

---

## 九、本项目速查备忘

- 分支：`main`
- 远程 `origin`：已内嵌 token，`git push` 不用输密码
- 代理：`http://127.0.0.1:7897`（已设）
- 用户：`runtian611-ops` / `runtian611-ops@users.noreply.github.com`
- 标准动作：`git add -A && git commit -m "type: 描述" && git push`
- 推送后：GitHub Actions 自动部署到 <https://runtian611-ops.github.io/Resume-/>

---

## 十、参考资料

- Pro Git 中文版：<https://git-scm.com/book/zh/v2>
- git-remote 官方文档：<https://git-scm.com/docs/git-remote>
- GitHub 身份认证文档：<https://docs.github.com/zh/authentication>
