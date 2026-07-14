import ScrollReveal from '../components/ScrollReveal';
import ImageGallery from '../components/ImageGallery';
import { lifeContent } from '../data/content';

const { dorm, canteen, money, parttime, clubs } = lifeContent;

// 宿舍实拍图片
const dormImages = [
  { src: '/images/dorm/leshan-2.jpg', caption: '乐山公寓' },
  { src: '/images/dorm/caiqin-2.jpg', caption: '采芹公寓' },
  { src: '/images/dorm/xinglin-2.jpg', caption: '杏林公寓' },
  { src: '/images/dorm/panyong-2.jpg', caption: '泮水公寓' },
];

// 食堂实拍图片
const canteenImages = [
  { src: '/images/canteen/liuxiang.jpg', caption: '留香食堂' },
  { src: '/images/canteen/yixiang.jpg', caption: '溢香食堂' },
  { src: '/images/canteen/xinxiang.jpg', caption: '馨香食堂' },
  { src: '/images/canteen/xingxiang.jpg', caption: '杏香食堂' },
];

export default function Life() {
  return (
    <>
      <div className="page-header">
        <h1>🏠 校园生活</h1>
        <p>宿舍、食堂、社团、兼职…说实话</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* 宿舍 */}
          <ScrollReveal id="life-dorm">
            <div style={card}>
              <h2 style={h2}>{dorm.title}</h2>
              <p style={p}>{dorm.intro}</p>
              {dorm.apartments.map((apt, i) => (
                <div key={i} style={{ marginBottom: 24, padding: 20, background: '#F8F9FC', borderRadius: 16 }}>
                  {/* 公寓头部 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: '1.6rem' }}>{['🏗️','🏆','🌊','🏥','🏘️'][i]}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#2D3436' }}>{apt.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>{apt.location} · {apt.rooms}</div>
                    </div>
                    <span style={{ fontSize: '0.85rem', background: '#fff', padding: '4px 12px', borderRadius: 20, fontWeight: 600 }}>{apt.rating}</span>
                  </div>
                  {/* 标签 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                    {apt.tags.map((t, j) => (
                      <span key={j} style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: 12, background: '#fff', color: '#FF6B35', border: '1px solid #FFE0D0' }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#636E72', marginBottom: 14, lineHeight: 1.6 }}>{apt.desc}</p>
                  {/* 公寓图片 */}
                  {apt.image && (
                    <div style={{ marginBottom: 14, borderRadius: 12, overflow: 'hidden' }}>
                      <img src={apt.image} alt={apt.name} style={{ width: '100%', display: 'block' }} />
                    </div>
                  )}
                  {!apt.image && (
                    <div style={{ marginBottom: 14, padding: '32px 16px', borderRadius: 12, background: '#F0F0F0', textAlign: 'center', color: '#A0AEC0', fontSize: '0.85rem' }}>
                      📷 图片待补充
                    </div>
                  )}
                  {/* 专业分配 */}
                  {apt.majors.male.length > 0 && (
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A73E8', marginRight: 8 }}>男生 👨</span>
                      <span style={{ fontSize: '0.82rem', color: '#636E72', lineHeight: 1.8 }}>{apt.majors.male.join('、')}</span>
                    </div>
                  )}
                  {apt.majors.female.length > 0 && (
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E53E3E', marginRight: 8 }}>女生 👩</span>
                      <span style={{ fontSize: '0.82rem', color: '#636E72', lineHeight: 1.8 }}>{apt.majors.female.join('、')}</span>
                    </div>
                  )}
                  {apt.majors.note && (
                    <p style={{ fontSize: '0.78rem', color: '#A0AEC0', marginTop: 6, fontStyle: 'italic' }}>📌 {apt.majors.note}</p>
                  )}
                </div>
              ))}
              {dorm.tips.map((t, idx) => (
                <p key={idx} style={{ fontSize: '0.9rem', color: '#636E72', padding: '4px 0' }}>💡 {t}</p>
              ))}
              <div style={{ marginTop: 20 }}>
                <ImageGallery images={dormImages} columns={2} title="📸 宿舍实拍" />
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#A0AEC0', marginTop: 12 }}>💬 新生群有详细宿舍照片，加学长微信拉你进群~</p>
            </div>
          </ScrollReveal>

          {/* 食堂 */}
          <ScrollReveal id="life-canteen">
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
              <div style={{ marginTop: 20 }}>
                <ImageGallery images={canteenImages} columns={2} title="📸 食堂实拍" />
              </div>
            </div>
          </ScrollReveal>

          {/* 生活费 */}
          <ScrollReveal id="life-money">
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
          <ScrollReveal id="life-parttime">
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
          <ScrollReveal id="life-clubs">
            <div style={card}>
              <h2 style={h2}>{clubs.title}</h2>
              <p style={p}>{clubs.intro}</p>
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
