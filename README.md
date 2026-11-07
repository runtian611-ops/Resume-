# Resume- ｜ 牛润田 · Java + AI 全栈开发工程师

> 一个纯静态、无后端、无数据库的个人简历 & 作品集网站，面向 HR 快速阅读简历与项目，可直接部署到 GitHub Pages。

## 项目介绍

这是「xxx」的个人程序员简历与作品集网站，目标是让 HR 在最短时间内了解：

- **我是谁**：姓名、求职岗位、一句话简介、联系方式
- **我会什么**：Java 后端 / 微服务 / AI 大模型相关技术栈（图标标签展示，不使用百分比进度条）
- **我做过什么**：项目作品集卡片 + 详情页（业务背景、Mermaid 架构图、技术难点、解决方案、量化成果）
- **我的经历**：教育背景、实习时间线、荣誉奖项

## 网站预览

<!-- 部署后可将实际截图放到 docs/screenshot.png，并取消下方注释替换 -->
<!-- ![网站预览](docs/screenshot.png) -->

页面结构（从上到下）：

1. **Hero 首屏**：姓名、岗位、一句话简介、`下载简历 PDF`、`查看项目` 按钮
2. **关于我**：个人简介、求职意向、教育背景
3. **技术栈**：Java 后端相关技术标签
4. **项目作品集**：项目卡片，点击进入详情（含架构图、难点与方案）
5. **实习经历**：时间线
6. **联系**：邮箱、GitHub、Gitee

## 项目亮点

- **纯静态**：无后端、无数据库，内容全部静态写在前端，加载快、零服务依赖
- **明暗双主题**：一键切换，自动记忆偏好并跟随系统 `prefers-color-scheme`
- **ATS 友好 PDF**：一键下载与网站内容一致的简历 PDF（`public/resume/Resume-NiuRuntian.pdf`）
- **项目详情架构图**：Mermaid 渲染，按需懒加载，不阻塞首屏
- **移动端自适应**：HR 手机打开也能正常浏览
- **克制动效**：仅滚动入场 + Hover 微反馈，保证可读性、不浮夸

## 技术栈

- Vue 3 + Vite
- Tailwind CSS
- Mermaid（架构图）
- 纯静态部署（GitHub Pages）

## 本地开发

要求 Node.js ≥ 18。

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器 http://localhost:5173
npm run build    # 打包到 dist/
npm run preview  # 本地预览打包产物
```

## GitHub Pages 部署

### 方式一：GitHub Actions 自动部署（推荐）

仓库已内置 `.github/workflows/deploy.yml`，首次推送后：

1. 打开仓库 **Settings → Pages**
2. **Source** 选择 `GitHub Actions`
3. 等待 Actions 首次运行完成，即可通过下方链接访问

### 方式二：手动部署

```bash
npm install
npm run build

# 将 dist/ 推送到 gh-pages 分支
git subtree push --prefix dist origin gh-pages
```

然后在 **Settings → Pages** 中把 Source 设为 `gh-pages` 分支根目录。

### 公网访问链接

部署成功后访问：<https://runtian611-ops.github.io/Resume-/>

## 目录结构

```
Resume-/
├── docs/                  # 需求、选型、架构、UI 调研、部署、开发记录
├── public/
│   ├── favicon.svg
│   └── resume/Resume-NiuRuntian.pdf   # ATS 友好简历 PDF
├── scripts/generate_resume.py         # 简历 PDF 生成脚本（DOCX→PDF）
├── src/
│   ├── components/        # 页面组件
│   ├── composables/       # useTheme 主题切换
│   ├── utils/             # scrollReveal 滚动动画
│   ├── data/resume.js     # 唯一简历数据源（网站 + PDF 共用内容）
│   ├── style.css          # 主题变量与全局样式
│   ├── App.vue
│   └── main.js
├── .github/workflows/deploy.yml       # GitHub Pages 自动部署
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 简历内容说明

- 所有经历均为真实信息，**严禁编造**，网站描述与简历 PDF 保持一致
- 修改简历内容：编辑 `src/data/resume.js`，然后 `npm run build` 重新打包
- 重新生成 PDF：编辑 `scripts/generate_resume.py` 后运行，再用 LibreOffice 转为 PDF

## 联系

- 邮箱：352246219@qq.com
- GitHub：<https://github.com/runtian611-ops>
- Gitee：<https://gitee.com/lonely-and-compassionate-ire>
