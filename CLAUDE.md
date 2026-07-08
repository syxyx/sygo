# 邵阳学院新生百事通

## 项目概况
- **用途**：新生百事通，以学长身份帮新生解决入学问题。口语化、不官腔，后续可接入校园经济变现。
- **技术栈**：Vite + React 18 + React Router v6 (HashRouter) + 纯 CSS3 动画
- **设计风格**：青春活力，橙蓝渐变配色，响应式三档适配
- **页面**：首页、入学准备、校园生活、避坑指南、专业解读、百问百答（加微信入口）、关于本站
- **开发命令**：`npm run dev`（开发）、`npm run build`（构建）、`npm run preview`（预览）

## 部署信息
- **平台**：GitHub Pages（免费）
- **仓库**：`HHX111-CMD/sysc`
- **公网地址**：https://hhx111-cmd.github.io/sysc/
- **推送方式**：SSH（`git@github.com:HHX111-CMD/sysc.git`）
- **自动部署**：GitHub Actions（`.github/workflows/deploy.yml`），push 到 master 后自动触发
- **Vite 配置**：`base: '/sysc/'`（必须匹配仓库名）
- **路由配置**：`HashRouter`（不用 basename，适配 GitHub Pages 静态托管）

## 文件结构
```
shaoyang-university-guide/
├── index.html
├── vite.config.js              # base: '/sysc/'
├── .github/workflows/deploy.yml
├── CC-Session-Logs/            # 会话日志
├── src/
│   ├── main.jsx                # HashRouter
│   ├── App.jsx                 # 7个页面路由
│   ├── index.css               # 全局样式 + CSS 变量
│   ├── data/content.js         # 所有页面内容数据
│   ├── data/searchIndex.js     # 搜索索引
│   ├── components/             # Navbar, Footer, ScrollReveal, BackToTop, SearchBar, Countdown, ImageGallery
│   └── pages/                  # Home, Prepare, Life, Pitfalls, Majors, QA, About
```

## 最新改动（2026-07-08）

### 图片系统
- **14张真实照片已上线**：校园实拍6张（东门/北一二三门/图书馆/教学楼）、宿舍4张（乐山/采芹/杏林/泮水）、食堂4张（留香/溢香/馨香/杏香）
- **新增组件**：`ImageGallery.jsx`（图片画廊，支持点击放大lightbox、键盘翻页）、`Countdown.jsx`（开学倒计时）
- **图片路径铁律**：必须用 `/sysc/images/...` 前缀（因为 GitHub Pages 部署在子路径下），英文文件名（中文文件名会404）
- **图片压缩流程**：用 sharp 库压缩 PNG→JPG，resize 1200x800 + quality 80，压缩率约95%

### 页面内容修改
- **入学准备**：重写必带清单（8项）、不用带清单、删掉天气板块、军训时间改2周、交通强调不要买邵阳北站
- **校园生活-宿舍**：从四/六/八人间改为按公寓介绍（乐山/采芹/泮水/杏林）
- **校园生活-食堂**：修正为七里坪4个+李子园思源，tips加后街前街
- **百问百答**：精简回答、删第8题、新增14个问题（上床下桌/空调/早晚自习/校园跑/外卖/洗衣机/热水/电瓶车/限电/银行卡/超市/快递/共享单车/门禁）
- **校园地图**：导航栏添加 🗺️ 校园地图，链接到学校3D地图，新标签页打开

### 新功能
- **开学倒计时**：首页校园实拍上方，目标2026年9月13日
- **校园地图入口**：导航栏"校园生活"后面，外部链接用 `<a>` 而非 `<Link>`

## 部署注意事项
1. **GitHub 推送**：SSH 方式（`git@github.com:HHX111-CMD/sysc.git`）
2. **图片路径必须有 /sysc/ 前缀**：代码中写 `/sysc/images/xxx.jpg`，不能用 `/images/xxx.jpg`
3. **图片文件名用英文**：中文文件名会导致 GitHub Pages 404
4. **GitHub Actions 偶发部署失败**：重推一次触发新部署即可
5. **页面空白**：必须同时配置 vite.config.js base 和 HashRouter

## 图片管理

### 添加新图片流程
1. 把原始图片（png/jpg）放到 `public/images/对应文件夹/`
2. 用 sharp 压缩：`npx sharp` resize 1200x800, jpeg quality 80
3. 删除原始大文件和旧 svg 占位图
4. 代码中引用：`{ src: '/sysc/images/xxx/yyy.jpg', caption: '标题' }`
5. `npm run build` → `git add .` → `git commit` → `git push`

### 当前图片清单
```
public/images/
├── campus/     gate-east.jpg, gate-north1/2/3.jpg, library.jpg, teaching-building.jpg
├── dorm/       leshan.jpg, caiqin.jpg, xinglin.jpg, panyong.jpg
└── canteen/    liuxiang.jpg, yixiang.jpg, xinxiang.jpg, xingxiang.jpg
```

## 用户偏好
- 所有交流使用中文
- 用户 GitHub 账号：HHX111-CMD
- 用户联系电话/微信：15364075803
- 不出镜做IP，不主动拍视频，靠截流获取流量

## 待办
- [x] 网站加图片（14张真实照片已上线）
- [ ] 微信分享优化（Open Graph 标签）
- [ ] 每个攻略页面底部统一加微信入口
- [ ] 抖音注册账号，开始评论区截流
- [ ] 网站首页加"分享给同学"引导
- [ ] 清理 HeroSection 死代码
- [ ] 添加 404 页面
