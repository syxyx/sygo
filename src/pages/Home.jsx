import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ImageGallery from '../components/ImageGallery';
import Countdown from '../components/Countdown';
import SearchBar from '../components/SearchBar';
import { homeContent, siteInfo } from '../data/content';

// 七里坪校区实拍
const qilipingImages = [
  { src: '/sysc/images/campus/gate-east.jpg', caption: '东门（超越门）' },
  { src: '/sysc/images/campus/gate-north1.jpg', caption: '北一门' },
  { src: '/sysc/images/campus/gate-north2.jpg', caption: '北二门' },
  { src: '/sysc/images/campus/gate-north3.jpg', caption: '北三门' },
  { src: '/sysc/images/campus/library.jpg', caption: '图书馆' },
  { src: '/sysc/images/campus/teaching-building.jpg', caption: '教学楼' },
];

// 李子园校区实拍
const liziyuanImages = [
  { src: '/sysc/images/campus/liziyuan-gate.jpg', caption: '李子园校门' },
  { src: '/sysc/images/campus/liziyuan-library.jpg', caption: '李子园图书馆' },
  { src: '/sysc/images/campus/liziyuan-office.jpg', caption: '李子园办公楼' },
];

// ===== 样式常量 =====
const heroSection = {
  minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  textAlign: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
};
const heroBg = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  background: 'radial-gradient(circle at 30% 40%, rgba(255,107,53,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(26,115,232,0.06) 0%, transparent 50%)',
};
const heroInner = { maxWidth: 700, position: 'relative', zIndex: 1 };
const badge = { display: 'inline-block', padding: '6px 18px', borderRadius: 50, background: 'rgba(255,107,53,0.1)', color: '#FF6B35', fontWeight: 600, fontSize: '0.9rem', marginBottom: 20 };
const h1Style = { fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 12, color: '#2D3436' };
const subtitle = { fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#636E72', marginBottom: 8 };
const desc = { fontSize: '1rem', color: '#A0AEC0', marginBottom: 36, lineHeight: 1.7 };
const searchWrap = { margin: '0 auto 48px' };
const hotLabel = { fontSize: '0.85rem', color: '#A0AEC0', marginBottom: 12 };
const hotTags = { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 48 };
const tag = { padding: '8px 16px', borderRadius: 50, background: '#fff', fontSize: '0.88rem', color: '#636E72', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s', border: '1px solid #E2E8F0' };
const sectionPad = (mb) => ({ padding: `0 24px ${mb}px` });
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 };
const card = { display: 'flex', alignItems: 'flex-start', gap: 16, padding: '28px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transition: 'all 0.3s', border: '1px solid transparent' };
const cardIcon = { fontSize: '2rem', flexShrink: 0 };
const cardTitle = { fontSize: '1.1rem', fontWeight: 700, marginBottom: 4, color: '#2D3436' };
const cardDesc = { fontSize: '0.9rem', color: '#A0AEC0', lineHeight: 1.5 };
const ctaBox = { padding: '48px 32px', background: 'linear-gradient(135deg, #FF6B35, #FF416C)', borderRadius: 24, color: '#fff' };
const ctaTitle = { fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 };
const ctaDesc = { fontSize: '1rem', opacity: 0.9, marginBottom: 24 };
const ctaPhone = { fontSize: '1.6rem', fontWeight: 800, marginBottom: 24 };
const ctaBtn = { display: 'inline-block', padding: '14px 36px', borderRadius: 50, background: '#fff', color: '#FF6B35', fontWeight: 700, fontSize: '1rem' };

// 卡片 hover 处理
const onCardEnter = e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FF6B35'; };
const onCardLeave = e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; };
const onTagEnter = e => { e.currentTarget.style.color = '#FF6B35'; e.currentTarget.style.borderColor = '#FF6B35'; };
const onTagLeave = e => { e.currentTarget.style.color = '#636E72'; e.currentTarget.style.borderColor = '#E2E8F0'; };

export default function Home() {

  return (
    <>
      {/* Hero */}
      <section style={heroSection}>
        <div style={heroBg} />
        <div style={heroInner}>
          <ScrollReveal>
            <div style={badge}>🎓 {siteInfo.shortName}学长出品</div>
            <h1 style={h1Style}>{homeContent.heroTitle}</h1>
            <p style={subtitle}>{homeContent.heroSubtitle}</p>
            <p style={desc}>{homeContent.heroDesc}</p>
            <div style={searchWrap}><SearchBar variant="hero" /></div>
          </ScrollReveal>

          {/* 热门问题 */}
          <ScrollReveal>
            <p style={hotLabel}>大家都在问：</p>
            <div style={hotTags}>
              {homeContent.hotQuestions.map((h, i) => (
                <Link key={i} to={h.to} style={tag}
                  onMouseEnter={onTagEnter} onMouseLeave={onTagLeave}
                >{h.q}</Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 开学倒计时 */}
      <section style={sectionPad(40)}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 className="section-title">⏳ 距离开学还有</h2>
            <p className="section-subtitle" style={{ marginBottom: 24 }}>2026年9月13日，期待与你相见！</p>
            <Countdown />
          </ScrollReveal>
        </div>
      </section>

      {/* 七里坪校区 */}
      <section style={sectionPad(60)}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">📷 七里坪校区</h2>
            <p className="section-subtitle">主校区，大部分同学都在这里~</p>
          </ScrollReveal>
          <ScrollReveal>
            <ImageGallery images={qilipingImages} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* 李子园校区 */}
      <section style={sectionPad(80)}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">📷 李子园校区</h2>
            <p className="section-subtitle">老校区，文化底蕴十足~</p>
          </ScrollReveal>
          <ScrollReveal>
            <ImageGallery images={liziyuanImages} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* 功能区 */}
      <section style={sectionPad(80)}>
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">我能帮你什么？</h2>
            <p className="section-subtitle">点一个看看👇</p>
          </ScrollReveal>
          <div style={grid}>
            {homeContent.features.map((f, i) => (
              <ScrollReveal key={i}>
                {f.external ? (
                  <a href={f.to} target="_blank" rel="noopener noreferrer" style={card}
                    onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
                    <span style={cardIcon}>{f.icon}</span>
                    <div>
                      <h3 style={cardTitle}>{f.title}</h3>
                      <p style={cardDesc}>{f.desc}</p>
                    </div>
                  </a>
                ) : (
                  <Link to={f.to} style={card}
                    onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
                    <span style={cardIcon}>{f.icon}</span>
                    <div>
                      <h3 style={cardTitle}>{f.title}</h3>
                      <p style={cardDesc}>{f.desc}</p>
                    </div>
                  </Link>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={sectionPad(80)}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <div style={ctaBox}>
              <h2 style={ctaTitle}>还有问题？直接找我聊</h2>
              <p style={ctaDesc}>别不好意思，谁大一不是懵过来的呢 😄</p>
              <p style={ctaPhone}>📱 {homeContent.contactPhone}</p>
              <Link to="/qa" style={ctaBtn}>💬 加微信</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
