// 搜索引擎索引 — 从 content.js 数据构建，覆盖所有可搜索内容
// 第 5 个参数 anchor：页内锚点 id，点击结果后滚动到对应位置（无则跳页面顶部）
import { homeContent, prepareContent, lifeContent, pitfallsContent, majorsContent, qaContent, aboutContent, siteInfo } from './content';

const index = [];

function add(title, snippet, path, keywords, anchor) {
  index.push({ title, snippet, path, keywords: (keywords || title).toLowerCase(), anchor });
}

// ========== 首页热门问题 ==========
homeContent.hotQuestions.forEach(h => add(h.q, `点击查看详情`, h.to, h.q));

// ========== 入学准备 ==========
add('开学必带清单', '录取通知书、身份证、档案、寸照、衣物、鞋垫、防晒霜、床上三件套', '/prepare', '带什么 开学 清单 必备 证件 行李箱 行李 必带 准备', 'prepare-checklist');
add('录取通知书', '最重要！忘带白跑一趟', '/prepare', '录取通知书 报到 入学', 'prepare-checklist');
add('身份证', '走到哪都要用，一定带上', '/prepare', '身份证 证件', 'prepare-checklist');
add('个人档案', '千万别自己拆开！拆了学校不收', '/prepare', '档案 学籍 文件袋', 'prepare-checklist');
add('寸照', '推荐白蓝红底各打印几张', '/prepare', '照片 证件照 一寸 二寸 白底 蓝底 红底', 'prepare-checklist');
add('鞋垫', '军训鞋底很硬，一定要买软鞋垫', '/prepare', '鞋垫 军训鞋', 'prepare-checklist');
add('防晒霜', '必带！别觉得男生就不涂，晒伤真的疼', '/prepare', '防晒 防晒霜 晒黑 晒伤 军训防晒', 'prepare-checklist');
add('床上三件套', '推荐自己买，学校统一的质量一般', '/prepare', '床单 被套 枕头 被子 床上用品', 'prepare-checklist');
add('什么东西不用带', '洗衣液、洗发水、衣架、脸盆、卫生纸学校超市都有', '/prepare', '不用带 别带 去了再买 学校能买到', 'prepare-dontbring');
add('被子枕头要不要带', '学校有卖但质量一般，建议自己带或网购寄到学校', '/prepare', '被子 枕头 床上用品', 'prepare-checklist');
add('军训怎么过', '涂防晒、买鞋垫、多喝水、别逞强，2周很快的', '/prepare', '军训 防晒 累 鞋垫 中暑 教官 偷懒 时间多久', 'prepare-military');
add('军训时间多久', '一般是2周，9月中旬开始', '/prepare', '军训 时间 多久 几周 几天', 'prepare-military');
add('怎么到学校', '高铁到邵阳站，打车15分钟到校，报到当天有免费接新大巴', '/prepare', '交通 怎么去 高铁 火车 到校 路线 怎么走', 'prepare-transport');
add('邵阳站在哪', '邵阳火车站，离七里坪校区打车15分钟', '/prepare', '邵阳站 火车站 高铁站', 'prepare-transport');
add('邵阳北站不要去', '邵阳北站在新邵县，离学校非常远，一定不要买到邵阳北', '/prepare', '邵阳北站 邵阳北 高铁 别买', 'prepare-transport');
add('报到流程', '找学院帐篷→交材料→领钥匙校园卡→去宿舍收拾', '/prepare', '报到 流程 当天 怎么报到 入学 第一天', 'prepare-process');
add('有没有接新大巴', '报到当天学校在邵阳站有免费接新大巴', '/prepare', '接新 大巴 接站 免费', 'prepare-transport');
add('自驾怎么到学校', '导航搜邵阳学院七里坪校区，门口有志愿者引导', '/prepare', '自驾 开车 导航 停车', 'prepare-transport');

prepareContent.checklist.must.forEach(m => add(m.item, m.note, '/prepare', m.item, 'prepare-checklist'));
prepareContent.military.tips.forEach(t => add(t.title, t.desc, '/prepare', t.title, 'prepare-military'));

