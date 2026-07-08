import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

export default function NotFound() {
  return (
    <section style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px 80px', textAlign: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 30% 40%, rgba(255,107,53,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(26,115,232,0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 500, position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div style={{
            fontSize: '8rem', fontWeight: 900, lineHeight: 1,
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF416C 50%, #1A73E8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 16,
          }}>
            404
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2D3436', marginBottom: 8 }}>
            页面走丢了 😅
          </h2>
          <p style={{ fontSize: '1rem', color: '#A0AEC0', marginBottom: 36, lineHeight: 1.7 }}>
            你访问的页面不存在，可能链接错了或者被我删了。<br/>要不回首页看看？
          </p>
          <Link to="/" style={{
            display: 'inline-block', padding: '14px 40px', borderRadius: 50,
            background: 'linear-gradient(135deg, #FF6B35, #FF416C)',
            color: '#fff', fontWeight: 700, fontSize: '1rem',
            boxShadow: '0 4px 16px rgba(255,107,53,0.35)',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,53,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,53,0.35)'; }}
          >🏠 回到首页</Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
