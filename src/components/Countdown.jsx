import { useState, useEffect } from 'react';

// 开学日期：2026年9月13日（可调整）
const TARGET_DATE = new Date('2026-09-13T08:00:00');

function calcTimeLeft() {
  const diff = TARGET_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
      marginBottom: 8,
    }}>
      {[
        { num: time.days, label: '天' },
        { num: time.hours, label: '时' },
        { num: time.minutes, label: '分' },
        { num: time.seconds, label: '秒' },
      ].map((item, i) => (
        <div key={i} style={{
          background: '#fff', borderRadius: 14, padding: '16px 20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)', textAlign: 'center',
          minWidth: 70,
        }}>
          <div style={{
            fontSize: '2rem', fontWeight: 900,
            background: 'linear-gradient(135deg, #FF6B35, #FF416C)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {String(item.num).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#A0AEC0', marginTop: 4 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