// ========== 校园生活 ==========
// 宿舍
add('宿舍条件怎么样', '乐山/采芹/杏林/泮水四大公寓，都有空调热水独立卫浴', '/life', '宿舍 住宿 寝室 条件 环境', 'life-dorm');
add('宿舍有空调吗', '所有宿舍都有空调，电费自己寝室充值', '/life', '空调 制冷 热 夏天', 'life-dorm');
add('宿舍有热水吗', '有直饮水机和热水淋浴，晚上23点停热水', '/life', '热水 洗澡 淋浴 洗澡水', 'life-dorm');
add('宿舍有洗衣机吗', '大部分宿舍配独立洗衣机，扫码就能用', '/life', '洗衣机 洗衣 洗衣服', 'life-dorm');
add('晚上断电断网吗', '不断电不断网', '/life', '断电 断网 熄灯 晚上', 'life-dorm');
add('宿舍限电多少', '限电500W，不能用大功率电器', '/life', '限电 功率 大功率 吹风机 电器 跳闸', 'life-dorm');
add('宿舍门禁几点', '晚上23:00到早上6:00门禁', '/life', '门禁 关门 几点 晚归 查寝', 'life-dorm');
add('宿舍能养宠物吗', '理论上不能，建议别养，毕业带不走也麻烦', '/life', '宠物 猫 狗 养动物', 'life-dorm');

lifeContent.dorm.apartments.forEach(apt => add(apt.name, apt.desc, '/life', apt.name + ' ' + apt.location + ' ' + apt.rooms, 'life-dorm'));
lifeContent.dorm.apartments.forEach(apt => apt.majors.male.concat(apt.majors.female).forEach(m => add(m, `住在${apt.name}，${apt.rooms}`, '/life', m + ' ' + apt.name + ' 宿舍 住在哪 住宿', 'life-dorm')));
lifeContent.dorm.tips.forEach(t => add('宿舍小贴士', t, '/life', 'tips 贴士 建议', 'life-dorm'));

// 食堂
add('食堂好吃吗', '5个食堂，留香食堂评价最高，月均伙食费1000左右', '/life', '食堂 吃饭 伙食 好吃 饭堂', 'life-canteen');
add('食堂价格贵吗', '食堂很平价，正常一个月伙食费800-1200', '/life', '食堂价格 贵不贵 便宜 物价', 'life-canteen');
add('后街前街好吃的', '食堂吃腻了可以逛后街和前街，好吃的很多', '/life', '后街 前街 逛街 小吃 外卖', 'life-canteen');
add('哪个食堂最好吃', '留香食堂综合评价最高，有民族窗口选择多', '/life', '最好吃 推荐 哪个食堂', 'life-canteen');

lifeContent.canteen.reviews.forEach(r => add(r.name, r.comment, '/life', r.name, 'life-canteen'));
lifeContent.canteen.tips && add('食堂小贴士', lifeContent.canteen.tips, '/life', '外卖 后街 前街', 'life-canteen');

// 生活费
add('一个月生活费多少', '正常1500-2000，省点1000也能过', '/life', '生活费 多少钱 花销 省钱 月消费 花多少', 'life-money');
lifeContent.money.items.forEach(m => add(m.item, `${m.range}元`, '/life', m.item, 'life-money'));

// 兼职
add('能做什么兼职', '勤工俭学、家教、奖学金，任何要你先交钱的都是骗子', '/life', '兼职 赚钱 打工 工作 家教 奖学金', 'life-parttime');
add('奖学金多少钱', '国家奖学金8000，国家励志5000，学校还有校级奖学金', '/life', '奖学金 国家奖学金 励志 多少钱 金额 拿奖学金', 'life-parttime');
add('勤工俭学', '在图书馆、办公室帮忙，安全靠谱但钱不多', '/life', '勤工俭学 勤工助学 校内打工', 'life-parttime');
add('家教怎么找', '留意学校兼职群，邵阳本地需求不少，一小时50-80', '/life', '家教 补课 兼职 赚钱', 'life-parttime');
lifeContent.parttime.warning && add('兼职防骗', lifeContent.parttime.warning, '/life', '骗 别信 交钱 刷单', 'life-parttime');

// 社团
add('社团怎么选', '建议选1-2个真正感兴趣的，别报太多浪费钱也没时间去', '/life', '社团 学生会 活动 兴趣 百团大战 招新', 'life-clubs');
add('学生会值得加吗', '能锻炼能力但占时间，看你自己的规划', '/life', '学生会 团委 干事 部长', 'life-clubs');

// 外卖
add('外卖能送到哪', '大部分外卖能直接送到宿舍楼下', '/life', '外卖 点外卖 外卖地址 饿了么 美团', 'life-canteen');

// 快递
add('快递地址怎么写', '湖南省邵阳市大祥区邵阳学院七里坪校区XX公寓', '/life', '快递 地址 收货 邮寄 淘宝 京东', 'life-dorm');
add('快递在哪取', '每个公寓附近都有快递驿站，韵达乐山男寝在校外取', '/life', '快递 取快递 驿站 驿站位置 拿快递', 'life-dorm');

