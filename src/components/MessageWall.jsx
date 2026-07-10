import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'sygo_message_wall';
const MAX_MSG = 100;
const COOLDOWN = 10000; // 10秒冷却

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch { return []; }
}

function saveMessages(msgs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(0, MAX_MSG)));
  } catch { /* 存储满 */ }
}

export default function MessageWall() {
  const [messages, setMessages] = useState(loadMessages);
  const [major, setMajor] = useState('');
  const [text, setText] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [copied, setCopied] = useState(false);
  const listRef = useRef(null);

  // 自动滚动到最新
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  const submit = () => {
    const t = text.trim();
    const m = major.trim();
    if (!t || cooldown) return;
    if (t.length > 60) return;

    const newMsg = {
      id: Date.now(),
      major: m || '匿名新生',
      text: t,
      time: Date.now(),
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    saveMessages(updated);
    setText('');
    setCooldown(true);
    setTimeout(() => setCooldown(false), COOLDOWN);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText('a3399388639');
    } catch {
      const el = document.createElement('textarea');
      el.value = 'a3399388639';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* 忽略 */ }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{ padding: '0 24px 80px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 className="section-title">🎉 新生报到墙</h2>
        <p className="section-subtitle">留下你的专业和想说的话，看看有多少同路人~</p>

        {/* 留言总数 */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', padding: '8px 24px', borderRadius: 50,
            background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,65,108,0.1))',
            color: '#FF6B35', fontWeight: 700, fontSize: '0.95rem',
          }}>
            🎓 已有 {messages.length} 位新生报到
          </span>
        </div>

        {/* 输入区 */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '24px 28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24,
        }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="你的专业（选填）"
              value={major}
              onChange={e => setMajor(e.target.value)}
              maxLength={20}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <textarea
              placeholder="说点什么吧…（比如：计算机科学与技术，期待大学生活！）"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={60}
              rows={2}
              style={{ ...inputStyle, resize: 'none', flex: 1, minWidth: 200 }}
            />
            <button
              onClick={submit}
              disabled={cooldown || !text.trim()}
              style={{
                padding: '12px 24px', borderRadius: 14, border: 'none',
                background: text.trim() && !cooldown
                  ? 'linear-gradient(135deg, #FF6B35, #FF416C)'
                  : '#E2E8F0',
                color: text.trim() && !cooldown ? '#fff' : '#A0AEC0',
                fontWeight: 700, fontSize: '0.95rem', cursor: text.trim() && !cooldown ? 'pointer' : 'default',
                fontFamily: 'inherit', whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {cooldown ? '⏳' : '🚀 报到'}
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: '0.78rem', color: '#A0AEC0' }}>
              {text.length}/60 · 10秒冷却
            </span>
          </div>
        </div>

        {/* 留言列表 */}
        <div ref={listRef} style={{
          maxHeight: 420, overflowY: 'auto', borderRadius: 16,
          background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          padding: '16px 20px',
        }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 8 }}>📝</p>
              <p>还没有人报到，来做第一个吧！</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const colors = ['#FFF5F5', '#FFF8F0', '#F0F7FF', '#F5FFF5', '#FFF0F7', '#F8F5FF'];
              const bg = colors[i % colors.length];
              return (
                <div key={msg.id} style={{
                  padding: '14px 16px', marginBottom: 8, borderRadius: 12,
                  background: bg,
                  animation: 'fadeInUp 0.35s ease',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D3436' }}>
                      🎓 {msg.major}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#A0AEC0' }}>
                      {fmtTime(msg.time)}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#636E72', lineHeight: 1.6 }}>{msg.text}</p>
                </div>
              );
            })
          )}
        </div>

        {/* 加微信入口 */}
        <div style={{
          textAlign: 'center', marginTop: 28, padding: '24px',
          background: 'linear-gradient(135deg, #F8F9FC, #FFF3E0)', borderRadius: 16,
        }}>
          <p style={{ fontSize: '0.95rem', color: '#636E72', marginBottom: 12 }}>
            💬 想找同专业同学？加学长微信拉你进新生群
          </p>
          <button
            onClick={copyPhone}
            style={{
              padding: '12px 28px', borderRadius: 50, border: 'none',
              background: 'linear-gradient(135deg, #FF6B35, #FF416C)',
              color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {copied ? '✅ 已复制' : '📱 加学长微信'}
          </button>
        </div>
      </div>
    </section>
  );
}

function fmtTime(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

const inputStyle = {
  padding: '10px 16px', borderRadius: 12, border: '1px solid #E2E8F0',
  fontSize: '0.93rem', fontFamily: 'inherit', outline: 'none',
  transition: 'border 0.2s', width: 180, maxWidth: '100%',
};
