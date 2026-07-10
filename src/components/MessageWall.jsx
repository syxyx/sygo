import { useState, useEffect, useRef, useCallback } from 'react';
import { isConfigured, fetchMessages, addMessage, MAX_FETCH } from '../data/supabase';

const STORAGE_KEY = 'sygo_message_wall';
const COOLDOWN = 10000; // 10秒冷却
const CLOUD = isConfigured();

// —— 基础敏感词过滤（可自行扩充）——
const BANNED = ['代刷', '代考', '包过', '贷款', '博彩', '赌博', '色情', '加qq', '刷单', 'ｗｗｗ', 'http'];
function clean(str) {
  let out = str;
  for (const w of BANNED) {
    if (!w) continue;
    out = out.split(w).join('*'.repeat(w.length));
    // 忽略大小写再过一遍
    const re = new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    out = out.replace(re, m => '*'.repeat(m.length));
  }
  return out;
}

// —— localStorage 回退（未配置 LeanCloud 时用）——
function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveLocal(msgs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(0, MAX_FETCH)));
  } catch { /* 存储满 */ }
}

export default function MessageWall() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [text, setText] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [copied, setCopied] = useState(false);
  const listRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      if (CLOUD) {
        setMessages(await fetchMessages());
      } else {
        setMessages(loadLocal());
      }
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async () => {
    const t = clean(text.trim());
    if (!t || cooldown || submitting) return;
    if (t.length > 60) return;

    if (CLOUD) {
      setSubmitting(true);
      try {
        const saved = await addMessage('', t);
        setMessages(prev => [saved, ...prev]);
        setText('');
        startCooldown();
      } catch {
        alert('发送失败，网络开小差了，稍后再试一下～');
      } finally {
        setSubmitting(false);
      }
    } else {
      const newMsg = { id: Date.now(), major: '', text: t, time: Date.now() };
      const updated = [newMsg, ...messages];
      setMessages(updated);
      saveLocal(updated);
      setText('');
      startCooldown();
    }
  };

  const startCooldown = () => {
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

  const busy = cooldown || submitting;
  const canSend = text.trim() && !busy;

  return (
    <section style={{ padding: '0 24px 80px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 className="section-title">💬 留言墙</h2>
        <p className="section-subtitle">有问题想问学长，或者对网站有什么建议，都可以在这儿留言~</p>

        {/* 留言总数 */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', padding: '8px 24px', borderRadius: 50,
            background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,65,108,0.1))',
            color: '#FF6B35', fontWeight: 700, fontSize: '0.95rem',
          }}>
            💬 已有 {messages.length}{messages.length >= MAX_FETCH ? '+' : ''} 条留言
          </span>
        </div>

        {/* 输入区 */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '24px 28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <textarea
              placeholder="有什么想问的、或对网站的建议，写在这儿~（学长会看）"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={60}
              rows={2}
              style={{ ...inputStyle, resize: 'none', flex: 1, minWidth: 200 }}
            />
            <button
              onClick={submit}
              disabled={!canSend}
              style={{
                padding: '12px 24px', borderRadius: 14, border: 'none',
                background: canSend ? 'linear-gradient(135deg, #FF6B35, #FF416C)' : '#E2E8F0',
                color: canSend ? '#fff' : '#A0AEC0',
                fontWeight: 700, fontSize: '0.95rem', cursor: canSend ? 'pointer' : 'default',
                fontFamily: 'inherit', whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {submitting ? '发送中…' : cooldown ? '⏳' : '💬 留言'}
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
              <p style={{ fontSize: '2rem', marginBottom: 8 }}>⏳</p>
              <p>正在加载报到墙…</p>
            </div>
          ) : loadError ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
              <p style={{ fontSize: '2rem', marginBottom: 8 }}>😮‍💨</p>
              <p style={{ marginBottom: 12 }}>加载失败，网络开小差了</p>
              <button onClick={load} style={{
                padding: '8px 20px', borderRadius: 50, border: '1px solid #FF6B35',
                background: '#fff', color: '#FF6B35', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit',
              }}>点我重试</button>
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 8 }}>📝</p>
              <p>还没有人留言，有问题或建议就来说第一句吧！</p>
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
                      🙋 同学
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
            💬 有急事想私聊问？加学长微信，看到就回
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
