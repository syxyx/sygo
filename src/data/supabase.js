// ============================================================
// Supabase 配置（新生报到墙用）
// ------------------------------------------------------------
// 只需要填两个值：项目 URL 和 anon key。anon key 本身就是设计成
// 前端公开的，安全靠数据库的 RLS 行级安全策略控制（见下方建表 SQL）。
//
// 怎么拿这两个值（https://supabase.com）：
//   1. 用 GitHub 或邮箱注册（免费、不用绑卡）
//   2. New project → 建一个项目（Region 选 Singapore/Tokyo 离国内近）
//   3. 左侧 Settings → API：
//        · Project URL      → 填 SUPABASE_URL，形如 https://xxxx.supabase.co
//        · Project API keys 里的 anon public → 填 SUPABASE_ANON_KEY
//
// 建表：进 SQL Editor，把交付说明里给的那段 SQL 粘进去 Run 一下即可
// （会建好 messages 表 + 只读不可篡改的安全策略）。
// ============================================================
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rskakhaiavxplqpqixqn.supabase.co';        // ← Project URL
const SUPABASE_ANON_KEY = 'sb_publishable_huZBijpf4nBr3qY7P_I-Mw_E-EVI9Kd';   // ← 可公开密钥（publishable key）

const TABLE = 'messages';
export const MAX_FETCH = 100;

let client = null;

export function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function getClient() {
  if (!isConfigured()) throw new Error('Supabase 未配置');
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}

// Supabase 行 → 组件用的普通结构
function normalize(row) {
  return {
    id: row.id,
    major: row.major || '',
    text: row.text || '',
    reply: row.reply || '',
    time: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}

// 拉取最新留言（按时间倒序）
export async function fetchMessages() {
  if (!isConfigured()) return [];
  const { data, error } = await getClient()
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(MAX_FETCH);
  if (error) throw error;
  return (data || []).map(normalize);
}

// 新增一条留言，返回规范化后的对象
export async function addMessage(major, text) {
  if (!isConfigured()) throw new Error('Supabase 未配置');
  const { data, error } = await getClient()
    .from(TABLE)
    .insert({ major, text })
    .select('*')
    .single();
  if (error) throw error;
  return normalize(data);
}
