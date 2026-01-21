
import { CommunityCircle, POI, RoadEvent, RoadSegment, RoadBook, Stay } from './types';

// 象山坐标范围参考: 经度 121.8° - 122.0°，纬度 29.2° - 29.5°
export const COMMUNITIES: CommunityCircle[] = [
  {
    id: 'main-hub',
    name: '主枢纽',
    subtitle: '〇号广场',
    icon: 'explore',
    image: 'https://images.unsplash.com/photo-1506466010722-395ee2bef877?auto=format&fit=crop&q=80&w=1000',
    type: 'main',
    size: 'w-48 h-48'
  },
  {
    id: 'sunset',
    name: '日落摄影',
    icon: 'photo_camera',
    image: 'https://images.unsplash.com/photo-1472120482482-d42104454e81?auto=format&fit=crop&q=80&w=400',
    type: 'satellite',
    position: { top: '5%', left: '10%' },
    size: 'w-28 h-28'
  },
  {
    id: 'cycling',
    name: '海岸骑行',
    icon: 'directions_bike',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=400',
    type: 'satellite',
    position: { top: '10%', right: '12%' },
    size: 'w-32 h-32'
  },
  {
    id: 'seafood',
    name: '海鲜食客',
    icon: 'restaurant',
    image: 'https://images.unsplash.com/photo-1559739511-e9404f553331?auto=format&fit=crop&q=80&w=400',
    type: 'satellite',
    position: { bottom: '10%', left: '8%' },
    size: 'w-32 h-32'
  },
  {
    id: 'vanlife',
    name: '公路旅居',
    icon: 'airport_shuttle',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=400',
    type: 'satellite',
    position: { bottom: '5%', right: '15%' },
    size: 'w-24 h-24'
  }
];

export const POIS: POI[] = [
  { id: '1', name: '宁波轨道交通接驳点', category: 'transit', lat: 29.4770, lng: 121.8680, description: '快到象山第一站，接驳公路自驾之旅。', tags: ['低碳', '便捷'] },
  { id: '2', name: '〇号环岛公路起点', category: 'scenery', lat: 29.4500, lng: 121.9000, description: '海边公路的极致浪漫从这里开始。', tags: ['地标', '打卡'] },
  { id: '3', name: '半边山旅游度假区', category: 'scenery', lat: 29.4180, lng: 121.9460, description: '看日出的绝佳点位，隐藏在公路深处。', tags: ['日出', '亲子'] },
  { id: '4', name: '石浦渔港古镇', category: 'food', lat: 29.2010, lng: 121.9360, description: '最正宗的象山开渔节风味。', tags: ['必吃', '平价'] }
];

export const EVENTS: RoadEvent[] = [
  { 
    id: 'e1', 
    title: '公路落日音乐会：海浪与萨克斯', 
    date: '05.20', 
    time: '18:30 - 20:00',
    location: '〇号广场 - 观日平台', 
    type: 'music', 
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400',
    price: '免费',
    isHot: true,
    slotsLeft: 12,
    participants: 456
  }
];

