import ScrollReveal from '../components/ScrollReveal';
import { majorsContent } from '../data/content';

export default function Majors() {
  return (
    <>
      <div className="page-header">
        <h1>📖 专业解读</h1>
        <p>说人话版专业介绍，不整那些官方的</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ textAlign: 'center', color: '#636E72', fontSize: '1rem', lineHeight: 1.8, marginBottom: 40 }}>
              {majorsContent.intro}
            </p>
          </ScrollReveal>

          {majorsContent.colleges.map((col, i) => (
            <ScrollReveal key={i} id={`major-${i}`}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '28px 32px', marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
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
