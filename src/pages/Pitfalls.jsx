import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { pitfallsContent } from '../data/content';
import { scrollToAnchor } from '../utils/scrollToAnchor';

const SEVERITY_MAP = {
  danger: { label: '高危', color: '#E53E3E', bg: '#FFF5F5' },
  warning: { label: '注意', color: '#DD6B20', bg: '#FFFAF0' },
  info: { label: '参考', color: '#2B6CB0', bg: '#EBF8FF' },
};

export default function Pitfalls() {
  const [openCat, setOpenCat] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [activeCat, setActiveCat] = useState(0);
  const location = useLocation();
  const catRefs = useRef([]);

  const scrollToCat = (ci) => {
    setOpenCat(ci);
    setActiveCat(ci);
    const el = catRefs.current[ci];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // 滚动时高亮当前可见分类
  useEffect(() => {
    const onScroll = () => {
      let closest = 0;
      let minDist = Infinity;
      catRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - 120);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveCat(closest);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 从搜索跳转过来时：自动展开对应分类+条目并滚动过去
  useEffect(() => {
    const anchor = location.state?.anchor;
    if (!anchor) return;
    const m = anchor.match(/^pitfall-(\d+)-(\d+)$/);
    if (m) {
      const ci = Number(m[1]);
      setOpenCat(ci);
      setOpenItem(`${ci}-${Number(m[2])}`);
      scrollToAnchor(anchor);
    }
  }, [location.state]);

  return (
    <>
      <div className="page-header">
        <h1>🛡️ 避坑指南</h1>
        <p>这些坑学长都替你踩过了，你就别踩了</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 860, margin: '0 auto' }}>

          {/* 快速导航条 */}
          <div style={{
            position: 'sticky', top: 68, zIndex: 100, background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)', borderRadius: 14, padding: '8px 8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 28,
            display: 'flex', flexWrap: 'wrap', gap: 6,
          }}>
            {pitfallsContent.categories.map((cat, ci) => (
              <button
                key={ci}
                onClick={() => scrollToCat(ci)}
                style={{
                  flex: '1 1 auto', minWidth: 0, whiteSpace: 'nowrap',
                  padding: '9px 14px', borderRadius: 10, border: 'none',
                  fontSize: '0.85rem', fontWeight: activeCat === ci ? 700 : 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: activeCat === ci ? 'linear-gradient(135deg, #FF6B35, #FF416C)' : 'transparent',
                  color: activeCat === ci ? '#fff' : '#636E72',
                }}
              >
                {cat.title.split(' ')[0]} {cat.items.length}
              </button>
            ))}
          </div>

          {/* 分类列表 */}
          {pitfallsContent.categories.map((cat, ci) => (
            <ScrollReveal key={ci}>
              <div
                ref={(el) => { catRefs.current[ci] = el; }}
                style={{
                  background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  marginBottom: 24, overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenCat(openCat === ci ? null : ci)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '22px 28px', border: 'none', background: 'none', cursor: 'pointer',
                    fontSize: '1.15rem', fontWeight: 700,
                  }}
                >
                  <span>
                    {cat.title}
                    <span style={{
                      fontSize: '0.78rem', color: '#A0AEC0', fontWeight: 500,
                      marginLeft: 10, background: '#F7F8FC', padding: '3px 10px',
                      borderRadius: 50,
                    }}>
                      {cat.items.length}条
                    </span>
                  </span>
                  <span style={{ color: '#FF6B35', transform: openCat === ci ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>▼</span>
                </button>
                {openCat === ci && (
                  <div style={{ padding: '0 28px 24px' }}>
                    {cat.items.map((item, ii) => {
                      const sev = SEVERITY_MAP[item.severity] || SEVERITY_MAP.info;
                      return (
                        <div key={ii} id={`pitfall-${ci}-${ii}`} style={{ borderTop: '1px solid #f0f0f0' }}>
                          <button
                            onClick={() => setOpenItem(openItem === `${ci}-${ii}` ? null : `${ci}-${ii}`)}
                            style={{
                              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '16px 0', border: 'none', background: 'none', cursor: 'pointer',
                              fontSize: '0.98rem', fontWeight: 600, textAlign: 'left', color: '#2D3436', gap: 10,
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                              <span style={{
                                fontSize: '0.7rem', fontWeight: 700, color: sev.color,
                                background: sev.bg, padding: '2px 8px', borderRadius: 4,
                                whiteSpace: 'nowrap', flexShrink: 0,
                              }}>
                                {sev.label}
                              </span>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>❓ {item.q}</span>
                            </span>
                            <span style={{ color: '#A0AEC0', fontSize: '0.8rem', flexShrink: 0, transform: openItem === `${ci}-${ii}` ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>▼</span>
                          </button>
                          {openItem === `${ci}-${ii}` && (
                            <div style={{
                              padding: '0 0 16px 24px', fontSize: '0.94rem', color: '#636E72',
                              lineHeight: 1.9, borderLeft: '3px solid #FF6B35', marginLeft: 8,
                              animation: 'fadeInUp 0.3s ease',
                            }}>
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}

          {/* 温馨提示 */}
          <ScrollReveal>
            <div style={{
              background: '#FFF8F5', borderRadius: 16, padding: '28px 32px',
              border: '1px solid #FFE0D0', textAlign: 'center',
            }}>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FF6B35', marginBottom: 4 }}>
                💡 总之一句话
              </p>
              <p style={{ fontSize: '0.95rem', color: '#636E72' }}>
                开学第一个月，凡是让你掏钱的事，先问一句"这靠谱吗"，大概率能避开90%的坑。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
