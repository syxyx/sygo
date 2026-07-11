import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { qaContent, aboutContent } from '../data/content';
import { scrollToAnchor } from '../utils/scrollToAnchor';

// 单个 FAQ 项：用 max-height + ref 实现平滑展开/收起
function FaqItem({ item, isOpen, onToggle, anchorId }) {
  const bodyRef = useRef(null);

  return (
    <div id={anchorId} style={{
      background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      overflow: 'hidden', border: isOpen ? '1px solid #FF6B35' : '1px solid transparent',
      transition: 'border 0.3s',
    }}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
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
        <span style={{ color: '#A0AEC0', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>▼</span>
      </button>
      <div style={{
        maxHeight: isOpen ? (bodyRef.current?.scrollHeight || 600) : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <div ref={bodyRef} style={{
          padding: '0 24px 20px 48px', fontSize: '0.94rem', color: '#636E72', lineHeight: 1.9,
        }}>
          <span style={{ color: '#1A73E8', fontWeight: 700 }}>A </span>
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function QA() {
  const [openIndex, setOpenIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const phone = aboutContent.contact.phone;
  const location = useLocation();

  // 从搜索跳转过来时：自动展开对应问题并滚动过去
  useEffect(() => {
    const anchor = location.state?.anchor;
    if (!anchor) return;
    const m = anchor.match(/^qa-(\d+)$/);
    if (m) {
      const idx = Number(m[1]);
      setOpenIndex(idx);
      // 展开后再滚动（scrollToAnchor 自带重试与位置校正）
      scrollToAnchor(anchor);
    } else if (anchor === 'qa-contact') {
      scrollToAnchor('qa-contact');
    }
  }, [location.state]);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
    } catch {
      // 降级：老浏览器用 execCommand
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
                <FaqItem
                  item={item}
                  anchorId={`qa-${i}`}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* 加微信 */}
          <ScrollReveal id="qa-contact">
            <div style={{
              background: 'linear-gradient(135deg, #F8F9FC, #FFF3E0)', borderRadius: 20,
              padding: '40px 32px', textAlign: 'center',
            }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>🙋</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>还有问题？直接问学长</h3>
              <p style={{ color: '#636E72', marginBottom: 20, lineHeight: 1.7 }}>
                没找到答案？加学长微信，拉你进新生群，有问题群里随时问<br />
                平时也会在朋友圈分享校园干货~
              </p>
              <button
                className="wechat-copy"
                onClick={copyPhone}
                style={{
                  display: 'inline-block', background: 'linear-gradient(135deg, #FF6B35, #FF416C)',
                  borderRadius: 16, padding: '20px 36px', color: '#fff', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: 6 }}>
                  📱 学长微信 {copied ? '（已复制✓）' : '（点击复制）'}
                </p>
                <p style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: 1 }}>{phone}</p>
              </button>
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