export const ROAD_SEGMENTS: RoadSegment[] = [
  { 
    id: 'rs1', 
    name: '斑斓海岸段', 
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800', 
    description: '追一场霞光，无限心动',
    fullIntro: '斑斓海岸段是〇号公路最出名的“彩色”路段，不仅路面铺设了亮丽的色彩带，两旁的民居也被粉刷得如童话小镇一般。这里是海风、艺术与慢生活的交汇点。',
    length: '20.3 KM',
    duration: '45 MIN',
    highlights: ['涂鸦民居墙', '海景漫步道', '彩色柏油路', '日落灯塔'],
    gallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&w=400',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&w=400'
    ]
  },
  { 
    id: 'rs2', 
    name: '风车奇遇段', 
    image: 'https://images.unsplash.com/photo-1466611653911-95282fc365d5?auto=format&fit=crop&w=800', 
    description: '遇一群同好，无限灵感',
    fullIntro: '当巨大的白色风车在山脊线上缓缓转动，山海之间的极致视野便展现在眼前。这里是摄影师和骑行爱好者的天堂。',
    length: '12.8 KM',
    duration: '30 MIN',
    highlights: ['山脊风车阵', '落日摄影台', '云端咖啡屋', '草坪野餐区'],
    gallery: [
      'https://images.unsplash.com/photo-1414490929659-9a12b7e31907?auto=format&w=400',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&w=400'
    ]
  },
  { 
    id: 'rs3', 
    name: '跃动山海段', 
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=800', 
    description: '撒一回欢儿，无限活力',
    fullIntro: '穿梭在险峻的山体与开阔的海面之间，每一个弯道都充满了驾驶的乐趣。这里是释放压力、挥洒汗水的绝佳赛道。',
    length: '15.7 KM',
    duration: '35 MIN',
    highlights: ['S型山海弯', '极限滑板公园', '半边山沙滩', '露营拓展基地'],
    gallery: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&w=400',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&w=400'
    ]
  },
  { 
    id: 'rs4', 
    name: '渔光古城段', 
    image: 'https://images.unsplash.com/photo-1559739511-e9404f553331?auto=format&fit=crop&w=800', 
    description: '赴一场渔光，无限烟火',
    fullIntro: '石浦渔港的百年风情在这里延续。古老的石阶、归航的渔船以及满街飘香的海鲜美食，构成了一幅生动的渔家生活长卷。',
    length: '4.3 KM',
    duration: '15 MIN',
    highlights: ['石浦中街', '中国渔村', '开渔节广场', '海鲜美食街'],
    gallery: [
      'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&w=400',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&w=400'
    ]
  },
  { 
    id: 'rs5', 
    name: '盘山望海段', 
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800', 
    description: '望一汪沧海，无限开阔',
    fullIntro: '沿着道人山的山脊盘旋而上，视线在碧绿的山峦与蔚蓝的大海之间不断跳跃。站上最高点，象山港的全景尽收眼底。',
    length: '15.4 KM',
    duration: '40 MIN',
    highlights: ['道人山巅', '云海日出', '高山有机茶园', '望海石'],
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&w=400',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&w=400'
    ]
  },
  { 
    id: 'rs6', 
    name: '玄石秘境段', 
    image: 'https://images.unsplash.com/photo-1505142446710-c60207fa023e?auto=format&fit=crop&w=800', 
    description: '探一域石林，无限震撼',
    fullIntro: '怪石嶙峋的火山岩地貌，诉说着亿万年前的造山运动。幽静的石林深处，隐藏着自然的鬼斧神工。',
    length: '5.6 KM',
    duration: '20 MIN',
    highlights: ['黑曜石阵', '回音壁', '熔岩地质公园', '地下溶洞入口'],
    gallery: [
      'https://images.unsplash.com/photo-1523592121529-f6d3cf853e25?auto=format&w=400',
      'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&w=400'
    ]
  },
  { 
    id: 'rs7', 
    name: '橘香原野段', 
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800', 
    description: '摘一篮酸甜，无限满足',
    fullIntro: '象山红美人橘林的芬芳弥漫在空气中。在这片金色的原野上，你可以体验亲手采摘的乐趣，感受大地的馈赠。',
    length: '6.3 KM',
    duration: '20 MIN',
    highlights: ['红美人柑橘林', '农耕文化馆', '原野咖啡驿站', '稻田迷宫'],
    gallery: [
      'https://images.unsplash.com/photo-1495480174656-7518bc9a873c?auto=format&w=400',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&w=400'
    ]
  },
  { 
    id: 'rs8', 
    name: '戏梦片场段', 
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800', 
    description: '造一个梦境，无限想象',
    fullIntro: '穿过那扇古老的大门，你便跨越了时空。这里不仅是热门影视剧的取景地，更是一个能让你圆武侠梦的奇幻世界。',
    length: '2.1 KM',
    duration: '10 MIN',
    highlights: ['象山影视城', '民国风情街', '唐城御花园', '威亚体验区'],
    gallery: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&w=400',
      'https://images.unsplash.com/photo-1531053331192-355fe9e70728?auto=format&w=400'
    ]
  },
  { 
    id: 'rs9', 
    name: '灵岩蟹逅段', 
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800', 
    description: '偷一日悠闲，无限治愈',
    fullIntro: '灵岩山下的蟹钳港，波光粼粼，岁月静好。在这里，你可以放下手机，吹着微凉的海风，享受一次心灵的深度SPA。',
    length: '17.6 KM',
    duration: '40 MIN',
    highlights: ['蟹钳港观景台', '赶海艺术空间', '静谧海湾民宿', '竹海小径'],
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=400',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&w=400'
    ]
  },
  { 
    id: 'rs10', 
    name: '海山遥望段', 
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800', 
    description: '入一片自然，无限自在',
    fullIntro: '这里是象山最天然的生态廊道，植被茂密，鸟鸣阵阵。远处的海平线与近处的森林交织，带你回归最纯粹的自然。',
    length: '10.8 KM',
    duration: '30 MIN',
    highlights: ['原生森林步道', '观鸟隐藏点', '溪谷露营地', '入海口湿地'],
    gallery: [
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&w=400',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&w=400'
    ]
  }
];

