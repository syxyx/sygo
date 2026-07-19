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

## 最新改动

### 7/19 首页热门问题锚点跳转修复
- **问题**：首页「大家都在问」6 个问题点击后只跳页面，不滚到对应章节
- **根因**：`Link` 只有 `to` 路径，没传锚点信息；页面已有 `id`（如 `life-dorm`），`ScrollToTop` 也已支持 `state.anchor`
- **修法**：`content.js` 6 个 hotQuestions 各加 `anchor` 字段 → `Home.jsx` Link 加 `state={{ anchor: h.anchor }}`
- **映射**：宿舍→life-dorm、必带→prepare-checklist、军训→prepare-military、转专业→major-transfer、避坑→pitfall-0-0、生活费→life-money
- **CDN 注意**：改完部署后 CDN 缓存可能延迟几分钟，加 `?v=` 参数可绕过验证

### 7/19 抖音宿舍分配图文发布
- **发布时间**：7/19 晚 9 点（偏晚，建议下次核心内容 18-20 点发）
- **格式**：第 1 张备忘录封面 + 中间网站截图（sygo.top 宿舍页面）+ 最后 1 张备忘录总结
- **关键决策**：不用聊天记录截图（被算法判定模板），备忘录保留状态栏才是原创
- **数据待观察**：明天 7/20 湖南本科批投档日，搜索高峰

### 7/17 宿舍数据全面修正 + 四级规则修正（详见 git log）

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
- **1小时只有互关播放 ≠ 限流**，先搜一下作品能否被搜到；搜索索引有 2-6 小时延迟
- 抖音发布位置不限 GPS，手动搜索选即可（新号可能搜不到远处位置，跳过就行）
- **聊天记录截图（文件传输助手等）会被算法判定模板内容，不推公域**。必须用手机备忘录真实截图（保留状态栏时间戳）
- DOU+ 投放测试是最准的限流排查手段：提示「不适宜加热」= 内容被判定低质
- 即使搜不到作品，也不等于限流（新发布作品搜索索引延迟 2-6 小时）
- **GitHub Pages CDN 缓存**：push 后 JS/CSS 可能延迟 5-10 分钟才更新到所有边缘节点，加 `?v=时间戳` 可绕缓存验证

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

## 学院×宿舍对应关系（7/17 已核实）

### 七里坪新校区

**乐山公寓**（机电城建男生为主）：机械设计制造及其自动化、智能制造工程、能源与动力工程、车辆工程、电气工程及其自动化、自动化、智能电网信息工程、测绘工程、城乡规划、智能建造

**泮水公寓**（经管文法女生为主）：会计学、法学、国际经济与贸易、金融工程、旅游管理、管理科学、大数据管理与应用、数字经济、中外合作通信工程、园林、智慧农业

**采芹公寓**（计算机/设计/理科师范/体育/经管文法男生）：计算机科学与技术、电子信息工程、通信工程、物联网工程、人工智能、数据科学与大数据技术、美术学（师范）、各类设计专业、数学/物理/思政师范、新能源材料与器件、体育类专业

**杏林公寓**（医学专属）：临床医学、护理学、医学检验技术、康复治疗学等全部医学相关专业

### 李子园老校区

**桃李公寓**：汉语言文学（师范）、汉语国际教育、网络与新媒体、历史学（师范）、音乐学（师范）、舞蹈学、生物工程、食品科学与工程、化学工程与工艺、制药工程、英语（师范）、商务英语、翻译（外国语学院全专业）

### Microsoft Clarity 访问统计（7/15 下午添加）
- **代码**：`index.html` `<head>` 中加入 Clarity 脚本（ID: `xms4yqijr7`），已构建部署
- **选型理由**：免费 + 免实名 + 微软 CDN 不拖慢网站（`async=1`）
- **数据延迟**：仪表盘需等约 2 小时，热度图需等 2-24 小时；录制回放即时可用
- **录制不能单条删**，可在设置里加 IP 阻止屏蔽自己的访问（whatismyipaddress.com 查 IP）
- **查看地址**：clarity.microsoft.com

### 抖音私信发链接安全策略（7/15）
- **公开场合**（简介/视频/评论区/图片）绝不出现 sygo.top → 违规降权
- **安全渠道**：粉丝群公告 ✅ | 私信自动回复 ✅（别人主动私信你→你回复，属于正常对话，不违规）
- 私信自动回复设置：创作者服务中心 → 私信管理 → 自动回复 + 关键词触发（攻略、宿舍、新生、网站、链接）

### 抖音运营（7/15）
- 已回复评论（报了湘南学院等邵院结果的用户），回复方向：祝福+引导私信
- 今晚发录取结果查询指南图文（4张备忘录截图），标签 #邵阳学院 #邵阳学院新生 #大一新生
- 发完自己评论置顶：「需要完整攻略的私信我~」

## 待办
- [x] 微信号更新为 aa8618368a（2026-07-11）
- [x] 删除关于页「最近更新」板块（2026-07-11）
- [x] 手机导航栏加「菜单」文字（2026-07-11）
- [x] 留言墙种子数据填充（2026-07-11）
- [x] **留言墙**（MessageWall.jsx + Supabase）— 已上线
- [x] 留言墙弹幕化 / 公开回复 / 微信通知（2026-07-10）
- [x] 抖音竞争分析 + 运营方案（2026-07-12）
- [x] **抖音号「邵院小航学长」已注册 + 第1条图文已发**（7/14，528播放，正常）
- [x] **抖音内容方案已调整为7条备忘录图文**（7/15）
- [x] **聊天记录截图格式已验证无效**（7/16，限流到20播放，已删）
- [x] **冷知识用备忘录格式重发** → **7/18/19 发宿舍分配**（核心期第 1 条已发）
- [x] **首页热门问题锚点跳转修复**（7/19，content.js + Home.jsx）
- [ ] **7/20 发第 5 条「新生不知道的 7 件事」**（信息差内容，高收藏）
- [ ] 7/20 湖南投档日观察宿舍分配图文数据，决定是否投 DOU+ 50-100 元
- [ ] 已砍选题：生活费真实账单、最累专业Top5，以后不碰评价/排名类内容
- [ ] QQ 搜"邵阳学院新生群"加群引流
- [ ] 百度贴吧发帖「2026 新生必看」
- [ ] SEO：加 sitemap.xml + robots.txt + react-helmet-async 独立页面标题
- [ ] 压缩首页校区图片（目前 ~6.5s 加载，图片太大）
- [ ] 避坑指南默认展开 1-2 条分类
- [ ] 入学准备改成可勾选行李清单（localStorage，纯前端）
- [ ] **专业×宿舍查询** — 等用户收集完数据
- [ ] 补"报到前"高频缺口：学费/住宿费、绿色通道、线上报到系统
