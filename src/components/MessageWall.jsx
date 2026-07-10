import { useState, useEffect, useRef, useCallback } from 'react';
import { isConfigured, fetchMessages, addMessage, MAX_FETCH } from '../data/supabase';
import { notifyNewMessage } from '../data/notify';

const STORAGE_KEY = 'sygo_message_wall';
const COOLDOWN = 10000; // 10秒冷却
const CLOUD = isConfigured();

// —— 弹幕参数 ——
const LANES = 5;                 // 轨道数
const LANE_H = 40;               // 每条轨道高度(px)
const TOP_BASE = 12;
const AREA_H = TOP_BASE + LANES * LANE_H + 12; // 弹幕区总高
const SPAWN_MS = 2600;           // 每隔多久放出一条（越大越稀）
const MAX_ACTIVE = 14;           // 同屏最多弹幕数
const DANMAKU_COLORS = [
  { bg: '#FFE8E0', color: '#E8590C' },
  { bg: '#FFF3CD', color: '#B8860B' },
  { bg: '#E3F2FD', color: '#1565C0' },
  { bg: '#E8F5E9', color: '#2E7D32' },
  { bg: '#FCE4EC', color: '#C2185B' },
  { bg: '#EDE7F6', color: '#6A1B9A' },
];

// —— 基础敏感词过滤（可自行扩充）——
const BANNED = ['代刷', '代考', '包过', '贷款', '博彩', '赌博', '色情', '加qq', '刷单', 'ｗｗｗ', 'http'];
function clean(str) {
  let out = str;
  for (const w of BANNED) {
    if (!w) continue;
    const re = new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    out = out.replace(re, m => '*'.repeat(m.length));
  }
  return out;
}

