// 搜索索引 - 从新内容构建
import { homeContent, prepareContent, lifeContent, pitfallsContent, majorsContent, qaContent, aboutContent, siteInfo } from './content';

const index = [];

function add(title, snippet, path, keywords) {
  index.push({ title, snippet, path, keywords: keywords.toLowerCase() });
}

// 首页热门问题
homeContent.hotQuestions.forEach(h => add(h.q, `点击查看详情`, h.to, h.q));

// 入学准备
add('开学必带清单', '身份证、录取通知书、照片、档案、银行卡', '/prepare', '带什么 开学 清单 必备 证件');
add('什么东西不用带', '被子、脸盆、洗发水等学校能买到', '/prepare', '不用带 别带 多余');
add('邵阳天气穿什么', '夏天热冬天湿冷，短袖为主，冬天要电热毯', '/prepare', '天气 穿衣 衣服 冷 热');
add('军训怎么过', '涂防晒、买鞋垫、多喝水、别逞强', '/prepare', '军训 防晒 累 鞋垫');
add('怎么到学校', '邵阳站打车15分钟，报到当天有接新大巴', '/prepare', '交通 怎么去 高铁 火车 到校');
add('报到流程', '找迎新帐篷→交材料→领钥匙→去宿舍', '/prepare', '报到 流程 当天 怎么报');

prepareContent.checklist.must.forEach(m => add(m.item, m.note, '/prepare', m.item));
prepareContent.military.tips.forEach(t => add(t.title, t.desc, '/prepare', t.title));

// 校园生活
add('宿舍条件怎么样', '四人间1200/年，都有空调热水', '/life', '宿舍 住宿 寝室 空调');
add('食堂好吃吗', '6个食堂，留香食堂最好，月均1000', '/life', '食堂 吃饭 伙食 好吃');
add('一个月生活费多少', '1500-2000正常，省点1000也行', '/life', '生活费 多少钱 花销 省钱');
add('能做什么兼职', '勤工俭学、家教、奖学金，别碰交钱的', '/life', '兼职 赚钱 打工 工作');
add('社团怎么选', '选1-2个感兴趣的，别报太多', '/life', '社团 活动 兴趣');

lifeContent.dorm.types.forEach(d => add(d.type, `${d.price}，${d.desc}`, '/life', d.type));
lifeContent.canteen.reviews.forEach(r => add(r.name, r.comment, '/life', r.name));
lifeContent.money.items.forEach(m => add(m.item, `${m.range}元`, '/life', m.item));

// 避坑指南
pitfallsContent.categories.forEach(cat => {
  cat.items.forEach(item => {
    add(item.q, item.a.substring(0, 60), '/pitfalls', `${cat.title} ${item.q} ${item.a}`);
  });
});
add('常见骗局汇总', '推销、冒充学长、兼职押金、校园贷', '/pitfalls', '骗局 骗人 防骗 骗子 上当');
add('智商税产品', '床上桌、过多收纳盒、健身卡', '/pitfalls', '智商税 别买 浪费钱');

// 专业解读
majorsContent.colleges.forEach(col => {
  add(col.name, col.realTalk.substring(0, 80), '/majors', `${col.name} ${col.majors.join(' ')} 专业`);
  col.majors.forEach(m => add(m, `属于${col.name}类`, '/majors', m));
});
add('转专业', '大一学期末可以申请，成绩不能太差', '/majors', '转专业 换专业 申请');

// 百问百答
qaContent.questions.forEach(q => add(q.q, q.a.substring(0, 80), '/qa', q.q));
add('有问题怎么问', '在百问百答页面留言，学长会回复', '/qa', '提问 留言 问题 怎么问');

// 关于
add('关于本站', '邵院学长做的网站，希望能帮到你', '/about', '关于 谁做的 站长');
add('联系学长', aboutContent.contact.phone, '/about', '电话 联系 微信 手机');
add('快递地址', '湖南省邵阳市大祥区学院路邵阳学院', '/life', '快递 地址 收货 邮寄');

// 校园卡
add('校园卡怎么选', '移动联通电信三大运营商套餐对比分析，帮你选最划算的', '/life', '校园卡 电话卡 手机卡 办卡 套餐 移动 联通 电信 宽带');
add('办电话卡注意事项', '别信上门推销，去营业厅办，看清楚合约期', '/life', '办卡 注意 推销 合约 避坑 运营商');
add('哪个运营商信号好', '移动信号最好，联通性价比高，电信宽带稳', '/life', '信号 移动 联通 电信 哪个好 运营商');

// 驾校
add('大学要不要考驾照', '建议大一大二搞定，邵阳考驾照比大城市便宜', '/life', '驾校 驾照 考驾照 开车 驾驶 学车');
add('邵阳驾校怎么选', '选正规驾校，问清楚总费用，别信包过', '/life', '驾校 邵阳 靠谱 推荐 报名 教练');
add('驾校常见套路', '低价套路、包过骗局、隐形收费、教练吃拿卡要', '/pitfalls', '驾校 套路 骗局 低价 包过 避坑');

// 学校基本信息
add(siteInfo.shortName, `${siteInfo.location}，${siteInfo.founded}年建校`, '/about', '邵阳学院 学校 大学 在哪');

export default index;
