import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { qaContent, aboutContent } from '../data/content';

export default function QA() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="page-header">
        <h1>💬 百问百答</h1>
        <p>{qaContent.subtitle}</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ textAlign: 'center', color: '#636E72', fontSize: '1rem', marginBottom: 36, lineHeight: 1.7 }}>
              {qaContent.intro}
            </p>
          </ScrollReveal>

          {/* FAQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 64 }}>
            {qaContent.questions.map((item, i) => (
              <ScrollReveal key={i}>
                <div style={{
                  background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  overflow: 'hidden', border: openIndex === i ? '1px solid #FF6B35' : '1px solid transparent',
                  transition: 'border 0.3s',
                }}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                      padding: '18px 24px', border: 'none', background: 'none', cursor: 'pointer',
                      fontSize: '1rem', fontWeight: 600, textAlign: 'left', gap: 12,
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ color: '#FF6B35', fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>Q</span>
                      {item.q}
                    </span>
                    <span style={{ color: '#A0AEC0', transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: '0.3s', flexShrink: 0 }}>▼</span>
                  </button>
                  {openIndex === i && (
                    <div style={{
                      padding: '0 24px 20px 48px', fontSize: '0.94rem', color: '#636E72',
                      lineHeight: 1.9, animation: 'fadeInUp 0.3s ease',
                    }}>
                      <span style={{ color: '#1A73E8', fontWeight: 700 }}>A </span>
                      {item.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* 加微信 */}
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(135deg, #F8F9FC, #FFF3E0)', borderRadius: 20,
              padding: '40px 32px', textAlign: 'center',
            }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>🙋</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>还有问题？直接问学长</h3>
              <p style={{ color: '#636E72', marginBottom: 20, lineHeight: 1.7 }}>
                没找到答案？加学长微信，有问题直接问<br />
                平时也会在朋友圈分享校园干货~
              </p>
              <div style={{
                display: 'inline-block', background: 'linear-gradient(135deg, #FF6B35, #FF416C)',
                borderRadius: 16, padding: '20px 36px', color: '#fff',
              }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: 6 }}>📱 学长微信</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: 1 }}>{aboutContent.contact.phone}</p>
              </div>
              <p style={{ color: '#A0AEC0', fontSize: '0.85rem', marginTop: 16 }}>
                添加时备注"新生"，学长通过更快哦
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
