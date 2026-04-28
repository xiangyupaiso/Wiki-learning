import type { Experiment, LabItem } from '@/types';

// ========== 实验1：大肠杆菌复苏与活化培养 ==========

// 实验1的器材 - 调整位置确保所有器材可见
export const experiment1Items: LabItem[] = [
  {
    id: 'freezer',
    name: '-80°C冰箱',
    nameEn: 'Ultra-low Temperature Freezer',
    image: '/images/freezer.png',
    position: { x: 3, y: 10 },
    size: { width: 90, height: 120 },
    description: '用于保存甘油菌管的超低温冰箱'
  },
  {
    id: 'incubator',
    name: '恒温培养箱',
    nameEn: 'Incubator',
    image: '/images/incubator.png',
    position: { x: 85, y: 10 },
    size: { width: 90, height: 110 },
    description: '37°C恒温培养箱，用于细菌培养'
  },
  {
    id: 'ice-box',
    name: '冰盒',
    nameEn: 'Ice Box',
    image: '/images/ice-box.png',
    position: { x: 15, y: 30 },
    size: { width: 70, height: 70 },
    description: '用于暂时保存取出的菌管，避免反复冻融'
  },
  {
    id: 'alcohol-lamp',
    name: '酒精灯',
    nameEn: 'Alcohol Lamp',
    image: '/images/alcohol-lamp.png',
    position: { x: 38, y: 35 },
    size: { width: 60, height: 75 },
    description: '用于无菌操作时的火焰灭菌'
  },
  {
    id: 'tube',
    name: '甘油菌管',
    nameEn: 'Glycerol Stock',
    image: '/images/tube.png',
    position: { x: 22, y: 50 },
    size: { width: 30, height: 60 },
    description: '含有DH5α甘油菌的保存管'
  },
  {
    id: 'inoculation-loop',
    name: '接种环',
    nameEn: 'Inoculation Loop',
    image: '/images/inoculation-loop.png',
    position: { x: 50, y: 45 },
    size: { width: 90, height: 30 },
    description: '用于挑取菌体和平板划线'
  },
  {
    id: 'petri-dish',
    name: 'LB平板',
    nameEn: 'LB Agar Plate',
    image: '/images/petri-dish.png',
    position: { x: 68, y: 32 },
    size: { width: 75, height: 75 },
    description: '含有LB固体培养基的培养皿'
  }
];

