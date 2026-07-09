# 邵阳学院新生百事通

## 项目概况
- **用途**：新生百事通，以学长身份帮新生解决入学问题。口语化、不官腔，后续可接入校园经济变现。
- **技术栈**：Vite + React 18 + React Router v6 (HashRouter) + 纯 CSS3 动画
- **设计风格**：青春活力，橙蓝渐变配色，响应式三档适配
- **页面**：首页、入学准备、校园生活、避坑指南、专业解读、百问百答（加微信入口）、关于本站
- **开发命令**：`npm run dev`（开发）、`npm run build`（构建）、`npm run preview`（预览）

## 部署信息（2026-07-09 最新）
- **平台**：GitHub Pages（免费，唯一正式平台）
- **仓库**：`syxyx/sygo`（组织 `syxyx`，之前是 HHX111-CMD/sysc → HHX111-CMD/sygo）
- **主域名**：**https://sygo.top**（万网购买，绑定 GitHub Pages）
- **备用地址**：https://syxyx.github.io/sygo/（无自定义域名时自动跳转到 sygo.top）
- **推送方式**：SSH（`git@github.com:syxyx/sygo.git`）
- **自动部署**：GitHub Actions（`.github/workflows/deploy.yml`），push master 后自动触发
- **Vite 配置**：`base: '/'`（自定义域名从根路径访问）
- **路由配置**：`HashRouter`（适配静态托管）
- **CNAME 文件**：`public/CNAME` 内容 `sygo.top`

## 域名试错记录（重要）
- **GitHub Pages**：免费，但微信会拦截未备案域名（ICP）→ 无法解决
- **Vercel**：试过部署+绑定 sygo.top，但微信同样拦截，且 vercel.app 在中国被墙 → 已弃用
- **Cloudflare Pages**：试过部署 sygo.pages.dev，同样微信拦截 → 已弃用
- **结论**：微信 ICP 检查的是域名本身，换任何平台都无法绕过。备案需要国内服务器（约60元/年）+ 15-20个工作日
- **目前策略**：sygo.top 作为唯一域名，微信里分享用 syxyx.github.io/sygo/（不会被拦）

## DNS 配置（万网/阿里云）
- 使用阿里云 CLI（`aliyun`）管理 DNS 记录
- sygo.top 当前 DNS 记录（必须在阿里云控制台或 CLI 操作）：
  - 4 条 A 记录 `@` → `185.199.108.153` / `109.153` / `110.153` / `111.153`
  - 1 条 CNAME `www` → `syxyx.github.io`
- **教训**：DNS 修改后需要传播时间（几分钟到几小时），期间网站可能不稳定
- **GitHub Pages CDN 缓存**：自定义域名变更后 CDN 可能缓存旧 301 跳转，需等几分钟

## 文件结构
```
shaoyang-university-guide/
├── index.html
├── vite.config.js              # base: '/'（自定义域名用根路径）
├── .github/workflows/deploy.yml
├── public/CNAME                # sygo.top
├── public/404.html
├── CC-Session-Logs/            # 会话日志
├── src/
│   ├── main.jsx                # HashRouter
│   ├── App.jsx                 # 7个页面路由
│   ├── index.css               # 全局样式 + CSS 变量
│   ├── data/content.js         # 所有页面内容数据（微信号在此修改）
│   ├── data/searchIndex.js     # 搜索索引
│   ├── components/             # Navbar, Footer, ScrollReveal, BackToTop, SearchBar, Countdown, ImageGallery, ScrollToTop
│   └── pages/                  # Home, Prepare, Life, Pitfalls, Majors, QA, About
```

## 最新改动（2026-07-09）

