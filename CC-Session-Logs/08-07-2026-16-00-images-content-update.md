# Session Log: 2026-07-08 - 网站图片系统+内容大改

## Quick Reference
图片系统、校园实拍、宿舍实拍、食堂实拍、ImageGallery、倒计时、入学准备重写、百问百答扩充、校园地图、内容页面修改

## Decisions Made
- 图片使用英文文件名（中文文件名导致 GitHub Pages 404）
- 图片路径必须带 `/sysc/` 前缀（GitHub Pages 子路径部署）
- 用 sharp 库压缩图片：resize 1200x800, jpeg quality 80, 压缩率 ~95%
- 校园地图用外部链接 `<a target="_blank">` 而非嵌入 iframe（CAS 登录限制）
- 导航栏支持外部链接（`external: true` 标记）

## Key Learnings
- Vite public 目录文件在 dev 和 prod 的路径行为不同，生产环境要加 base 前缀
- 中文 URL 编码在不同平台行为不一致，最稳妥是英文文件名
- sharp 压缩 PNG→JPG 对大图效果极佳（3-4MB → 150-200KB）

## Solutions & Fixes
1. **图片不显示** → 中文文件名改英文 + 路径加 /sysc/ 前缀
2. **食堂信息错误** → 修正为七里坪4个食堂+李子园思源食堂
3. **宿舍描述过时** → 改为按具体公寓介绍（乐山/采芹/杏林/泮水）
4. **导航栏外部链接** → Navbar.jsx 判断 `link.external` 渲染 `<a>` 或 `<Link>`

## Files Modified
- `src/data/content.js` — 入学准备重写、食堂修正、百问百答新增14题
- `src/pages/Home.jsx` — 校园实拍6张、开学倒计时
- `src/pages/Life.jsx` — 宿舍4张、食堂4张
- `src/pages/Prepare.jsx` — 删除天气板块
- `src/components/Navbar.jsx` — 校园地图链接+外部链接支持
- `src/components/ImageGallery.jsx` — 新建，图片画廊组件
- `src/components/Countdown.jsx` — 新建，开学倒计时组件
- `src/index.css` — 画廊响应式样式
- `public/images/` — 14张真实照片（campus 6 + dorm 4 + canteen 4）
- `CLAUDE.md` — 更新最新改动和部署注意事项

## Pending Tasks
- [ ] 微信分享优化（Open Graph 标签）
- [ ] 清理 HeroSection 死代码
- [ ] 添加 404 页面
- [ ] 抖音注册账号，开始截流

## Quick Resume Context
用户给网站添加了14张真实校园照片（校门/宿舍/食堂），重写了入学准备页面，扩充了百问百答（23题），加了开学倒计时和校园地图导航。关键教训是 GitHub Pages 图片路径必须加 /sysc/ 前缀且文件名用英文。