// 实验1：大肠杆菌复苏与活化培养
export const experiment1: Experiment = {
  id: 'exp1',
  title: '实验1：实验室大肠杆菌 DH5α 的复苏与活化培养（无菌操作入门）',
  titleEn: 'Resuscitation and Activation of E. coli DH5α',
  difficulty: 'easy',
  description: '从甘油保存管复苏大肠杆菌DH5α，通过LB固体培养基平板划线培养，掌握无菌操作、微生物接种与恒温培养技术。',
  items: experiment1Items,
  steps: [
    {
      id: 1,
      title: '取出甘油菌管',
      description: '从 −80 ℃冰箱中取出 DH5α 甘油菌管，迅速置于冰上，避免反复冻融。',
      highlightItems: ['freezer', 'tube', 'ice-box'],
      animationType: 'move',
      completed: false
    },
    {
      id: 2,
      title: '挑取菌体',
      description: '在酒精灯旁进行无菌操作，打开菌管，用无菌接种环轻轻挑取少量冻结菌体。',
      highlightItems: ['alcohol-lamp', 'tube', 'inoculation-loop'],
      animationType: 'move',
      completed: false
    },
    {
      id: 3,
      title: '平板划线',
      description: '立即进行平板划线接种（不需完全融化甘油菌液）。',
      highlightItems: ['petri-dish', 'inoculation-loop'],
      animationType: 'streak',
      completed: false
    },
    {
      id: 4,
      title: '灼烧接种环',
      description: '将接种环在酒精灯火焰上灼烧至红热，冷却数秒。',
      highlightItems: ['alcohol-lamp', 'inoculation-loop'],
      animationType: 'heat',
      completed: false
    },
    {
      id: 5,
      title: '四区划线法',
      description: '在 LB 平板表面进行四区划线法接种。第一区：直接涂布菌体；后三区：每次划线前需重新灼烧接种环并冷却。',
      highlightItems: ['petri-dish', 'inoculation-loop'],
      animationType: 'streak',
      completed: false
    },
    {
      id: 6,
      title: '恒温培养',
      description: '将接种后的平板倒置置于 37 ℃恒温培养箱。',
      highlightItems: ['petri-dish', 'incubator'],
      animationType: 'place',
      completed: false
    },
    {
      id: 7,
      title: '观察结果',
      description: '培养 14–18h，观察菌落生长情况。',
      highlightItems: ['incubator'],
      animationType: 'wait',
      completed: false
    }
  ],
  materials: [
    '甘油保存的大肠杆菌 DH5α 菌株（−80 ℃保存）',
    'LB 固体培养基平板（已灭菌）',
    '酒精灯',
    '无菌接种环 / 接种针'
  ],
  reagents: [
    'LB 固体培养基：胰蛋白胨 10 g/L，酵母提取物 5 g/L，NaCl 10 g/L，琼脂 15 g/L，去离子水 1L，pH 调至 7.0～7.4，121 ℃高压灭菌 20 min',
    '75% 乙醇（用于台面与手部消毒）',
    '无菌蒸馏水（备用）'
  ],
  equipment: [
    '生物安全柜或酒精灯无菌操作台',
    '恒温培养箱（37 ℃）',
    '超低温冰箱（−80 ℃）',
    '微量移液器（20–200 μL，可选）',
    '一次性无菌吸头',
    '实验服、一次性手套'
  ],
  results: '培养结束后，可见平板上形成大小均一、分散良好的单菌落，为后续实验提供活跃菌株。',
  safety: [
    '操作过程中全程佩戴实验服和手套，严格执行无菌操作',
    '酒精灯使用时注意防火，避免酒精洒落',
    '接触菌体的吸头、平板、接种环等均视为生物污染物，需统一高压灭菌后处理',
    '禁止在实验区饮食或随意走动，防止微生物污染'
  ]
};

// ========== 实验2：大肠杆菌菌落形态观察与革兰氏染色鉴定 ==========

// 实验2的器材
export const experiment2Items: LabItem[] = [
  {
    id: 'incubator',
    name: '恒温培养箱',
    nameEn: 'Incubator',
    image: '/images/incubator.png',
    position: { x: 55, y: 15 }, // 放在中间的蓝色桌子上
    size: { width: 60, height: 80 },
    description: '用于培养细菌的恒温设备'
  },
  {
    id: 'microscope',
    name: '光学显微镜',
    nameEn: 'Optical Microscope',
    image: '/images/incubator.png', // 暂时占位
    position: { x: 80, y: 15 }, // 放在右侧桌子上
    size: { width: 80, height: 80 },
    description: '用于观察染色后的细菌形态'
  },
  {
    id: 'pipette',
    name: '移液枪',
    nameEn: 'Pipette',
    image: '/images/pipette.png',
    position: { x: 15, y: 55 }, // 放在 Cleanbench 左侧
    size: { width: 35, height: 110 },
    description: '用于精确移取液体'
  },
  {
    id: 'alcohol-lamp',
    name: '酒精灯',
    nameEn: 'Alcohol Lamp',
    image: '/images/alcohol-lamp.png',
    position: { x: 48, y: 68 }, // 放在 Cleanbench 中间靠后
    size: { width: 55, height: 70 },
    description: '用于火焰固定涂片'
  },
  {
    id: 'petri-dish',
    name: 'LB平板',
    nameEn: 'LB Agar Plate',
    image: '/images/petri-dish.png',
    position: { x: 35, y: 48 }, // 放在 Cleanbench 显眼位置
    size: { width: 90, height: 90 },
    description: '含有单菌落的LB平板'
  },
  {
    id: 'stain-red',
    name: '番红染液',
    nameEn: 'Safranin',
    image: '/images/tube.png',
    position: { x: 65, y: 65 },
    size: { width: 28, height: 55 },
    description: '革兰氏染色复染剂'
  },
  {
    id: 'stain-clear',
    name: '脱色液',
    nameEn: 'Decolorizer',
    image: '/images/tube.png',
    position: { x: 70, y: 65 },
    size: { width: 28, height: 55 },
    description: '95%乙醇或丙酮乙醇混合液'
  },
  {
    id: 'stain-brown',
    name: '碘液',
    nameEn: 'Iodine',
    image: '/images/tube.png',
    position: { x: 75, y: 65 },
    size: { width: 28, height: 55 },
    description: '革兰氏染色媒染剂'
  },
  {
    id: 'stain-purple',
    name: '结晶紫',
    nameEn: 'Crystal Violet',
    image: '/images/tube.png',
    position: { x: 80, y: 65 },
    size: { width: 28, height: 55 },
    description: '革兰氏染色初染剂'
  }
];

