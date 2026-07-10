import { useState, useMemo } from 'react';
import { majorsContent } from '../data/content';
import dormMapping from '../data/dormMapping';

// 构建所有专业的扁平列表，合并学院和宿舍信息
const allMajors = majorsContent.colleges.flatMap(col =>
  col.majors.map(m => ({
    major: m,
    college: col.name,
    icon: col.icon,
    realTalk: col.realTalk,
    job: col.job,
    dorm: dormMapping[m] || null,
  }))
);

const CAMPUSES = ['全部校区', '七里坪', '李子园', '梅子井'];
const DORMS = ['全部宿舍', '乐山公寓', '采芹公寓', '泮水公寓', '李子园宿舍', '梅子井'];

export default function Finder() {
  const [query, setQuery] = useState('');
  const [campus, setCampus] = useState('全部校区');
  const [dorm, setDorm] = useState('全部宿舍');

  const results = useMemo(() => {
    let list = allMajors;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(item =>
        item.major.toLowerCase().includes(q) ||
        item.college.toLowerCase().includes(q) ||
        item.realTalk.toLowerCase().includes(q)
      );
    }
    if (campus !== '全部校区') {
      list = list.filter(item => item.dorm?.campus === campus);
    }
    if (dorm !== '全部宿舍') {
      list = list.filter(item => item.dorm?.dorm?.includes(dorm.replace('公寓', '').replace('宿舍', '')));
    }
    return list;
  }, [query, campus, dorm]);

  return (
    <>
      <div className="page-header">
        <h1>🔍 专业查询器</h1>
        <p>输入专业名，看看在哪上课、住哪栋宿舍</p>
      </div>

      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* 搜索 + 筛选 */}
          <div style={{
            background: '#fff', borderRadius: 20, padding: '28px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 28,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 20px', borderRadius: 14,
              background: '#F8F9FC', border: '2px solid #E2E8F0',
              transition: 'border 0.2s',
              marginBottom: 16,
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔍</span>
              <input
                type="text"
                placeholder="输入专业名称，比如：计算机、会计、临床…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  flex: 1, border: 'none', background: 'none', outline: 'none',
                  fontSize: '1rem', fontFamily: 'inherit',
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{
                  background: '#E2E8F0', border: 'none', borderRadius: '50%',
                  width: 24, height: 24, cursor: 'pointer', fontSize: '0.8rem',
                }}>✕</button>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CAMPUSES.map(c => (
                <button key={c} onClick={() => setCampus(c)} style={chipStyle(campus === c)}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {DORMS.map(d => (
                <button key={d} onClick={() => setDorm(d)} style={chipStyle(dorm === d)}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* 结果 */}
          <p style={{ color: '#A0AEC0', fontSize: '0.9rem', marginBottom: 16 }}>
            {query || campus !== '全部校区' || dorm !== '全部宿舍'
              ? `找到 ${results.length} 个专业`
              : `共 ${allMajors.length} 个专业，输入关键词筛选`
            }
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {results.map((item, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 16, padding: '24px 28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F0F0F0',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>
                      {item.icon} {item.major}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#A0AEC0', marginBottom: 8 }}>
                      🏫 {item.college}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span style={tagStyle('#EBF8FF', '#2B6CB0')}>
                      📍 {item.dorm?.campus || '?'}
                    </span>
                    <span style={tagStyle('#FFF5F5', '#E53E3E')}>
                      🏠 {item.dorm?.dorm || '待确认'}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#636E72', lineHeight: 1.8, marginTop: 8 }}>
                  💬 {item.realTalk}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#A0AEC0', marginTop: 6 }}>
                  💼 {item.job}
                </p>
              </div>
            ))}
            {results.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#A0AEC0' }}>
                <p style={{ fontSize: '3rem', marginBottom: 12 }}>😕</p>
                <p style={{ fontSize: '1rem' }}>没找到匹配的专业，换个关键词试试</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const chipStyle = (active) => ({
  padding: '6px 16px', borderRadius: 50, border: active ? '2px solid #FF6B35' : '1px solid #E2E8F0',
  background: active ? 'rgba(255,107,53,0.08)' : '#fff', color: active ? '#FF6B35' : '#636E72',
  fontSize: '0.82rem', fontWeight: active ? 600 : 400, cursor: 'pointer',
  fontFamily: 'inherit', transition: 'all 0.2s',
});

const tagStyle = (bg, color) => ({
  padding: '4px 12px', borderRadius: 50, background: bg, color,
  fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap',
});
