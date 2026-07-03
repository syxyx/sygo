import ScrollReveal from '../components/ScrollReveal';
import { prepareContent } from '../data/content';

const { checklist, dontBring, weather, military, transport, process } = prepareContent;

export default function Prepare() {
  return (
    <>
      <div className="page-header">
        <h1>🎒 入学准备</h1>
        <p>开学前把这些搞定，到校不慌</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* 必带清单 */}
          <ScrollReveal>
            <div style={cardStyle}>
              <h2 style={h2Style}>{checklist.title}</h2>
              <p style={pStyle}>{checklist.intro}</p>
              {checklist.must.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontSize: '1.4rem' }}>{m.emoji}</span>
                  <div>
                    <strong style={{ fontSize: '1rem' }}>{m.item}</strong>
                    <p style={{ fontSize: '0.88rem', color: '#A0AEC0', marginTop: 2 }}>{m.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 不用带 */}
          <ScrollReveal>
            <div style={{ ...cardStyle, background: '#FFF8F5', border: '1px solid #FFE0D0' }}>
              <h2 style={h2Style}>{dontBring.title}</h2>
              <p style={pStyle}>{dontBring.intro}</p>
              {dontBring.items.map((item, i) => (
                <p key={i} style={{ fontSize: '0.95rem', color: '#636E72', padding: '6px 0' }}>✕ {item}</p>
              ))}
            </div>
          </ScrollReveal>

          {/* 天气 */}
          <ScrollReveal>
            <div style={cardStyle}>
              <h2 style={h2Style}>{weather.title}</h2>
              <p style={pStyle}>{weather.content}</p>
            </div>
          </ScrollReveal>

          {/* 军训 */}
          <ScrollReveal>
            <div style={cardStyle}>
              <h2 style={h2Style}>{military.title}</h2>
              <p style={pStyle}>{military.intro}</p>
              {military.tips.map((t, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <strong style={{ color: '#FF6B35' }}>{t.title}</strong>
                  <p style={{ fontSize: '0.92rem', color: '#636E72', marginTop: 4 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 交通 */}
          <ScrollReveal>
            <div style={cardStyle}>
              <h2 style={h2Style}>{transport.title}</h2>
              {transport.items.map((item, i) => (
                <p key={i} style={{ fontSize: '0.95rem', color: '#636E72', padding: '6px 0' }}>🚩 {item}</p>
              ))}
            </div>
          </ScrollReveal>

          {/* 报到流程 */}
          <ScrollReveal>
            <div style={cardStyle}>
              <h2 style={h2Style}>{process.title}</h2>
              {process.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #FF8F66)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: '0.95rem', color: '#636E72' }}>{s}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}

const cardStyle = {
  background: '#fff', borderRadius: 16, padding: '32px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.05)', marginBottom: 24,
};
const h2Style = { fontSize: '1.3rem', fontWeight: 700, marginBottom: 12, color: '#2D3436' };
const pStyle = { fontSize: '0.95rem', color: '#636E72', lineHeight: 1.8, marginBottom: 16 };
