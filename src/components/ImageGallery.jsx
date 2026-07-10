import { useState, useCallback, useEffect } from 'react';

/**
 * 可复用的图片画廊组件
 * @param {Array} images - [{src: string, caption: string}]
 * @param {number} columns - 列数，默认 2
 * @param {string} title - 画廊标题（可选）
 */
export default function ImageGallery({ images = [], columns = 2, title }) {
  const [lightbox, setLightbox] = useState(null); // 当前放大的图片索引

  const open = useCallback((idx) => setLightbox(idx), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setLightbox((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  // 键盘导航
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, close, prev, next]);

  if (!images.length) return null;

  return (
    <>
      {title && <h3 style={galleryTitle}>{title}</h3>}
      <div className={`gallery-grid-${columns}`} style={grid(columns)}>
        {images.map((img, i) => (
          <div
            key={i}
            className="gallery-card"
            style={card}
            onClick={() => open(i)}
          >
            <div style={imgWrapper}>
              <img
                src={img.src}
                alt={img.caption || ''}
                loading="lazy"
                className="gallery-img"
                style={imgStyle}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.style.cssText = 'display:flex;align-items:center;justify-content:center;height:200px;background:#F8F9FC;color:#A0AEC0;font-size:0.9rem;border-radius:12px;';
                  placeholder.textContent = '📷 图片加载失败';
                  e.target.parentNode.appendChild(placeholder);
                }}
              />
              <div className="zoom-hint" style={zoomHint}>🔍 点击放大</div>
            </div>
            {img.caption && <p style={captionStyle}>{img.caption}</p>}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={overlay} onClick={close} className="lightbox-overlay">
          <button style={closeBtn} onClick={close} className="lightbox-close">✕</button>
          <button style={arrow('left')} onClick={(e) => { e.stopPropagation(); prev(); }} className="lightbox-arrow lightbox-prev">‹</button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].caption || ''}
            style={lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          {images[lightbox].caption && (
            <p style={lightboxCaption}>{images[lightbox].caption}</p>
          )}
          <p style={counter}>{lightbox + 1} / {images.length}</p>
          <button style={arrow('right')} onClick={(e) => { e.stopPropagation(); next(); }} className="lightbox-arrow lightbox-next">›</button>
        </div>
      )}
    </>
  );
}

// ============ Styles ============

const grid = (cols) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${cols}, 1fr)`,
  gap: 16,
  marginBottom: 24,
  '@media (maxWidth: 640px)': {
    gridTemplateColumns: '1fr',
  },
});

const card = {
  background: '#fff',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const imgWrapper = {
  position: 'relative',
  overflow: 'hidden',
  aspectRatio: '16/10',
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.4s ease',
};

const zoomHint = {
  position: 'absolute',
  bottom: 8,
  right: 8,
  background: 'rgba(0,0,0,0.55)',
  color: '#fff',
  fontSize: '0.75rem',
  padding: '3px 10px',
  borderRadius: 50,
  pointerEvents: 'none',
};

const captionStyle = {
  padding: '12px 16px',
  fontSize: '0.88rem',
  color: '#636E72',
  textAlign: 'center',
};

const galleryTitle = {
  fontSize: '1.1rem',
  fontWeight: 700,
  color: '#2D3436',
  marginBottom: 16,
};

// Lightbox styles
const overlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.88)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const lightboxImg = {
  maxWidth: '90vw',
  maxHeight: '78vh',
  objectFit: 'contain',
  borderRadius: 8,
};

const lightboxCaption = {
  color: '#fff',
  fontSize: '1rem',
  marginTop: 16,
  opacity: 0.85,
};

const counter = {
  color: 'rgba(255,255,255,0.5)',
  fontSize: '0.85rem',
  marginTop: 8,
};

const closeBtn = {
  position: 'absolute',
  top: 20,
  right: 20,
  background: 'rgba(255,255,255,0.15)',
  border: 'none',
  color: '#fff',
  fontSize: '1.4rem',
  width: 44,
  height: 44,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
};

const arrow = (side) => ({
  position: 'absolute',
  [side]: 20,
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.15)',
  border: 'none',
  color: '#fff',
  fontSize: '2.4rem',
  width: 50,
  height: 50,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
  lineHeight: 1,
});
