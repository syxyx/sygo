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
│   ├── utils/scrollToAnchor.js # 搜索结果滚动到页内锚点（偏移+重试+校正）
│   └── pages/                  # Home, Prepare, Life, Pitfalls, Majors, QA, About
```

## 最新改动（2026-07-10）

### 官网数据核对（以官网原文为准）
- `curl` 抓官网《学校简介》`hnsyu.edu.cn/xygk/xxjj.htm` 逐条核对
- **修正校区**：官网只出现"七里坪""李子园"，删除查无实据的"江北""西湖"（`content.js` campuses + `searchIndex.js`）
- 官网权威数字备查：22 个二级学院、51 个本科招生专业、在校生 27593 人、6 个省应用特色学科、国家级+省级一流专业建设点 31 个、11 大学科门类

### 搜索引擎锚点定位（修复）
- 问题：搜索点击只跳页面顶部，折叠的 QA/避坑看不到答案
- 方案：索引每条加 `anchor` → 页面板块挂 `id` → `scrollToAnchor` 工具（导航栏偏移+重试+校正）→ `ScrollToTop`/`SearchBar` 走路由 state → QA/Pitfalls 监听 state 自动展开
- 新增 `src/utils/scrollToAnchor.js`
- 锚点命名：prepare-*/life-*/major-{i}/major-transfer/about-*/qa-{i}/qa-contact/pitfall-{分类}-{条目}
- Playwright 实测通过（滚到目标距顶约 84px = 导航栏下方，折叠项自动展开）
- 详见 `CC-Session-Logs/10-07-2026-10_40-官网核对与搜索锚点定位.md`

### 微信分享优化（Open Graph）
- `index.html` 加 og:title/description/image/url + twitter 卡片 + SEO description
- 分享到微信显示带校园图的卡片（图用 `/images/campus/gate-north1.jpg`）
- SPA 全站共用一套标签（都显示首页卡片），对"分享首页"场景够用
- 注意：未备案域名朋友圈可能限制效果；微信对分享卡片有缓存，改后要等一段时间才刷新

### 避坑指南大改（现为 6 分类 24 条）
- 结构：0🕳️开学骗局(9) / 1📚考证与学业(1,只留四六级) / 2🍜生活日常(3) / 3💪军训(4) / 4📖社团组织(3) / 5💼兼职赚钱(4)
- 中途试过的、被用户删掉的分类：💸智商税、📱手机网络、👥人际关系、💰消费理财、🏠宿舍相处
- **重要经验**：避坑分类靠 `pitfall-{分类序}-{条目序}` 锚点定位。一旦删/加分类导致索引位移，`searchIndex.js` 里手写别名的锚点全要同步重排，否则搜索跳转错位。改完务必写脚本 `import { pitfallsContent }` 逐条校验锚点命中（注意 searchIndex.js 里 `from './content'` 无后缀，Node 原生 ESM 跑不了，只导 content.js 校验）

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

## 留言墙运维（Supabase）
- 后端：Supabase 项目 `rskakhaiavxplqpqixqn`（永久免费版）。配置在 `src/data/supabase.js`（Project URL + publishable key，前端公开可见，安全靠 RLS 行级安全）
- 数据表 `messages`，RLS 策略：所有人可读、可插入，**不可改删**（防篡改）。字段 major/text/created_at
- 组件 `src/components/MessageWall.jsx`，首页懒加载接入（开学倒计时下方）；未配置 key 时自动回退 localStorage
- **删留言（人工审核，用户常问）**：登录 https://supabase.com/dashboard → 选项目 → 左侧 **Table Editor** → **messages** 表 → 勾选要删的行 → 右上 **Delete** → 确认。可多选批量删。删除永久不可恢复
- 敏感词过滤：`MessageWall.jsx` 里的 `BANNED` 数组，命中会变 `*`，可自行增词
- **公开回复留言**：Table Editor → messages 表 → 找到那条 → 编辑 `reply` 单元格填回复 → 保存；前端该留言下方即显示「🎓 学长回复」（前提：已加 `reply` 字段）。数据层用 `select('*')`，字段没建也不报错
- **微信通知**：PushPlus 客户端推送，token 在 `src/data/notify.js`；被骚扰就去 pushplus 重置 token 再换上

## 用户偏好
- 所有交流使用中文
- 用户 GitHub：HHX111-CMD，组织：syxyx
- 微信号：a3399388639
- 万网域名：sygo.top
- 不出镜做IP，不主动拍视频，靠截流获取流量

## 学院×宿舍对应关系（用户从抖音核实，待补全）

### 乐山公寓（七里坪）
- 土木（男生）— 智能建造、测绘、城乡规划
- 电气 / 电气工程及其自动化
- 自动化
- 人工智能（部分）
- 机械设计制造及其自动化（男生）

### 采芹公寓（七里坪）
- 土木（女生）
- 通信工程（中外合作）
- 体育 / 体育教育
- 计算机科学与技术
- 电子信息工程
- 人工智能
- 美术生（美术学、视觉传达、环境设计、产品设计待确认）
- 历史学
- 园林（部分）
- 数字经济（部分）
- 理学院（主要）
- 法学（可能）

### 泮水公寓（七里坪）
- 园林（部分）
- 财务管理
- 会计学
- 法学
- 大数据管理与应用
- 数字经济（部分）
- 机械设计制造及其自动化（女生）

### 李子园校区
- 药学
- 音乐 / 舞蹈
- 化学
- 食品科学与工程
- 英语（师范）

### 梅子井校区
- 临床医学
- 医学类大部分

### 待确认
- 物联网工程、通信工程（非中外）
- 智能制造工程、能源与动力工程
- 智能电网信息工程
- 风景园林、地理科学、智慧农业
- 金融工程、国贸、旅管
- 数应、物理
- 汉语言文学、商务英语
- 化工、制药、生物工程
- 思政
- 视觉传达、环境设计、产品设计
- 社体
- 护理、助产、医检、影像、康复

## 待办
- [x] **留言墙：新留言微信通知**（2026-07-10）— 方案 PushPlus 客户端推送（`src/data/notify.js`，发言即从前端 no-cors 推到站长微信）。**待用户填 pushplus token** 才生效，未填自动跳过
- [x] **留言墙：公开回复**（2026-07-10）— messages 表加 `reply` 字段，站长在 Supabase Table Editor 填 reply，前端「查看全部留言」中该条下方显示「🎓 学长回复」。**需在 Supabase 跑 `alter table messages add column reply text;`**
- [x] **留言墙：弹幕化**（2026-07-10 完成）— 留言在一块区域里像 B站弹幕从右往左飘（`.danmaku-area`/`danmakuFloat` in index.css，引擎在 MessageWall.jsx：定时循环放送+发言即飞+悬停暂停），下方「查看全部留言」可展开完整列表
- [x] 网站加图片（14张真实照片已上线）
- [x] 移动端体验优化
- [x] 交互优化（路由回顶/搜索/QA手风琴/微信复制）
- [x] 从官网核实校区-专业分布数据
- [x] 购买域名 sygo.top 并绑定 GitHub Pages
- [x] 仓库迁移到 syxyx/sygo（缩短 URL）
- [x] 微信号更新为 a3399388639
- [x] 官网核对内容（删除查无实据的江北/西湖校区，只留七里坪/李子园）
- [x] 搜索结果锚点定位（点击滚到条目 + 折叠项自动展开，Playwright 实测通过）
- [x] 专业解读按官网重写（52个专业，11个分类）
- [x] 避坑指南优化（分类数量标签、sticky导航、严重程度标签、新增考研条目）
- [x] 关于页面大改（我是谁/网站数据/分享引导/免责声明/更新记录）
- [x] 交互优化（专业sticky导航、搜索框放宽、页面过渡动画、lightbox移动端按钮）
- [x] 全站微信复制逻辑统一（首页CTA、搜索无结果、多处一致）
- [x] Footer加免责声明
- [x] **留言墙**（`MessageWall.jsx` + `src/data/supabase.js`）— 已上线。定位：**访客给站长提问 / 提网站修改建议**的留言板（不是新生报到打卡，早期迭代过，勿混淆）。首页开学倒计时下方，懒加载。后端选型踩坑：LeanCloud 国际版已关停→腾讯云 CloudBase 免费版有阉割/要实名→最终定 **Supabase**（永久免费免绑卡，key 已配置在 supabase.js 里，publishable key 前端公开安全）
- [ ] **专业×宿舍查询** — 等用户收集完数据后再做
- [ ] 补"报到前"高频缺口：学费/住宿费、助学贷款/绿色通道、线上迎新报到系统、电脑选购
- [ ] 各攻略页面底部统一加微信入口
- [ ] 首页加"分享给同学"引导
- [ ] 导航栏"🗺️ 校园地图"emoji风格不统一
