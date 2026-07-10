// ============================================================
// 新留言微信通知（Server酱 / 方糖）
// ------------------------------------------------------------
// 有人在留言墙留言时，自动推一条到你微信（经"方糖"公众号）。
//
// 拿 SENDKEY：https://sct.ftqq.com
//   1. 用 GitHub 或微信扫码登录
//   2. 复制页面上的 SENDKEY（形如 SCTxxxxxxxx...）
//   3. 关注它提示的「方糖」公众号，通知就发到这个号里
//
// 注意：SENDKEY 会随前端代码公开，理论上有人扒出来能给你发骚扰通知（概率极低）。
//       真被骚扰，去 Server酱 后台重置 SENDKEY，改完让我换上新的。
// ============================================================
const SERVERCHAN_KEY = 'SCT377568Te5ojbcqv4ijdHysFhru6zgJK'; // ← 粘贴 SENDKEY
const SEND_BASE = 'https://sctapi.ftqq.com';     // Turbo 版地址；若是 Server酱³ 版会不同，拿到 key 再定

export function notifyNewMessage(text) {
  if (!SERVERCHAN_KEY) return;
  try {
    const url = `${SEND_BASE}/${SERVERCHAN_KEY}.send`
      + `?title=${encodeURIComponent('📮 留言墙有新留言')}`
      + `&desp=${encodeURIComponent(text)}`;
    // 火速发出、不等结果、不阻塞用户（no-cors 简单请求）
    fetch(url, { mode: 'no-cors' }).catch(() => {});
  } catch { /* 忽略通知失败，不影响留言 */ }
}
