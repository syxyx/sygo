import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { aboutContent } from '../data/content';

export default function About() {
  const [copied, setCopied] = useState(false);
  const phone = aboutContent.contact.phone;

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
    } catch {
      const el = document.createElement('textarea');
      el.value = phone;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* 忽略 */ }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="page-header">
        <h1>🙋 关于本站</h1>
        <p>{aboutContent.subtitle}</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>

          {/* 我是谁 */}
          <ScrollReveal id="about-intro">
            <div style={card}>
              <h2 style={h2}>{aboutContent.whoami.title}</h2>
              <p style={p}>{aboutContent.whoami.content}</p>
            </div>
          </ScrollReveal>

          {/* 为什么做这个网站 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{aboutContent.intro.title}</h2>
              {aboutContent.intro.items.map((item, i) => (
                <p key={i} style={{ ...p, padding: '4px 0' }}>✨ {item}</p>
              ))}
            </div>
          </ScrollReveal>

          {/* 网站数据 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{aboutContent.stats.title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginTop: 8 }}>
                {aboutContent.stats.items.map((item, i) => (
                  <div key={i} style={{
                    padding: '16px', borderRadius: 12, background: '#F8F9FC',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FF6B35' }}>{item.label}</div>
                    <div style={{ fontSize: '0.82rem', color: '#A0AEC0', marginTop: 4 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 加微信 */}
          <ScrollReveal id="about-contact">
            <div style={{
              background: 'linear-gradient(135deg, #FF6B35, #FF416C)', borderRadius: 16,
              padding: '36px 32px', color: '#fff', textAlign: 'center', marginBottom: 24,
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>{aboutContent.contact.title}</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.7, marginBottom: 16 }}>
                {aboutContent.contact.tips}
              </p>
              <button
                className="wechat-copy"
                onClick={copyPhone}
                style={{
                  display: 'inline-block', background: 'rgba(255,255,255,0.2)',
                  borderRadius: 16, padding: '20px 36px', color: '#fff', border: '2px solid rgba(255,255,255,0.4)',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: 6 }}>
                  📱 学长微信 {copied ? '（已复制✓）' : '（点击复制）'}
                </p>
                <p style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: 1 }}>{phone}</p>
              </button>
            </div>
          </ScrollReveal>

          {/* 分享引导 */}
          <ScrollReveal>
            <div style={{ ...card, background: '#F0F7FF', border: '1px solid #B8D4F0', textAlign: 'center' }}>
              <h2 style={h2}>{aboutContent.share.title}</h2>
              <p style={{ ...p, marginBottom: 0 }}>{aboutContent.share.content}</p>
            </div>
          </ScrollReveal>

          {/* 免责声明 */}
          <ScrollReveal>
            <div style={{ ...card, background: '#FFF8F5', border: '1px solid #FFE0D0' }}>
              <h2 style={{ ...h2, fontSize: '1rem' }}>{aboutContent.disclaimer.title}</h2>
              <p style={{ ...p, fontSize: '0.88rem', marginBottom: 0 }}>{aboutContent.disclaimer.content}</p>
            </div>
          </ScrollReveal>

          {/* 更新记录 */}
          <ScrollReveal>
            <div style={card}>
              <h2 style={h2}>{aboutContent.changelog.title}</h2>
              {aboutContent.changelog.items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, padding: '10px 0',
                  borderBottom: i < aboutContent.changelog.items.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}>
                  <span style={{
                    fontSize: '0.78rem', color: '#A0AEC0', whiteSpace: 'nowrap',
                    fontWeight: 500, flexShrink: 0, minWidth: 80,
                  }}>{item.date}</span>
                  <span style={{ fontSize: '0.92rem', color: '#636E72', lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}

const card = {
  background: '#fff', borderRadius: 16, padding: '28px 32px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.05)', marginBottom: 24,
};
const h2 = { fontSize: '1.15rem', fontWeight: 700, marginBottom: 12, color: '#2D3436' };
const p = { fontSize: '0.95rem', color: '#636E72', lineHeight: 1.9 };
