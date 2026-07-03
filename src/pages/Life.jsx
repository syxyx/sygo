import ScrollReveal from '../components/ScrollReveal';
import { lifeContent, aboutContent } from '../data/content';

const { dorm, canteen, money, parttime, clubs, simCard, driving } = lifeContent;

export default function Life() {
  const dormColors = ['#2ECC71', '#1A73E8', '#FFB347'];
  return (
    <>
      <div className="page-header">
        <h1>🏠 校园生活</h1>
        <p>宿舍、食堂、社团、兼职…说实话</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* 宿舍 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{dorm.title}</h2>
              <p style={p}>{dorm.intro}</p>
              {dorm.types.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', marginBottom: 8, background: '#F8F9FC', borderRadius: 12 }}>
                  <span style={{ fontSize: '1.5rem' }}>{['🏆','👍','👌'][i]}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{d.type} <span style={{ color: '#FF6B35' }}>{d.price}</span></div>
                    <div style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>{d.desc}</div>
                  </div>
                  <span style={{ fontSize: '0.8rem' }}>{d.rating}</span>
                </div>
              ))}
              {dorm.tips.map((t, i) => (
                <p key={i} style={{ fontSize: '0.9rem', color: '#636E72', padding: '4px 0' }}>💡 {t}</p>
              ))}
            </div>
          </ScrollReveal>

          {/* 食堂 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{canteen.title}</h2>
              <p style={p}>{canteen.intro}</p>
              {canteen.reviews.map((r, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <strong>{r.name}</strong> <span style={{ fontSize: '0.8rem' }}>{r.score}</span>
                  <p style={{ fontSize: '0.88rem', color: '#A0AEC0', marginTop: 2 }}>{r.comment}</p>
                </div>
              ))}
              <p style={{ fontSize: '0.9rem', color: '#636E72', marginTop: 12 }}>💡 {canteen.tips}</p>
            </div>
          </ScrollReveal>

          {/* 生活费 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{money.title}</h2>
              <p style={p}>{money.intro}</p>
              {money.items.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: 600 }}>{m.item}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 700, color: '#FF6B35' }}>{m.range}元</span>
                    <div style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>{m.note}</div>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: '0.92rem', color: '#636E72', marginTop: 14, fontWeight: 600 }}>{money.total}</p>
            </div>
          </ScrollReveal>

          {/* 兼职 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{parttime.title}</h2>
              <p style={p}>{parttime.intro}</p>
              {parttime.items.map((item, i) => (
                <p key={i} style={{ fontSize: '0.92rem', color: '#636E72', padding: '5px 0' }}>✅ {item}</p>
              ))}
              <div style={{ marginTop: 12, padding: '14px', background: '#FFF5F5', borderRadius: 10, borderLeft: '3px solid #E53E3E' }}>
                <p style={{ fontSize: '0.9rem', color: '#C53030', fontWeight: 600 }}>⚠️ {parttime.warning}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* 社团 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{clubs.title}</h2>
              <p style={p}>{clubs.intro}</p>
            </div>
          </ScrollReveal>

          {/* 校园卡 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{simCard.title}</h2>
              <p style={p}>{simCard.intro}</p>
              {simCard.carriers.map((c, i) => (
                <div key={i} style={{ padding: '16px', marginBottom: 10, background: '#F8F9FC', borderRadius: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{c.name}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#636E72', marginBottom: 4 }}>📶 {c.signal}</p>
                  <p style={{ fontSize: '0.88rem', color: '#636E72', marginBottom: 6 }}>💳 {c.typicalPlan}</p>
                  <p style={{ fontSize: '0.85rem', color: '#FF6B35', fontWeight: 500, background: '#FFF8F5', padding: '8px 12px', borderRadius: 8 }}>💬 学长说实话：{c.realTalk}</p>
                </div>
              ))}
              {simCard.tips.map((t, i) => (
                <p key={i} style={{ fontSize: '0.9rem', color: '#636E72', padding: '4px 0' }}>💡 {t}</p>
              ))}
              <div style={{ marginTop: 16, padding: '18px', background: 'linear-gradient(135deg, #FFF3E0, #FFE8D0)', borderRadius: 12, textAlign: 'center' }}>
                <p style={{ fontWeight: 600, color: '#FF6B35', marginBottom: 8 }}>{simCard.cta}</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FF6B35' }}>📱 {aboutContent.contact.phone}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* 驾校 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{driving.title}</h2>
              <p style={p}>{driving.intro}</p>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8 }}>{driving.shouldYou.title}</h3>
                {driving.shouldYou.items.map((item, i) => (
                  <p key={i} style={{ fontSize: '0.92rem', color: '#636E72', padding: '4px 0' }}>✅ {item}</p>
                ))}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>{driving.shaoyangSchools.title}</h3>
                <p style={{ fontSize: '0.92rem', color: '#636E72', marginBottom: 12 }}>{driving.shaoyangSchools.intro}</p>
                {driving.shaoyangSchools.tips.map((t, i) => (
                  <div key={i} style={{ padding: '12px 14px', marginBottom: 8, background: '#F8F9FC', borderRadius: 10, borderLeft: '3px solid #1A73E8' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{t.title}：</span>
                    <span style={{ fontSize: '0.88rem', color: '#636E72' }}>{t.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '18px', background: 'linear-gradient(135deg, #FFF3E0, #FFE8D0)', borderRadius: 12, textAlign: 'center' }}>
                <p style={{ fontWeight: 600, color: '#FF6B35', marginBottom: 8 }}>{driving.cta}</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FF6B35' }}>📱 {aboutContent.contact.phone}</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}
const card = { background: '#fff', borderRadius: 16, padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', marginBottom: 24 };
const h2 = { fontSize: '1.3rem', fontWeight: 700, marginBottom: 12, color: '#2D3436' };
const p = { fontSize: '0.95rem', color: '#636E72', lineHeight: 1.8, marginBottom: 16 };
