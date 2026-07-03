import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { qaContent } from '../data/content';

export default function QA() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

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

          {/* 提问表单 */}
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(135deg, #F8F9FC, #FFF3E0)', borderRadius: 20,
              padding: '40px 32px', textAlign: 'center',
            }}>
              {!formSent ? (
                <>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>📝 没找到你的问题？</h3>
                  <p style={{ color: '#A0AEC0', marginBottom: 24 }}>在下面留言，学长看到会回复你</p>
                  <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: '0 auto' }}>
                    <input
                      type="text"
                      placeholder="你的问题（比如：大一能考四级吗？）"
                      required
                      style={{
                        width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid #E2E8F0',
                        fontSize: '0.95rem', fontFamily: 'inherit', marginBottom: 12, outline: 'none',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="你的微信号或手机号（方便回复你）"
                      style={{
                        width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid #E2E8F0',
                        fontSize: '0.95rem', fontFamily: 'inherit', marginBottom: 16, outline: 'none',
                      }}
                    />
                    <button type="submit" style={{
                      width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                      background: 'linear-gradient(135deg, #FF6B35, #FF416C)', color: '#fff',
                      fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                    }}>
                      提交问题
                    </button>
                  </form>
                </>
              ) : (
                <div>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>✅</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>收到啦！</h3>
                  <p style={{ color: '#636E72' }}>学长看到后会尽快回复你，注意查看微信~</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