// —— localStorage 回退（未配置 Supabase 时用）——
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
  const [showList, setShowList] = useState(false);
  const [flying, setFlying] = useState([]); // 当前飘动中的弹幕
  const [paused, setPaused] = useState(false); // 暂停飘动（悬停/按住）

  const messagesRef = useRef([]);
  const poolIdxRef = useRef(0);
  const keyRef = useRef(0);
  const laneRef = useRef(0);

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      setMessages(CLOUD ? await fetchMessages() : loadLocal());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // 放出一条飘动弹幕
  const spawn = useCallback((msg) => {
    if (!msg || !msg.text) return;
    const lane = laneRef.current % LANES;
    laneRef.current += 1;
    const n = keyRef.current++;
    const c = DANMAKU_COLORS[n % DANMAKU_COLORS.length];
    setFlying(prev => prev.length >= MAX_ACTIVE ? prev : [...prev, {
      key: `d${n}`,
      text: msg.text,
      top: TOP_BASE + lane * LANE_H,
      dur: 9 + (n % 6),          // 9~14 秒
      bg: c.bg,
      color: c.color,
    }]);
  }, []);

  // 定时循环放送池子里的留言
  useEffect(() => {
    if (loading || loadError) return;
    const timer = setInterval(() => {
      const pool = messagesRef.current;
      if (!pool.length) return;
      spawn(pool[poolIdxRef.current % pool.length]);
      poolIdxRef.current += 1;
    }, SPAWN_MS);
    return () => clearInterval(timer);
  }, [loading, loadError, spawn]);

  const removeFlying = (key) => setFlying(prev => prev.filter(f => f.key !== key));

  const startCooldown = () => {
    setCooldown(true);
    setTimeout(() => setCooldown(false), COOLDOWN);
  };

  const submit = async () => {
    const t = clean(text.trim());
    if (!t || cooldown || submitting) return;
    if (t.length > 60) return;

    if (CLOUD) {
      setSubmitting(true);
      try {
        const saved = await addMessage('', t);
        setMessages(prev => [saved, ...prev]);
        spawn(saved);            // 自己发的立刻飞一条
        notifyNewMessage(t);     // 微信通知站长（配了 token 才发）
        setText('');
        startCooldown();
      } catch {
        alert('发送失败，网络开小差了，稍后再试一下～');
      } finally {
        setSubmitting(false);
      }
    } else {
      const newMsg = { id: Date.now(), text: t, time: Date.now() };
      const updated = [newMsg, ...messages];
      setMessages(updated);
      saveLocal(updated);
      spawn(newMsg);
      setText('');
      startCooldown();
    }
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
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{
            display: 'inline-block', padding: '8px 24px', borderRadius: 50,
            background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,65,108,0.1))',
            color: '#FF6B35', fontWeight: 700, fontSize: '0.95rem',
          }}>
            💬 已有 {messages.length}{messages.length >= MAX_FETCH ? '+' : ''} 条留言
          </span>
        </div>

        {/* 弹幕区（鼠标移入 / 手指按住 暂停） */}
        <div
          className="danmaku-area"
          style={{ height: AREA_H, marginBottom: 20 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onTouchCancel={() => setPaused(false)}
        >
          {loading ? (
            <div style={centerBox}>⏳ 留言加载中…</div>
          ) : loadError ? (
            <div style={centerBox}>
              <span style={{ marginRight: 10 }}>😮‍💨 加载失败</span>
              <button onClick={load} style={retryBtn}>重试</button>
            </div>
          ) : messages.length === 0 ? (
            <div style={centerBox}>还没有人留言，来飘第一条吧！👇</div>
          ) : (
            flying.map(f => (
              <div
                key={f.key}
                className="danmaku-item"
                onAnimationEnd={() => removeFlying(f.key)}
                style={{ top: f.top, animationDuration: `${f.dur}s`, animationPlayState: paused ? 'paused' : 'running', background: f.bg, color: f.color }}
              >
                {f.text}
              </div>
            ))
          )}
        </div>

        {/* 输入区 */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '20px 24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 16,
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
                fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
            >
              {submitting ? '发送中…' : cooldown ? '⏳' : '💬 留言'}
            </button>
          </div>
          <span style={{ display: 'block', fontSize: '0.78rem', color: '#A0AEC0', marginTop: 10 }}>
            {text.length}/60 · 发出后会飞到弹幕里 · 10秒冷却
          </span>
        </div>

        {/* 查看全部留言 */}
        {!loading && !loadError && messages.length > 0 && (
          <div style={{ marginBottom: 8 }}>
            <button
              onClick={() => setShowList(v => !v)}
              style={{
                display: 'block', width: '100%', padding: '12px', borderRadius: 12,
                border: '1px solid #E2E8F0', background: '#fff', color: '#636E72',
                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {showList ? '收起留言列表 ▲' : `📋 查看全部留言（${messages.length}）▼`}
            </button>

            {showList && (
              <div style={{
                marginTop: 12, maxHeight: 420, overflowY: 'auto', borderRadius: 16,
                background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '16px 20px',
              }}>
                {messages.map((msg, i) => {
                  const colors = ['#FFF5F5', '#FFF8F0', '#F0F7FF', '#F5FFF5', '#FFF0F7', '#F8F5FF'];
                  return (
                    <div key={msg.id} style={{
                      padding: '14px 16px', marginBottom: 8, borderRadius: 12,
                      background: colors[i % colors.length],
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D3436' }}>🙋 同学</span>
                        <span style={{ fontSize: '0.72rem', color: '#A0AEC0' }}>{fmtTime(msg.time)}</span>
                      </div>
                      <p style={{ fontSize: '0.92rem', color: '#636E72', lineHeight: 1.6 }}>{msg.text}</p>
                      {msg.reply && (
                        <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,107,53,0.08)', borderLeft: '3px solid #FF6B35' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6B35' }}>🎓 学长回复</span>
                          <p style={{ fontSize: '0.9rem', color: '#636E72', lineHeight: 1.6, marginTop: 4 }}>{msg.reply}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 加微信入口 */}
        <div style={{
          textAlign: 'center', marginTop: 24, padding: '24px',
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
  const diff = Date.now() - d;
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

const centerBox = {
  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
  justifyContent: 'center', color: '#A0AEC0', fontSize: '0.95rem', padding: '0 16px',
  textAlign: 'center',
};

const retryBtn = {
  padding: '6px 16px', borderRadius: 50, border: '1px solid #FF6B35',
  background: '#fff', color: '#FF6B35', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
};
