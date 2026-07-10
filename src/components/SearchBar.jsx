import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import searchIndex from '../data/searchIndex';
import { aboutContent } from '../data/content';
import './SearchBar.css';

export default function SearchBar({ variant = 'nav' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const phone = aboutContent.contact.phone;

  const copyPhone = useCallback(() => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      const el = document.createElement('textarea');
      el.value = phone;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* 忽略 */ }
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [phone]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase().trim();

    // 先尝试精确匹配（包括子串匹配）
    let filtered = searchIndex.filter(item => {
      const text = `${item.title} ${item.keywords} ${item.snippet}`.toLowerCase();
      return text.includes(q);
    });

    // 如果精确匹配没结果，用中文分词：去掉停用词后 any 匹配
    if (filtered.length === 0) {
      const stopWords = /[的吗呢啊吧有是么怎么什么哪了个这那在就也都还和与或可以能会要应该去不]/g;
      const tokens = q.replace(stopWords, ' ').split(/\s+/).filter(t => t.length > 0);
      if (tokens.length > 0) {
        filtered = searchIndex.filter(item => {
          const text = `${item.title} ${item.keywords} ${item.snippet}`.toLowerCase();
          return tokens.some(token => text.includes(token));
        });
      } else {
        // 全是停用词时退化为单字符搜索
        filtered = searchIndex.filter(item => {
          const text = `${item.title} ${item.keywords} ${item.snippet}`.toLowerCase();
          return [...q].some(ch => text.includes(ch));
        });
      }
    }

    filtered = filtered.slice(0, 8);
    setResults(filtered);
    setOpen(true); // 有查询就展开：有结果显示结果，无结果显示引导
    setSelected(-1);
  }, [query]);

  // 点击外部关闭
  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Esc 关闭
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && selected >= 0) {
      goTo(results[selected]);
    }
  };

  const goTo = (item) => {
    setOpen(false);
    setQuery('');
    // 统一走路由 state：跨页由 ScrollToTop 处理，同页因 state 变化也会重新触发
    // 各页面的滚动与「折叠项自动展开」都监听 location.state
    if (item.path === location.pathname && !item.anchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(item.path, { state: item.anchor ? { anchor: item.anchor } : undefined });
    }
  };

  const isHero = variant === 'hero';

  return (
    <div className="search-bar-container" ref={containerRef} style={isHero ? { maxWidth: 480, margin: '0 auto' } : {}}>
      <div className={`search-bar ${open ? 'open' : ''}`}
        style={isHero ? {
          width: '100%', padding: '4px 4px 4px 20px', background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '2px solid #E2E8F0',
        } : {}}
      >
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={isHero ? '搜一下你的问题，比如：宿舍有空调吗？' : '搜索...'}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          onKeyDown={handleKeyDown}
          style={isHero ? { padding: '14px 10px', fontSize: '0.95rem' } : {}}
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
            ✕
          </button>
        )}
      </div>
      {open && (
        <div className="search-results" style={isHero ? {
          position: 'absolute', top: '100%', left: 0, right: 0, transform: 'none',
          marginTop: 8, width: '100%', maxWidth: 'none',
        } : {}}>
          {results.length > 0 ? (
            results.map((item, i) => (
              <div
                key={i}
                className={`search-result-item ${i === selected ? 'selected' : ''}`}
                onClick={() => goTo(item)}
                onMouseEnter={() => setSelected(i)}
              >
                <div className="result-title">{item.title}</div>
                <div className="result-snippet">{item.snippet}</div>
              </div>
            ))
          ) : (
            <div className="search-no-result">
              没找到「{query}」相关内容 😅
              <div
                className="search-no-result-cta"
                onClick={copyPhone}
              >
                {copied ? '✅ 已复制微信号' : '💬 加学长微信直接问 →'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
