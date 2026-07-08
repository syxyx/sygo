import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import ImageGallery from '../components/ImageGallery';
import Countdown from '../components/Countdown';
import { homeContent, siteInfo } from '../data/content';
import searchIndex from '../data/searchIndex';

// 校园实拍图片 - 替换为真实照片：把图片放到 public/images/campus/ 目录下
const campusImages = [
  { src: '/images/campus/%E4%B8%9C%E9%97%A8%EF%BC%88%E8%B6%85%E8%B6%8A%E9%97%A8).png', caption: '东门（超越门）' },
  { src: '/images/campus/%E5%8C%97%E4%B8%80%E9%97%A8.png', caption: '北一门' },
  { src: '/images/campus/%E5%8C%97%E4%BA%8C%E9%97%A8.png', caption: '北二门' },
  { src: '/images/campus/%E5%8C%97%E4%B8%89%E9%97%A8.png', caption: '北三门' },
  { src: '/images/campus/playground.svg', caption: '图书馆' },
  { src: '/images/campus/campus-road.svg', caption: '教学楼' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (val) => {
    setQuery(val);
    if (!val.trim()) { setResults([]); return; }
    const q = val.toLowerCase();
    setResults(searchIndex.filter(item =>
      `${item.title} ${item.keywords}`.toLowerCase().includes(q)
    ).slice(0, 6));
  };

  const goTo = (path) => { setQuery(''); setResults([]); navigate(path); };

  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(255,107,53,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(26,115,232,0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 50, background: 'rgba(255,107,53,0.1)', color: '#FF6B35', fontWeight: 600, fontSize: '0.9rem', marginBottom: 20 }}>
              🎓 {siteInfo.shortName}学长出品
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 12, color: '#2D3436' }}>
              {homeContent.heroTitle}
            </h1>
            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#636E72', marginBottom: 8 }}>
              {homeContent.heroSubtitle}
            </p>
            <p style={{ fontSize: '1rem', color: '#A0AEC0', marginBottom: 36, lineHeight: 1.7 }}>
              {homeContent.heroDesc}
            </p>

            {/* 搜索框 */}
            <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto 48px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 50,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '4px 4px 4px 20px',
                border: '2px solid #E2E8F0', transition: 'border 0.3s',
              }}>
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="搜一下你的问题，比如：宿舍有空调吗？"
                  value={query}
                  onChange={e => handleSearch(e.target.value)}
                  style={{
                    flex: 1, border: 'none', outline: 'none', padding: '12px 10px',
                    fontSize: '0.95rem', fontFamily: 'inherit', background: 'transparent',
                  }}
                />
              </div>
              {results.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff',
                  borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.12)', marginTop: 8,
                  overflow: 'hidden', zIndex: 100, textAlign: 'left',
                }}>
                  {results.map((r, i) => (
                    <div key={i} onClick={() => goTo(r.path)} style={{
                      padding: '14px 20px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FFF8F5'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 2 }}>{r.title}</div>
                      <div style={{ fontSize: '0.82rem', color: '#A0AEC0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.snippet}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* 热门问题 */}
          <ScrollReveal>
            <p style={{ fontSize: '0.85rem', color: '#A0AEC0', marginBottom: 12 }}>大家都在问：</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
              {homeContent.hotQuestions.map((h, i) => (
                <Link key={i} to={h.to} style={{
                  padding: '8px 16px', borderRadius: 50, background: '#fff',
                  fontSize: '0.88rem', color: '#636E72', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s', border: '1px solid #E2E8F0',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#FF6B35'; e.currentTarget.style.borderColor = '#FF6B35'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#636E72'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                >{h.q}</Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 校园风光 */}
      {/* 开学倒计时 */}
      <section style={{ padding: '0 24px 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 className="section-title">⏳ 距离开学还有</h2>
            <p className="section-subtitle" style={{ marginBottom: 24 }}>2026年9月13日，期待与你相见！</p>
            <Countdown />
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: '0 24px 60px' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">📷 校园实拍</h2>
            <p className="section-subtitle">先带你云逛一圈邵院~</p>
          </ScrollReveal>
          <ScrollReveal>
            <ImageGallery images={campusImages} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* 功能区 */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">我能帮你什么？</h2>
            <p className="section-subtitle">点一个看看👇</p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {homeContent.features.map((f, i) => (
              <ScrollReveal key={i}>
                {f.external ? (
                  <a href={f.to} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16, padding: '28px 24px',
                    background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s', border: '1px solid transparent',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FF6B35'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}
                  >
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4, color: '#2D3436' }}>{f.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#A0AEC0', lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </a>
                ) : (
                  <Link to={f.to} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16, padding: '28px 24px',
                    background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s', border: '1px solid transparent',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FF6B35'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}
                  >
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4, color: '#2D3436' }}>{f.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#A0AEC0', lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </Link>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{
              padding: '48px 32px', background: 'linear-gradient(135deg, #FF6B35, #FF416C)',
              borderRadius: 24, color: '#fff',
            }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>还有问题？直接找我聊</h2>
              <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: 24 }}>别不好意思，谁大一不是懵过来的呢 😄</p>
              <p style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 24 }}>📱 {homeContent.contactPhone}</p>
              <Link to="/qa" style={{
                display: 'inline-block', padding: '14px 36px', borderRadius: 50,
                background: '#fff', color: '#FF6B35', fontWeight: 700, fontSize: '1rem',
              }}>💬 加微信</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
