import ScrollReveal from '../components/ScrollReveal';
import { aboutContent } from '../data/content';

export default function About() {
  return (
    <>
      <div className="page-header">
        <h1>🙋 关于本站</h1>
        <p>一个邵院学长搞的网站，希望能帮到你</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>

          {/* 介绍 */}
          <ScrollReveal>
            <div style={{ background: '#fff', borderRadius: 16, padding: '36px 32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', marginBottom: 24 }}>
              {aboutContent.intro.map((p, i) => (
                <p key={i} style={{ fontSize: '1rem', color: '#636E72', lineHeight: 2, textIndent: '2em', marginBottom: i < aboutContent.intro.length - 1 ? 8 : 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* 联系方式 */}
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(135deg, #FF6B35, #FF416C)', borderRadius: 16, padding: '36px 32px', color: '#fff', textAlign: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>{aboutContent.contact.title}</h3>
              <p style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 12 }}>{aboutContent.contact.phone}</p>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.7 }}>{aboutContent.contact.tips}</p>
            </div>
          </ScrollReveal>

          {/* 未来计划 */}
          <ScrollReveal>
            <div style={{ background: '#fff', borderRadius: 16, padding: '28px 32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12 }}>{aboutContent.future.title}</h3>
              {aboutContent.future.items.map((item, i) => (
                <p key={i} style={{ fontSize: '0.94rem', color: '#636E72', padding: '5px 0' }}>✨ {item}</p>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}
