import { useState } from 'react';
import { homeContent } from '../data/content';

// 全站吸底悬浮按钮：引导加微信进新生群
export default function JoinGroupFab() {
  const [copied, setCopied] = useState(false);
  const phone = homeContent.contactPhone;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
    } catch {
      const el = document.createElement('textarea');
      el.value = phone;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* 忽略 */ }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button className="join-group-fab" onClick={copy} aria-label="加入新生群">
      {copied ? '✅ 已复制，去加我' : '👥 进新生群'}
    </button>
  );
}
