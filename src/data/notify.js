// ============================================================
// 新留言微信通知（PushPlus 推送加）
// ------------------------------------------------------------
// 有人在留言墙留言时，自动推一条到你微信。
//
// 拿 token：https://www.pushplus.plus
//   1. 微信扫码登录（会自动关注 pushplus 公众号，通知就发到这个号里）
//   2. 首页「一对一推送」中复制你的 token
//
// 注意：token 会随前端代码公开。理论上有人扒出来能给你发骚扰通知（概率极低）。
//       真被骚扰，去 pushplus 后台点「重置 token」即可，改完让我换上新的。
// ============================================================
const PUSHPLUS_TOKEN = ''; // ← 粘贴 pushplus token

export function notifyNewMessage(text) {
  if (!PUSHPLUS_TOKEN) return;
  try {
    const url = 'https://www.pushplus.plus/send'
      + `?token=${PUSHPLUS_TOKEN}`
      + `&title=${encodeURIComponent('📮 留言墙有新留言')}`
      + `&content=${encodeURIComponent(text)}`
      + '&template=txt';
    // 火速发出、不等结果、不阻塞用户（no-cors 简单请求）
    fetch(url, { mode: 'no-cors' }).catch(() => {});
  } catch { /* 忽略通知失败，不影响留言 */ }
}
