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

## 最新改动（2026-07-09）

### 两轮移动端 + 交互优化（已部署上线）
- **第一轮（移动端体验+视觉）**：修复 ImageGallery"🔍点击放大"提示从未显示的 bug（inline opacity:0 无 hover 规则）→ 改 CSS 控制，桌面 hover 显示/触屏常驻；搜索框移动端字号提 16px 消除 iOS 聚焦缩放；汉堡菜单加半透明遮罩+锁 body 滚动+点外关闭；全局 `-webkit-tap-highlight-color:transparent`；hover 效果用 `@media (hover:hover)` 门控避免触屏卡住；卡片/按钮加 `:active` 按压反馈；图片 hover 轻微 scale(1.06)
- **第二轮（交互）**：新建 `ScrollToTop.jsx` 修复路由切换不回顶部的 bug（React Router 不自动滚顶）；搜索无结果时展示引导（`.search-no-result` 原是死代码）+ 「加学长微信」CTA；QA 手风琴改 max-height+ref 平滑展开（原是瞬间弹出）；QA 微信号一键复制（navigator.clipboard + execCommand 降级）+"已复制✓"；BackToTop hover 门控、移动端下移

### 关键经验：如何从官网抓准确数据（重要，可复用）
- **WebFetch/WebSearch 连不上任何国内网站**（hnsyu.edu.cn/.net、百度、阳光高考全被拦）——因为浏览走的是 Anthropic 美国服务器，不是用户电脑
- **绕过方法：用 Bash 的 `curl`**——终端命令在用户 Windows 本地跑，走用户网络，能连上官网
- **Python 是 Windows 商店空壳（exit 49）**，用 **Node v24** 解析 JSON；注意 node 把 `/tmp` 解析成 `D:\tmp`，临时文件要放工作目录
- **招生网数据接口**：`POST http://zsw.hnsyu.edu.cn/api.php/cms/getschoollist`（空 body）→ 返回双层编码 JSON，`data` 是字符串需二次 parse，含 20 个学院+专业+电话
- **校区归属**：从各学院官网页脚地址提取（`http://www1.hnsyu.net/<院系代码>/`）

### 校区 × 专业分布（2026 官网核实版，非百科旧数据）
- **李子园校区（老校区）**：文学院(汉语言文学/历史学)、外国语学院(英语)、音乐舞蹈学院(音乐学/舞蹈学)、食品与化学工程学院(生物工程/化工/食品/制药)
- **七里坪校区（新/主校区）**：经管、法商(会计/法学)、信息科学与工程(AI/通信/电子/计算机)、电气、机械与能源、土木、理学院、设计艺术、农林生态、体育、马克思主义、国际学院、**护理学院、医学技术学院(影像/检验/康复)**
- **梅子井校区**：药学院(药学)
- **临床医学(普爱医学院)**：七里坪(基础医学楼)+西湖校区都有，基础阶段主要在七里坪，**网站需标注"以录取通知书为准"**

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
- [x] 移动端体验优化（图片提示/iOS缩放/汉堡遮罩/触屏反馈，已上线）
- [x] 交互优化（路由回顶/搜索无结果引导/QA手风琴/微信复制，已上线）
- [x] 从官网核实校区-专业分布数据（已拿到官方版，见上）
- [ ] **做「我的专业在哪个校区」查询页**（用官网核实的校区数据，选专业→显示校区+附近食堂/公寓/报到门）
- [ ] 补"报到前"高频缺口：学费/住宿费、助学贷款/绿色通道、线上迎新报到系统、电脑/电子产品选购
- [ ] 微信分享优化（Open Graph 标签）
- [ ] 每个攻略页面底部统一加微信入口
- [ ] 首页加"分享给同学"引导
- [ ] 抖音注册账号，评论区截流
