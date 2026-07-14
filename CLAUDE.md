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

## 最新改动（2026-07-11）

### 首页 & 移动端
- **开学倒计时改响应式**：内联样式→CSS 类（`.countdown*` in index.css），手机端(≤640px)四格强制一行、缩小，不再占大块
- 首页角标「邵阳学院学长出品」→ 硬编码「**邵院小航学长出品**」（原用 `siteInfo.shortName`，改后 Home 已不引用 siteInfo，import 已删）

### 加入新生群入口
- **方案 A：加个人微信 → 站长手动拉群**（免费免维护、能撑过 100 人大群）。放弃二维码/活码：微信群二维码 **7 天过期 + 满 100 人失效**，大群只能靠人工邀请；活码多要收费/实名
- 首页 hero 下新增蓝橙渐变卡片「👥 加入邵院新生群」；**新增全站吸底悬浮按钮** `src/components/JoinGroupFab.jsx`（左下角，避开右下 BackToTop；样式 `.join-group-fab` in index.css 含移动端安全区）；QA/首页 CTA 文案带「拉你进群」
- Footer 移动端加 `padding-bottom:88px` 给悬浮按钮让位（Footer.css）

### emoji 点缀（小范围）
- 首页热门问题 6 条 + 百问百答 23 条，每条问题**开头点 1 个**贴切 emoji（尺度：只在条目开头一个、不堆砌）

### 上线前整体体检（3 个子 agent 并行审查）+ 修复
- stats「22 个百问百答」→「23」（实际 23 条）
- 清理避坑黑话「dddd」→「懂的都懂」
- 专业「52」→「51」：**合并两个通信工程** —— 删「国际学院」板块，把中外合作（英国 ARU / 学费 22000 / 双学位）并入信息学院 realTalk 一句话
- **搜索优化**：SearchBar 结果**按目的地(path+anchor)去重**（保留手写别名的关键词价值，不删条目）；关于页校区类搜索词(在哪/几个校区/七里坪/李子园) anchor 从 `about-intro` 改指 `prepare-transport`；删「校园地图」无效搜索项（外链无站内落点）
- **体检确认无恙**：路由零死链、图片零 404、微信号全站统一、开学日期 2026-09-13 一致、OG/favicon/404.html 齐全

### 坑 & 注意
- **命令行长命令别在输入框换行**：`claude mcp add ... -- npx @pkg` 被换行拆断只会存半条
- Windows 下 npx 起 MCP 可能要 `cmd /c` 包裹

### 进行中 / 待办
- **Playwright MCP**（浏览器工具，让 Claude 自测网站）：已在 `~/.claude.json` user 级 mcpServers 配 `playwright`（`npx -y @playwright/mcp@latest`），**待重启后 `/mcp` 验证**；失败改 `cmd /c`；首次缺浏览器跑 `npx playwright install chromium`。详见 memory `playwright-mcp-setup`
- 校区口径矛盾（`campuses` 仅 2 个 vs 正文有梅子井）—— 用户暂不处理
- 关于页天气搜索词等"锦上添花"精修项

### 2026-07-11 下午改动
- **微信号更新**：`a3399388639` → `aa8618368a`（content.js x2 + MessageWall.jsx x2，其余组件引用 content.js 变量自动生效）
- **删除关于页「最近更新」板块**：content.js 删 changelog 数据 + About.jsx 删渲染代码
- **手机导航栏加「菜单」二字**：hamburger 三条线下方显示"菜单"，新生一眼知道能点
- **留言墙种子数据**：通过 Supabase REST API 插入 4 条留言，手动设 `created_at` 为过去时间（7/8~7/10），留言墙从 2 条变 6 条，时间错开显自然
- **留言墙 401 修复**：GitHub Pages CDN 缓存了旧版 JS（列名 name/content 对不上真实列 major/text），CDN 刷新后自动恢复

### 工作方式更新
- /deep-research 已关闭，太费 token（上次 137 万）
- 改完代码构建+推送即完成，不等 CDN 验证，用户自己看
- 找 skill/工具只在 GitHub 上找，不用系统自带

## 最新改动（2026-07-12）

### 抖音引流策略制定（Playwright 浏览器调研）
- **竞争分析**：用 Playwright 打开抖音网页版搜索"邵阳学院"，发现 18 个学长/学姐账号在抢流量。最大个人号「邵阳学院小涛学长」7845 粉丝，其余均不足 1200 粉。**没有任何人真正做起来**，市场极其分散。
- **关键发现**：所有竞争对手内容高度同质（宿舍、避坑、攻略），全部引流到微信/QQ群卖卡。**没有一个人有网站**。sygo.top 是独一无二的差异化武器。
- **用户偏好确认**：不出镜、不口播、不拍视频。策略：用抖音**图文模式**（照片+文字+BGM），门槛为零。
- **方案文件**：`抖音运营方案.md`，包含账号设置（邵院小航学长）、简介（放 sygo.top 不放微信号）、10 条首发图文内容（宿舍→避坑→专业→食堂→清单→校园→问答→军训→交通→生活费）、发布节奏（每天12:00一条）、引流话术。
- **核心差异化**：简介放网站不放微信——别人"加微信领资料"，你"网站直接看，不用加我也行"。信任感更强。