### 域名和仓库大调整
- **购买域名**：万网购买 `sygo.top`
- **仓库迁移**：HHX111-CMD/sysc → HHX111-CMD/sygo → **syxyx/sygo**（创建 GitHub 组织 syxyx 缩短 URL）
- **放弃 Vercel/Cloudflare**：试过都解决不了微信 ICP 问题，最终只保留 GitHub Pages
- **微信号更新**：全站微信号改为 `a3399388639`（`src/data/content.js` 中 contactPhone 和 phone）
- **路径体系**：
  - 绑 sygo.top 时 base=`/`，图片路径 `/images/`
  - 如果只部署到 github.io 子路径（无自定义域名），base=`/sygo/`，图片路径 `/sygo/images/`

### GitHub 组织操作经验（可复用）
- 创建组织：https://github.com/account/organizations/new?plan=free
- 类型选 "A business or institution" → 免费方案
- 仓库转移：Settings → Danger Zone → Transfer ownership
- 转移可能卡住，备选方案：直接在新组织新建仓库再 push

### 移动端 + 交互优化（两轮，已上线）
- 移动端：图片提示修复、iOS 搜索框缩放、汉堡遮罩锁滚动、全局触屏反馈
- 交互：路由回顶(ScrollToTop)、搜索无结果引导加微信、QA 手风琴平滑展开、微信号一键复制

### 图片系统
- 14张真实照片已上线（校园/宿舍/食堂），ImageGallery 组件支持 lightbox
- 图片路径：当前用 `/images/...`（自定义域名根路径），英文文件名
- 压缩流程：sharp resize 1200x800 + jpeg quality 80

### 校区 × 专业分布（2026 官网核实版）
- **李子园**：文学院、外国语学院、音乐舞蹈学院、食品与化学工程学院
- **七里坪**：经管、法商、信息工程、电气、机械、土木、理学、设计艺术、农林生态、体育、马克思主义、国际学院、护理学院、医学技术学院
- **梅子井**：药学院
- **临床医学**：七里坪+西湖校区，基础阶段主要在七里坪
- 数据来源：`curl` 抓取招生网 API + 各学院官网页脚

### 页面内容修改
- 入学准备：必带清单重写、军训时间改2周、交通强调不要买邵阳北站
- 校园生活：宿舍按公寓介绍、食堂按实际名称
- 百问百答：新增14个问题，加微信入口
- 新功能：开学倒计时（2026/9/13）、校园地图入口

## 部署注意事项
1. **GitHub 推送**：`git@github.com:syxyx/sygo.git`（SSH）
2. **图片路径**：绑自定义域名时用 `/images/xxx.jpg`；子路径部署时用 `/sygo/images/xxx.jpg`
3. **图片文件名用英文**：中文文件名 GitHub Pages 404
4. **自定义域名绑定后 base 必须是 `/`**，否则资源加载 404
5. **GitHub Pages CDN 有缓存**：改完设置等几分钟才生效
6. **DNS 改完要等传播**：用 `nslookup sygo.top` 确认解析到 GitHub IP

## 用户偏好
- 所有交流使用中文
- 用户 GitHub：HHX111-CMD，组织：syxyx
- 微信号：a3399388639
- 万网域名：sygo.top
- 不出镜做IP，不主动拍视频，靠截流获取流量

## 待办
- [x] 网站加图片（14张真实照片已上线）
- [x] 移动端体验优化
- [x] 交互优化（路由回顶/搜索/QA手风琴/微信复制）
- [x] 从官网核实校区-专业分布数据
- [x] 购买域名 sygo.top 并绑定 GitHub Pages
- [x] 仓库迁移到 syxyx/sygo（缩短 URL）
- [x] 微信号更新为 a3399388639
- [ ] **做「我的专业在哪个校区」查询页**（用官网核实的校区数据）
- [ ] 补"报到前"高频缺口：学费/住宿费、助学贷款/绿色通道、线上迎新报到系统、电脑选购
- [ ] 微信分享优化（Open Graph 标签）
- [ ] 每个攻略页面底部统一加微信入口
- [ ] 首页加"分享给同学"引导