// 超市
add('学校超市怎么样', '物资齐全，生活用品基本都有，每片公寓都有自己的超市', '/life', '超市 买东西 购物 便利店', 'life-dorm');

// 共享单车
add('学校有共享单车吗', '最近新加了一批美团共享单车，数量挺多但坡多不好骑', '/life', '共享单车 自行车 美团 出行', 'life-dorm');

// ========== 避坑指南 ==========
// 锚点用 pitfall-分类序-条目序，页面据此自动展开对应项
pitfallsContent.categories.forEach((cat, ci) => {
  cat.items.forEach((item, ii) => {
    add(item.q, item.a.substring(0, 60), '/pitfalls', `${cat.title} ${item.q} ${item.a}`, `pitfall-${ci}-${ii}`);
  });
});

add('上门推销怎么办', '到校第一天有人推销电话卡、宽带，别急着买，先了解清楚套餐，推销的卡常涨价还网速慢', '/pitfalls', '推销 电话卡 上门 宽带 骗子 网速', 'pitfall-0-0');
add('校园贷千万别碰', '远离一切校园贷、分期付款，利息滚起来吓死人', '/pitfalls', '校园贷 贷款 分期 借钱 花呗 借呗', 'pitfall-0-5');
add('扫码送礼品是坑吗', '扫码送小礼品本质是骗你注册APP、办卡、泄露个人信息，别贪小便宜', '/pitfalls', '扫码 送礼品 送风扇 个人信息 地推', 'pitfall-0-6');
add('助学金诈骗电话', '让你去ATM激活或转账的助学金电话都是骗子，真助学金直接打到银行卡', '/pitfalls', '助学金 诈骗 电话 转账 激活 骗子', 'pitfall-0-8');
add('四六级要早考', '大一背单词最有感觉，趁早把四六级拿下，有些老师说大一不让考但你自己报名去考没人拦', '/pitfalls', '四六级 英语 四级 六级 考证 大一 报名', 'pitfall-1-0');
add('考研从大几开始准备', '大一大二打好绩点和英语基础，大三上学期开始系统备考最合适', '/pitfalls', '考研 读研 备考 大几 什么时候 准备 研究生', 'pitfall-1-1');
add('外卖踩雷', '藏在犄角旮旯的外卖店卫生差容易吃坏肚子，点评价高销量大的店', '/pitfalls', '外卖 不干净 卫生 吃坏肚子 拉肚子', 'pitfall-2-0');
add('军训防晒', '别觉得男生不用防晒，军训晒好几天会晒伤脱皮，买防水防晒霜勤补', '/pitfalls', '军训 防晒 晒伤 脱皮 男生', 'pitfall-3-0');
add('军训鞋磨脚', '军训鞋底硬码数不一定合适，提前备软鞋垫和创可贴', '/pitfalls', '军训 鞋 磨脚 起泡 鞋垫', 'pitfall-3-1');
add('军训会中暑吗', '每年都有人硬扛中暑晕倒，多喝水不舒服就打报告休息别逞强', '/pitfalls', '军训 中暑 晕倒 喝水 休息', 'pitfall-3-2');
add('社团要报几个', '游园会别一口气报七八个，活动一个没去，挑1-2个真感兴趣的', '/pitfalls', '社团 报社团 游园会 招新 几个', 'pitfall-4-0');
add('学生会值得进吗', '有些组织摆架子使唤新人干杂活，锻炼是真但别被当免费劳动力', '/pitfalls', '学生会 部门 组织 PUA 干杂活 新人', 'pitfall-4-1');
add('刷单是骗局吗', '刷单返现日入几百全是骗局，先给小甜头等你投大钱就跑路，刷单本身违法', '/pitfalls', '刷单 返现 兼职诈骗 网络兼职 日入', 'pitfall-5-0');
add('兼职要交押金', '正规兼职绝不让你先交钱，押金服装费培训费保证金都是坑', '/pitfalls', '兼职 押金 培训费 保证金 服装费 交钱', 'pitfall-5-1');
add('怎么找靠谱兼职', '别通过不靠谱中介，走学校勤工助学或熟人介绍更稳妥，别耽误上课', '/pitfalls', '兼职 家教 勤工助学 中介 靠谱 赚钱', 'pitfall-5-2');

// ========== 专业解读 ==========
majorsContent.colleges.forEach((col, i) => {
  add(col.name, col.realTalk.substring(0, 80), '/majors', `${col.name} ${col.majors.join(' ')} 就业`, `major-${i}`);
  col.majors.forEach(m => add(m, `邵阳学院${col.name}专业`, '/majors', m, `major-${i}`));
});

