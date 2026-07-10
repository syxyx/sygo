import { Link } from 'react-router-dom';
import { siteInfo, aboutContent } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="var(--bg)"/>
        </svg>
      </div>
      <div className="footer-content">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>🎓 {siteInfo.name}</h3>
            <p>一个邵院学长做的网站，希望能帮到你</p>
            <p className="footer-address">📍 {siteInfo.location}</p>
            <p>📱 微信：{aboutContent.contact.phone}</p>
          </div>
          <div className="footer-links">
            <h4>快速导航</h4>
            <Link to="/prepare">入学准备</Link>
            <Link to="/life">校园生活</Link>
            <Link to="/pitfalls">避坑指南</Link>
            <Link to="/majors">专业解读</Link>
            <Link to="/qa">百问百答</Link>
          </div>
          <div className="footer-links">
            <h4>友情链接</h4>
            <a href="https://www.hnsyu.edu.cn" target="_blank" rel="noopener noreferrer">学校官网</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {siteInfo.name} | 有问题加学长微信 📱 {aboutContent.contact.phone}</p>
          <p style={{ fontSize: '0.8rem', color: '#A0AEC0', marginTop: 6 }}>本站为非官方网站，内容仅供参考，以学校官方通知为准</p>
        </div>
      </div>
    </footer>
  );
}
