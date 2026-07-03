# 邵阳学院新生迎新网

## 项目概况
- **用途**：新生百事通，以学长身份帮新生解决入学问题。口语化、不官腔，后续可接入校园经济变现。
- **技术栈**：Vite + React 18 + React Router v6 (HashRouter) + 纯 CSS3 动画
- **设计风格**：青春活力，橙蓝渐变配色，响应式三档适配
- **页面**：首页、入学准备、校园生活、避坑指南、专业解读、百问百答（含提问表单）、关于本站
- **开发命令**：`npm run dev`（开发）、`npm run build`（构建）、`npm run preview`（预览）

## 部署信息
- **平台**：GitHub Pages（免费）
- **仓库**：`HHX111-CMD/sysc`
- **公网地址**：https://hhx111-cmd.github.io/sysc/
- **推送方式**：SSH（`git@github.com:HHX111-CMD/sysc.git`）
- **自动部署**：GitHub Actions（`.github/workflows/deploy.yml`），push 到 master 后自动触发
- **Vite 配置**：`base: '/sysc/'`（必须匹配仓库名）
- **路由配置**：`HashRouter`（不用 basename，适配 GitHub Pages 静态托管，解决首次加载空白问题）

## 文件结构
```
shaoyang-university-guide/
├── index.html              # 入口 HTML
├── vite.config.js          # Vite 配置（base: '/sysc/'）
├── .github/workflows/deploy.yml  # GitHub Actions 自动部署
├── src/
│   ├── main.jsx            # React 入口 + BrowserRouter basename
│   ├── App.jsx             # 路由配置（8个页面路由）
│   ├── index.css           # 全局样式 + CSS 变量 + 动画
│   ├── data/content.js     # 所有页面内容数据
│   ├── components/         # 通用组件
│   │   ├── Navbar.jsx/css  # 顶部导航栏（毛玻璃效果）
│   │   ├── Footer.jsx/css  # 页脚
│   │   ├── HeroSection.jsx/css  # 首页大图欢迎区
│   │   ├── ScrollReveal.jsx     # 滚动入场动画
│   │   └── BackToTop.jsx        # 回到顶部按钮
│   └── pages/              # 8个内容页面
│       ├── Home.jsx        # 首页（Hero + 导航卡片 + CTA + 电话）
│       ├── About.jsx       # 学校概况
│       ├── Campus.jsx      # 校园风光
│       ├── Majors.jsx      # 院系专业（可折叠）
│       ├── Admissions.jsx  # 招生信息
│       ├── Life.jsx        # 校园生活
│       ├── Guide.jsx       # 新生指南
│       └── FAQ.jsx         # 常见问题（可折叠）
```

## 部署注意事项（踩坑记录）
1. **GitHub 推送**：中国大陆网络无法连接 github.com:443，需要用 SSH 方式推送
2. **SSH 密钥**：已生成 `~/.ssh/id_ed25519`，已添加到 GitHub 账号
3. **Gitee 放弃原因**：令牌认证始终失败 + Pages 需要实名认证
4. **GitHub Actions 偶发失败**：部署步骤可能报 "Deployment failed, try again later"，`gh run rerun` 重跑即可
5. **页面空白**：必须同时配置 `vite.config.js base` 和 `BrowserRouter basename`，否则资源加载 404
6. **路径必须一致**：仓库名、base、basename 三者必须一致（当前都是 `sysc`）

## 首页联系电话
- 15364075803（在首页底部 CTA 区域）

## 用户偏好
- 所有交流使用中文
- 用户 GitHub 账号：HHX111-CMD
- 用户 Gitee 账号：h-h-x（不推荐使用，Pages 需实名）

## 待改进
- 校园风光页面目前用 emoji 占位，可以换成真实图片
- 可以添加更多交互动效
- 可以添加 dark mode
