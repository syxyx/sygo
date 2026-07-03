import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { pitfallsContent, aboutContent } from '../data/content';

export default function Pitfalls() {
  const [openCat, setOpenCat] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  return (
    <>
      <div className="page-header">
        <h1>🛡️ 避坑指南</h1>
        <p>这些坑学长都替你踩过了，你就别踩了</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          {pitfallsContent.categories.map((cat, ci) => (
            <ScrollReveal key={ci}>
              <div style={{
                background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                marginBottom: 24, overflow: 'hidden',
              }}>
                <button
                  onClick={() => setOpenCat(openCat === ci ? null : ci)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '22px 28px', border: 'none', background: 'none', cursor: 'pointer',
                    fontSize: '1.15rem', fontWeight: 700,
                  }}
                >
                  <span>{cat.title}</span>
                  <span style={{ color: '#FF6B35', transform: openCat === ci ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>▼</span>
                </button>
                {openCat === ci && (
                  <div style={{ padding: '0 28px 24px' }}>
                    {cat.items.map((item, ii) => (
                      <div key={ii} style={{ borderTop: '1px solid #f0f0f0' }}>
                        <button
                          onClick={() => setOpenItem(openItem === `${ci}-${ii}` ? null : `${ci}-${ii}`)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '16px 0', border: 'none', background: 'none', cursor: 'pointer',
                            fontSize: '0.98rem', fontWeight: 600, textAlign: 'left', color: '#2D3436',
                          }}
                        >
                          <span>❓ {item.q}</span>
                          <span style={{ color: '#A0AEC0', fontSize: '0.8rem', transform: openItem === `${ci}-${ii}` ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>▼</span>
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
                    ))}
                    {ci === 0 && (
                      <div style={{ marginTop: 16, padding: '16px', background: 'linear-gradient(135deg, #FFF3E0, #FFE8D0)', borderRadius: 12, textAlign: 'center' }}>
                        <p style={{ fontWeight: 600, color: '#FF6B35', marginBottom: 6 }}>
                          办卡、报驾校怕被坑？直接加学长微信帮你把关 👇
                        </p>
                        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FF6B35' }}>📱 {aboutContent.contact.phone}</p>
                      </div>
                    )}
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