### 引流渠道优先级梳理
- QQ 新生群（最直接，今天就能做）→ 百度贴吧（发帖 10 分钟）→ 小红书（图文长尾）→ SEO（技术优化，见效慢）→ 抖音（图文起号，7-8 月是新生流量高峰）

### SEO 技术分析（待实施）
- React SPA + HashRouter → 百度爬虫不执行 JS，看不到内容
- 缺 sitemap.xml、robots.txt、独立页面标题
- 需安装 react-helmet-async 给每个页面独立 title/description

## 最新改动（2026-07-14/15）

### 抖音正式起步
- 7/14 晚发布第一条图文（3张校园照 + 预热文案），播放正常（未限流），账号「邵院小航学长」正式起步
- 简介合规：无网址、无微信、引导私信。位置标不上就跳过，话题标签比位置重要
- 7/15-17 不发作品，专心准备核心5条草稿；7/18 开始发宿舍分配内容

### 宿舍图片系统重构
- **卡片 + Gallery 分离**：每个公寓卡片内嵌单张图片（`content.js` 加 `image` 字段），底部「📸 宿舍实拍」gallery 用独立图片（`-2.jpg` 后缀）
- **新增李子园宿舍图**：`liziyuan.jpg`，补齐5个公寓全覆盖
- **图片压缩**：5张新图用 sharp resize 1200px + jpeg quality 80 压缩，总计从 1.6MB → 358KB

### Lightbox Portal 修复
- **问题**：点击放大图片后不显示在当前屏幕，因为 `ScrollReveal` 的 CSS transform 破坏了 `position: fixed`
- **修法**：`ImageGallery.jsx` 的 Lightbox 用 `createPortal` 挂到 `document.body`，避开 transform 祖先
- **Life.jsx**：公寓卡片图片也加了独立 lightbox（同样 Portal 到 body）

### 搜索索引大幅扩充
- 新增 40+ 条搜索条目，覆盖：图片搜索、公寓细节、食堂、快递、校园设施、出行、百问百答高频、大一新生提问

### 文案调整
- 「百团大战」→「游园会」（内容 + 搜索索引同步）
- 社团介绍后半句微调

### 踩坑记录
- 抖音新号第一条播放延迟正常（10-30分钟才动），能搜到 = 未限流
- 抖音发布位置不限 GPS，手动搜索选即可（新号可能搜不到远处位置，跳过就行）

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
- **公开回复留言（网页内）**：留言框打暗号「回复」→ 密码框 → 站长密码解锁回复模式 → 展开列表点「回复」直接写。站长账号 `owner@sygo.top`（Supabase Auth，密码在后台设，代码里无密码）。安全靠 RLS update 策略（仅 `auth.uid()` 非空可改）。也可继续在 Table Editor 手改 `reply` 单元格
- **微信通知**：Server酱/方糖 客户端推送，SENDKEY 在 `src/data/notify.js`；被骚扰就去后台重置 SENDKEY 再换上
- **关键经验/踩坑**：① 纯静态站(GitHub Pages)通知只能从访客浏览器发→用支持 GET 的服务(Server酱)配 `no-cors`；企业微信/钉钉的 POST webhook 浏览器 CORS 过不了。② 数据层一律 `select('*')`，加字段(如 reply)前后都不报错。③ 免费选型踩了三家：LeanCloud 国际版**已关停**、腾讯云 CloudBase 免费版有阉割+要实名、PushPlus 要实名收费；能白嫖且免实名的是 **Supabase + Server酱**。④ 前端"暗号"只唤 UI，真安全靠 RLS(登录才能写)，别为省事放开 public update(会被人改/删全部留言)。
- **下一步/待清理**：墙里有测试留言（当前 5 条含测试），可在 Table Editor 删掉；其余按需迭代

## 用户偏好
- 所有交流使用中文
- 用户 GitHub：HHX111-CMD，组织：syxyx
- 微信号：aa8618368a
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
- [x] 微信号更新为 aa8618368a（2026-07-11）
- [x] 删除关于页「最近更新」板块（2026-07-11）
- [x] 手机导航栏加「菜单」文字（2026-07-11）
- [x] 留言墙种子数据填充（2026-07-11）
- [x] **留言墙**（MessageWall.jsx + Supabase）— 已上线
- [x] 留言墙弹幕化 / 公开回复 / 微信通知（2026-07-10）
- [x] 抖音竞争分析 + 运营方案（2026-07-12）
- [x] **抖音号「邵院小航学长」已注册 + 第1条图文已发**（2026-07-14，播放正常，未限流）
- [ ] 7/15-17 准备核心5条草稿，7/18 开始发核心内容
- [ ] 7/20 本科批投档日，投100元DOU+（定向湖南17-22岁）
- [ ] 发完 10 条首批图文（按抖音运营方案.md）
- [ ] QQ 搜"邵阳学院新生群"加群引流
- [ ] 百度贴吧发帖「2026 新生必看」
- [ ] SEO：加 sitemap.xml + robots.txt + react-helmet-async 独立页面标题
- [ ] 压缩首页校区图片（目前 ~6.5s 加载，图片太大）
- [ ] 避坑指南默认展开 1-2 条分类
- [ ] 入学准备改成可勾选行李清单（localStorage，纯前端）
- [ ] **专业×宿舍查询** — 等用户收集完数据
- [ ] 补"报到前"高频缺口：学费/住宿费、绿色通道、线上报到系统
