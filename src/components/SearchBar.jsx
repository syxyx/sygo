import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIndex from '../data/searchIndex';
import './SearchBar.css';

export default function SearchBar({ variant = 'nav' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = searchIndex
      .filter(item => {
        const text = `${item.title} ${item.keywords} ${item.snippet}`.toLowerCase();
        return q.split(/\s+/).every(word => text.includes(word));
      })
      .slice(0, 8);
    setResults(filtered);
    setOpen(filtered.length > 0);
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
    navigate(item.path);
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
          {results.map((item, i) => (
            <div
              key={i}
              className={`search-result-item ${i === selected ? 'selected' : ''}`}
              onClick={() => goTo(item)}
              onMouseEnter={() => setSelected(i)}
            >
              <div className="result-title">{item.title}</div>
              <div className="result-snippet">{item.snippet}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