// 实验2：大肠杆菌菌落形态观察与革兰氏染色鉴定
export const experiment2: Experiment = {
  id: 'exp2',
  title: '实验2：大肠杆菌菌落形态观察与革兰氏染色鉴定',
  titleEn: 'Colony Morphology and Gram Staining',
  difficulty: 'easy',
  description: '观察活化后大肠杆菌的菌落形态，并通过革兰氏染色镜检，初步验证菌株的典型特征。',
  items: experiment2Items,
  steps: [
    {
      id: 1,
      title: '取出培养平板',
      description: '从培养箱中取出培养好的大肠杆菌平板，观察菌落生长情况。',
      highlightItems: ['incubator', 'petri-dish'],
      animationType: 'move',
      completed: false
    },
    {
      id: 2,
      title: '菌落形态观察',
      description: '观察 LB 平板上单菌落的宏观形态：大小中等偏小、乳白色、边缘整齐光滑、表面湿润有光泽、半透明。',
      highlightItems: ['petri-dish'],
      animationType: 'move',
      completed: false
    },
    {
      id: 3,
      title: '制作涂片',
      description: '在载玻片中央滴加一小滴无菌生理盐水，用无菌接种环挑取少量菌落，均匀涂抹。',
      highlightItems: ['petri-dish', 'pipette'],
      animationType: 'move',
      completed: false
    },
    {
      id: 4,
      title: '结晶紫初染',
      description: '滴加结晶紫染液，染色 1 min，清水冲洗。',
      highlightItems: ['stain-purple'],
      animationType: 'move',
      completed: false
    },
    {
      id: 5,
      title: '碘液媒染',
      description: '加碘液处理 1 min，清水冲洗。',
      highlightItems: ['stain-brown'],
      animationType: 'move',
      completed: false
    },
    {
      id: 6,
      title: '乙醇脱色',
      description: '滴加几滴脱色剂（丙酮/乙醇 50:50），立即清水冲洗。',
      highlightItems: ['stain-clear'],
      animationType: 'move',
      completed: false
    },
    {
      id: 7,
      title: '复红复染',
      description: '加番红复染 40-60s，清水冲洗，吸干。',
      highlightItems: ['stain-red'],
      animationType: 'move',
      completed: false
    },
    {
      id: 8,
      title: '显微镜观察',
      description: '滴加香柏油，在油镜（1000×）下观察细胞形态和颜色。',
      highlightItems: ['microscope'],
      animationType: 'wait',
      completed: false
    }
  ],
  materials: [
    '实验 1 中培养获得的大肠杆菌 DH5α 单菌落',
    '洁净载玻片',
    '吸水纸'
  ],
  reagents: [
    '结晶紫染液（0.5% w/v）',
    '碘液（革兰氏碘液）',
    '脱色剂 [丙酮/乙醇（50：50，体积比）]',
    '番红染液（沙黄或复红）',
    '无菌生理盐水（0.85% NaCl）'
  ],
  equipment: [
    '光学显微镜（100×油镜）',
    '酒精灯',
    '接种环',
    '镊子',
    '显微镜载玻片与盖玻片',
    '实验服、一次性手套'
  ],
  results: '显微镜下可见细菌呈短杆状，染色结果为红色，判定为革兰氏阴性菌，符合大肠杆菌的典型形态学特征。',
  safety: [
    '火焰固定时避免过热，防止细胞形态破坏',
    '染色液避免接触皮肤和衣物',
    '使用油镜后及时清洁镜头',
    '所有用过的玻片 and 接种工具需按生物废弃物处理'
  ]
};

