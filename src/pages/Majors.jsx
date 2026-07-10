import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { majorsContent } from '../data/content';
import { scrollToAnchor } from '../utils/scrollToAnchor';

export default function Majors() {
  const [activeIdx, setActiveIdx] = useState(0);
  const location = useLocation();
  const catRefs = useRef([]);

  const scrollToCat = (i) => {
    setActiveIdx(i);
    const el = catRefs.current[i];
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
      setActiveIdx(closest);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 从搜索跳转过来时滚动到对应学院
  useEffect(() => {
    const anchor = location.state?.anchor;
    if (!anchor) return;
    scrollToAnchor(anchor);
  }, [location.state]);

  return (
    <>
      <div className="page-header">
        <h1>📖 专业解读</h1>
        <p>说人话版专业介绍，不整那些官方的</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 860, margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ textAlign: 'center', color: '#636E72', fontSize: '1rem', lineHeight: 1.8, marginBottom: 28 }}>
              {majorsContent.intro}
            </p>
          </ScrollReveal>

          {/* 快速导航条 */}
          <div style={{
            position: 'sticky', top: 68, zIndex: 100, background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)', borderRadius: 14, padding: '6px 6px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 28,
            display: 'flex', flexWrap: 'wrap', gap: 4,
          }}>
            {majorsContent.colleges.map((col, i) => (
              <button
                key={i}
                onClick={() => scrollToCat(i)}
                title={col.name}
                style={{
                  flex: '1 1 auto', minWidth: 0, whiteSpace: 'nowrap',
                  padding: '8px 10px', borderRadius: 10, border: 'none',
                  fontSize: '0.78rem', fontWeight: activeIdx === i ? 700 : 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: activeIdx === i ? 'linear-gradient(135deg, #FF6B35, #FF416C)' : 'transparent',
                  color: activeIdx === i ? '#fff' : '#636E72',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}
              >
                {col.icon} {col.name.length > 5 ? col.name.slice(0, 5) + '…' : col.name}
              </button>
            ))}
          </div>

          {/* 专业列表 */}
          {majorsContent.colleges.map((col, i) => (
            <ScrollReveal key={i} id={`major-${i}`}>
              <div
                ref={(el) => { catRefs.current[i] = el; }}
                style={{ background: '#fff', borderRadius: 16, padding: '28px 32px', marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{col.icon} {col.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {col.majors.map((m, j) => (
                    <span key={j} style={{ padding: '4px 12px', borderRadius: 50, background: '#F0F4FF', color: '#1A73E8', fontSize: '0.82rem', fontWeight: 500 }}>{m}</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.92rem', color: '#636E72', lineHeight: 1.8, marginBottom: 12 }}>💬 {col.realTalk}</p>
                <p style={{ fontSize: '0.88rem', color: '#A0AEC0' }}>💼 就业方向：{col.job}</p>
              </div>
            </ScrollReveal>
          ))}

          {/* 转专业 */}
          <ScrollReveal id="major-transfer">
            <div style={{ background: '#FFF8F5', borderRadius: 16, padding: '28px 32px', border: '1px solid #FFE0D0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>{majorsContent.transfer.title}</h3>
              <p style={{ fontSize: '0.94rem', color: '#636E72', lineHeight: 1.8 }}>{majorsContent.transfer.content}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