add('转专业怎么转', '大一学期末可以申请，成绩不能太差，热门专业名额有限', '/majors', '转专业 换专业 申请 条件', 'major-transfer');
add('转专业难不难', '只要成绩不差、有名额就不难，大一上学期先好好学', '/majors', '转专业 难度 容易 能转吗', 'major-transfer');
add('哪个专业好就业', '计算机和医学就业比较好，具体看各专业介绍页', '/majors', '就业 好就业 找工作 工资 前景', 'major-0');
add('计算机专业怎么样', '计算机和电子信息都是国家级一流专业建设点，但想好就业得自己多练', '/majors', '计算机 软件 编程 IT 程序员 电子信息', 'major-0');
add('临床医学怎么样', '医学是邵院老底子，临床是省双一流学科，5年制，学医苦但好就业', '/majors', '临床 医学 学医 医生 护理 药学', 'major-8');
add('会计专业怎么样', '会计是国家级一流专业，考证比什么都重要', '/majors', '会计 注会 CPA 财务 法学', 'major-6');
add('考研率高吗', '想考研大一开始就要重视绩点，学校也有考研自习室', '/majors', '考研 读研 保研 研究生 深造', 'major-transfer');
add('机械专业怎么样', '机械是国家级特色专业，邵院王牌工科之一，有硕士点', '/majors', '机械 设计制造 自动化 工科 制造', 'major-1');
add('电气专业怎么样', '电气是传统强专业，进国家电网是很多人的目标', '/majors', '电气 自动化 电网 智能电网 电力', 'major-2');

// ========== 百问百答 ==========
// 锚点用 qa-序号，页面据此自动展开对应问题
qaContent.questions.forEach((q, i) => add(q.q, q.a.substring(0, 80), '/qa', q.q, `qa-${i}`));
add('加微信 联系学长', aboutContent.contact.phone, '/qa', '微信 加微信 联系 学长 电话 手机号 手机', 'qa-contact');

// ========== 关于 ==========
add('关于本站', '邵院学长做的非官方网站，希望能帮到你', '/about', '关于 谁做的 站长 是什么', 'about-intro');
add('联系站长', aboutContent.contact.phone, '/about', '微信 联系 学长 手机 电话', 'about-contact');

// ========== 学校信息 ==========
add('邵阳学院在哪', `${siteInfo.location}，${siteInfo.founded}年建校`, '/prepare', '邵阳学院 在哪 地址 位置 邵阳', 'prepare-transport');
add('邵阳学院有几个校区', '七里坪、李子园两个校区', '/prepare', '校区 几个校区 去哪', 'prepare-transport');
add('七里坪校区', '主校区，大部分同学都在这里', '/prepare', '七里坪 校区 主校区', 'prepare-transport');
add('李子园校区', '老校区，文化底蕴十足', '/prepare', '李子园 校区 老校区', 'prepare-transport');
add('邵阳天气怎么样', '夏天热冬天湿冷，夏天短袖为主，冬天需要厚衣服', '/prepare', '天气 气候 冷 热 穿什么 温度', 'prepare-checklist');

// ========== 高频搜索补充 ==========
add('大一有早晚自习吗', '大一有早自习和晚自习', '/qa', '早晚自习 早自习 晚自习 自习', 'qa-11');
add('能谈恋爱吗', '当然能，趁大一抓紧找', '/qa', '恋爱 谈恋爱 女朋友 男朋友 对象', 'qa-2');
add('离市区远不远', '不远，七里坪出门公交十几分钟到市区，李子园更近', '/qa', '市区 距离 逛街 玩 进城', 'qa-6');
add('可以不住校吗', '可以和导员申请不住寝室', '/qa', '不住校 走读 住外面 租房', 'qa-7');
add('什么时候发银行卡', '大一办理入学时会当场办理银行卡', '/qa', '银行卡 办卡 发卡', 'qa-18');
add('学校有校园网吗', '有WiFi需要办理校园网，校园卡套餐很便宜', '/qa', 'WiFi 校园网 上网 网费 流量', 'qa-3');
add('能骑电瓶车吗', '可以骑但学校不支持，有时候会查', '/qa', '电瓶车 电动车 骑行 摩托', 'qa-16');
add('暑假可以住校吗', '寒暑假原则上要离校，特殊情况可申请留校', '/qa', '暑假 寒假 留校 放假 假期', 'qa-5');

export default index;
