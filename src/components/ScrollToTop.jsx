import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToAnchor } from '../utils/scrollToAnchor';

// 路由切换时：带锚点则滚到对应条目，否则回到页面顶部
export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const anchor = state?.anchor;
    if (anchor) {
      scrollToAnchor(anchor);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, state]);

  return null;
}
