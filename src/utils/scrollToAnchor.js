// 滚动到页内锚点元素
// - NAV_OFFSET：让目标不被顶部固定导航栏遮住
// - 重试查找：折叠内容（QA/避坑）展开后元素才出现
// - 多次校正：ScrollReveal 进场动画(translateY 40px→0)会改变位置
const NAV_OFFSET = 84;

export function scrollToAnchor(anchor) {
  if (!anchor) return;

  let findTries = 0;
  const find = () => {
    const el = document.getElementById(anchor);
    if (el) {
      align(el, 0);
      return;
    }
    // 元素还没渲染（如折叠项未展开），最多重试约 1.2s
    if (findTries++ < 15) setTimeout(find, 80);
  };

  const align = (el, n) => {
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
    window.scrollTo({ top, behavior: n === 0 ? 'smooth' : 'auto' });
    // 进场动画/展开会让高度变化，随后再校正几次
    if (n < 3) setTimeout(() => align(el, n + 1), 300);
  };

  find();
}
