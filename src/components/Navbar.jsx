import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navbar.css';

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/prepare', label: '入学准备' },
  { path: '/life', label: '校园生活' },
  { path: 'https://fcdh.hnsyu.edu.cn/campus-map-web/index?login=cas&loginSys=index', label: '🗺️ 校园地图', external: true },
  { path: '/pitfalls', label: '避坑指南' },
  { path: '/majors', label: '专业解读' },
  { path: '/qa', label: '百问百答' },
  { path: '/about', label: '关于' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // 抽屉打开时锁定背景滚动
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">邵阳学院</span>
        </Link>
        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <span /><span /><span />
        </button>
        <div
          className={`nav-backdrop ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(false)}
        />
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              {link.external ? (
                <a href={link.path} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <SearchBar />
      </div>
    </nav>
  );
}