export const ROAD_BOOKS: RoadBook[] = [
  { 
    id: 'rb1', 
    title: '〇号公路官方完整指南', 
    author: '象山文旅', 
    type: 'official', 
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400',
    intro: '由象山官方文旅局深度策划，涵盖了〇号环岛公路所有的核心打卡点。无论你是初访象山还是深度自驾，这本路书都是不可或缺的指南。',
    points: [
      { id: 'p1', name: '起点：〇号广场', description: '公路漫游的零公里处。', image: 'https://images.unsplash.com/photo-1506466010722-395ee2bef877?auto=format&w=200', coordinate: { x: 20, y: 30 } },
      { id: 'p2', name: '第一站：斑斓海岸', description: '最出片的彩色公路段。', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=200', coordinate: { x: 45, y: 40 } },
      { id: 'p3', name: '第二站：半边山日出', description: '东海岸最美的第一缕阳光。', image: 'https://images.unsplash.com/photo-1472120482482-d42104454e81?auto=format&w=200', coordinate: { x: 70, y: 65 } },
      { id: 'p4', name: '终点：石浦渔港', description: '归航的灯火与最鲜的海味。', image: 'https://images.unsplash.com/photo-1559739511-e9404f553331?auto=format&w=200', coordinate: { x: 80, y: 85 } }
    ]
  }
];

export const ROAD_STAYS: Stay[] = [
  {
    id: 'stay1',
    name: '半边山伴海露营地',
    type: 'camping',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=400',
    price: '¥ 199 起',
    rating: '4.8',
    tags: ['海景', '篝火', '装备租赁']
  },
  {
    id: 'stay2',
    name: '象山海域开元名庭酒店',
    type: 'hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400',
    price: '¥ 688 起',
    rating: '4.9',
    tags: ['五星级', '无边泳池', '亲子推荐']
  },
  {
    id: 'stay3',
    name: '青籁民宿 · 斑斓海岸店',
    type: 'bnb',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=400',
    price: '¥ 450 起',
    rating: '4.7',
    tags: ['设计感', '网红打卡', '私享露台']
  },
  {
    id: 'stay4',
    name: '〇号路青年国际旅舍',
    type: 'hostel',
    image: 'https://images.unsplash.com/photo-1555854817-5b2260d50c50?auto=format&fit=crop&w=400',
    price: '¥ 99 起',
    rating: '4.5',
    tags: ['社交', '低碳', '共享空间']
  }
];