// 所有实验列表
export const allExperiments: Experiment[] = [
  experiment1,
  experiment2,
  {
    id: 'exp3',
    title: '实验3：质粒载体（pET-28a）的小量提取与琼脂糖凝胶电泳检测',
    titleEn: 'Plasmid Extraction and Gel Electrophoresis',
    difficulty: 'easy',
    description: '从大肠杆菌中提取pET-28a质粒载体，进行琼脂糖凝胶电泳检测。',
    items: [],
    steps: []
  },
  {
    id: 'exp4',
    title: '实验4：GFP基因片段的琼脂糖凝胶回收',
    titleEn: 'GFP Gene Fragment Gel Extraction',
    difficulty: 'easy',
    description: '从琼脂糖凝胶中回收GFP基因片段。',
    items: [],
    steps: []
  },
  {
    id: 'exp5',
    title: '实验5：GFP基因的PCR扩增与产物验证',
    titleEn: 'GFP Gene PCR Amplification',
    difficulty: 'medium',
    description: '通过PCR技术扩增GFP基因，验证产物。',
    items: [],
    steps: []
  },
  {
    id: 'exp6',
    title: '实验6：质粒载体（pET-28a）与GFP基因的双酶切反应',
    titleEn: 'Double Digestion of Plasmid and GFP',
    difficulty: 'medium',
    description: '对pET-28a质粒和GFP基因进行双酶切处理。',
    items: [],
    steps: []
  },
  {
    id: 'exp7',
    title: '实验7：酶切后载体与GFP基因片段的连接反应',
    titleEn: 'Ligation of Vector and GFP Fragment',
    difficulty: 'medium',
    description: '将酶切后的载体与GFP基因片段进行连接。',
    items: [],
    steps: []
  },
  {
    id: 'exp8',
    title: '实验8：大肠杆菌感受态细胞制备与重组质粒转化',
    titleEn: 'Competent Cell Preparation and Transformation',
    difficulty: 'hard',
    description: '制备大肠杆菌感受态细胞，进行重组质粒转化。',
    items: [],
    steps: []
  },
  {
    id: 'exp9',
    title: '实验9：阳性克隆的PCR鉴定、GFP荧光观察及蛋白表达验证',
    titleEn: 'Positive Clone Verification and GFP Expression',
    difficulty: 'hard',
    description: '对阳性克隆进行PCR鉴定，观察GFP荧光，验证蛋白表达。',
    items: [],
    steps: []
  }
];

// 信息面板内容
export const infoContent = {
  principle: {
    title: '实验原理',
    content: `## 甘油菌复苏原理
甘油作为冷冻保护剂，可以降低细胞在低温下的损伤。从-80°C取出的甘油菌需要迅速置于冰上，避免反复冻融导致细胞死亡。

## 平板划线法原理
通过连续划线将菌液稀释，使单个细胞分散生长形成单菌落。四区划线法可以获得纯培养物。

## 无菌操作原则
1. 在酒精灯火焰旁进行操作
2. 接种工具需要灼烧灭菌
3. 操作迅速，减少污染机会`
  },
  instruments: {
    title: '实验仪器',
    content: `## 主要仪器
- **−80°C 超低温冰箱**：用于长期保存甘油菌
- **恒温培养箱**：37°C培养细菌
- **超净工作台**：提供无菌操作环境
- **酒精灯**：火焰灭菌
- **接种环**：挑取和转移菌体`
  },
  reagents: {
    title: '实验试剂',
    content: `## 主要试剂
- **DH5α 甘油菌**：含有大肠杆菌DH5α菌株
- **LB 固体培养基**：提供细菌生长营养
  - 胰蛋白胨：10 g/L
  - 酵母提取物：5 g/L
  - NaCl：10 g/L
  - 琼脂：15 g/L
- **甘油**：冷冻保护剂（15-20%）`
  }
};
