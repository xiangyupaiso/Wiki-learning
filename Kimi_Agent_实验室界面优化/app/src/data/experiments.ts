import type { Experiment } from '@/types';

export const experiments: Experiment[] = [
  {
    id: 1,
    title: '实验1：实验室大肠杆菌 DH5α 的复苏与活化培养',
    subtitle: '无菌操作入门',
    description: '从甘油保存管复苏大肠杆菌DH5α，通过LB固体培养基平板划线培养，掌握无菌操作、微生物接种与恒温培养技术。',
    difficulty: 'easy',
    steps: [
      {
        id: 1,
        title: '取出甘油菌管',
        content: '从-80℃冰箱中取出DH5α甘油菌管，迅速置于冰上，避免反复冻融。',
        detailContent: '（一）甘油菌复苏准备\n从-80℃冰箱中取出DH5α甘油菌管，迅速置于冰上，避免反复冻融。'
      },
      {
        id: 2,
        title: '挑取菌体',
        content: '使用无菌接种环从甘油菌管中挑取少量菌体。',
        detailContent: '使用无菌接种环从甘油菌管中挑取少量菌体，注意无菌操作。'
      },
      {
        id: 3,
        title: '平板划线',
        content: '立即进行平板划线接种（不需完全融化甘油菌液）。',
        detailContent: '立即进行平板划线接种（不需完全融化甘油菌液）。'
      },
      {
        id: 4,
        title: '灼烧接种环',
        content: '将接种环在酒精灯火焰上灼烧至红热，冷却数秒。',
        detailContent: '灼烧接种环\n将接种环在酒精灯火焰上灼烧至红热，冷却数秒。'
      },
      {
        id: 5,
        title: '四区划线法',
        content: '在LB平板表面进行四区划线法接种',
        detailContent: '（二）LB 固体培养基平板划线接种\n当前步骤：5.在 LB 平板表面进行四区划线法接种\n第一区：直接涂布菌体    后三区：每次划线前需重新灼烧接种环并冷却'
      },
      {
        id: 6,
        title: '恒温培养',
        content: '将划线后的平板倒置放入37℃恒温培养箱中培养12-16小时。',
        detailContent: '将划线后的平板倒置放入37℃恒温培养箱中培养12-16小时。'
      },
      {
        id: 7,
        title: '观察结果',
        content: '观察平板上大肠杆菌菌落的生长情况。',
        detailContent: '观察平板上大肠杆菌菌落的生长情况，记录菌落形态特征。'
      }
    ],
    instruments: [
      {
        id: 'dropper',
        name: '胶头滴管',
        englishName: 'rubber head dropper',
        description: '用于吸取和滴加少量液体的玻璃仪器',
        usage: '使用时保持垂直，轻捏胶头吸取液体，不要平放或倒置',
        icon: 'dropper'
      },
      {
        id: 'burner',
        name: '酒精喷灯',
        englishName: 'alcohol blast burner',
        description: '实验室常用的加热工具，用于灭菌和灼烧接种工具',
        usage: '点燃前检查酒精量，使用时注意安全，用完后及时熄灭',
        icon: 'burner'
      },
      {
        id: 'coverslip',
        name: '盖玻片',
        englishName: 'cover slip',
        description: '用于覆盖显微镜标本的薄玻璃片',
        usage: '使用时轻拿轻放，避免产生气泡',
        icon: 'coverslip'
      },
      {
        id: 'petri',
        name: '培养皿',
        englishName: 'petri dish',
        description: '用于微生物培养的圆形玻璃或塑料器皿',
        usage: '使用前灭菌，培养时倒置放置，防止冷凝水滴落',
        icon: 'petri'
      },
      {
        id: 'loop',
        name: '接种环',
        englishName: 'inoculation loop',
        description: '用于微生物接种的金属丝环',
        usage: '使用前后需在火焰上灼烧灭菌，冷却后再接触菌液',
        icon: 'loop'
      },
      {
        id: 'microscope',
        name: '显微镜',
        englishName: 'microscope',
        description: '用于观察微小物体的光学仪器',
        usage: '从低倍镜开始观察，逐步调至高倍镜，注意调节光圈和焦距',
        icon: 'microscope'
      },
      {
        id: 'incubator',
        name: '恒温培养箱',
        englishName: 'constant temperature incubator',
        description: '用于微生物恒温培养的设备',
        usage: '提前预热至设定温度，放入培养物后保持温度恒定',
        icon: 'incubator'
      }
    ],
    reagents: [
      {
        id: 'lb',
        name: 'LB培养基',
        englishName: 'LB medium',
        description: '常用的细菌培养基，含有蛋白胨、酵母提取物和氯化钠',
        usage: '按配方配制后灭菌，用于细菌的培养和繁殖',
        icon: 'lb'
      },
      {
        id: 'glycerol',
        name: '甘油',
        englishName: 'glycerol',
        description: '用于菌株低温保存的保护剂',
        usage: '与菌液混合后置于-80℃保存，可防止细胞冻伤',
        icon: 'glycerol'
      }
    ],
    principles: {
      content: '大肠杆菌为革兰氏阴性杆菌，在普通营养培养基上可形成圆形、光滑、湿润、半透明的灰白色菌落。革兰氏染色基于细菌细胞壁结构差异，通过结晶紫初染、碘液媒染、乙醇脱色、复红复染，使革兰氏阴性菌呈红色，革兰氏阳性菌呈紫色，可据此区分鉴定大肠杆菌。实验中部分步骤需严格控制温度，以保证染色与操作效果。',
      questions: [
        {
          id: 1,
          question: '实验脱色前需将载玻片置于恒温装置辅助控温，适宜温度为：',
          options: ['50℃恒温水浴箱', '30℃恒温水浴箱'],
          correctIndex: 1
        },
        {
          id: 2,
          question: '大肠杆菌经革兰氏染色后，显微镜下呈现的颜色为：',
          options: ['红色', '紫色'],
          correctIndex: 0
        }
      ]
    },
    safety: [
      { id: 1, content: '全程在超净台操作，提前紫外消毒，保持无菌环境。' },
      { id: 2, content: '必须穿实验服、戴手套，不直接接触菌液和培养基。' },
      { id: 3, content: '接种环、枪头等全部灭菌使用，不混用、不重复用。' },
      { id: 4, content: '酒精灯附近操作，远离酒精等易燃物，注意防火。' },
      { id: 5, content: '用过的菌液、耗材集中消毒处理，不乱扔。' }
    ]
  },
  {
    id: 2,
    title: '实验2：大肠杆菌菌落形态观察与革兰氏染色鉴定',
    subtitle: '菌落观察与染色技术',
    description: '观察活化后大肠杆菌的菌落形态（大小、颜色、边缘、透明度），并通过革兰氏染色镜检，初步验证菌株的典型特征。',
    difficulty: 'easy',
    steps: [
      { id: 1, title: '取出培养平板', content: '从培养箱中取出培养好的大肠杆菌平板。', detailContent: '从培养箱中取出培养好的大肠杆菌平板，观察菌落生长情况。' },
      { id: 2, title: '菌落形态观察', content: '肉眼观察菌落的大小、形状、颜色、边缘、透明度等特征。', detailContent: '肉眼观察菌落的大小、形状、颜色、边缘、透明度等特征，记录观察结果。' },
      { id: 3, title: '制作涂片', content: '在载玻片上滴加生理盐水，挑取少量菌体制作涂片。', detailContent: '在载玻片上滴加生理盐水，挑取少量菌体制作涂片，自然干燥后火焰固定。' },
      { id: 4, title: '结晶紫初染', content: '用结晶紫染液覆盖涂片，染色1分钟后水洗。', detailContent: '用结晶紫染液覆盖涂片，染色1分钟后水洗，甩干水分。' },
      { id: 5, title: '碘液媒染', content: '用碘液覆盖涂片，媒染1分钟后水洗。', detailContent: '用碘液覆盖涂片，媒染1分钟后水洗，甩干水分。' },
      { id: 6, title: '乙醇脱色', content: '用95%乙醇脱色20-30秒，立即水洗。', detailContent: '用95%乙醇脱色20-30秒，立即水洗，甩干水分。' },
      { id: 7, title: '复红复染', content: '用复红染液复染30秒-1分钟，水洗后干燥。', detailContent: '用复红染液复染30秒-1分钟，水洗后自然干燥或用吸水纸吸干。' },
      { id: 8, title: '显微镜观察', content: '在显微镜下观察染色结果，记录菌体形态和染色特性。', detailContent: '在显微镜下观察染色结果，记录菌体形态和染色特性，大肠杆菌应为红色短杆菌。' }
    ],
    instruments: [
      { id: 'microscope', name: '显微镜', englishName: 'microscope', description: '用于观察微小物体的光学仪器', usage: '从低倍镜开始观察，逐步调至高倍镜', icon: 'microscope' },
      { id: 'slide', name: '载玻片', englishName: 'microscope slide', description: '用于制作显微镜标本的玻璃片', usage: '使用前清洁干净，制作涂片后自然干燥', icon: 'slide' },
      { id: 'loop', name: '接种环', englishName: 'inoculation loop', description: '用于微生物接种的金属丝环', usage: '使用前后需在火焰上灼烧灭菌', icon: 'loop' }
    ],
    reagents: [
      { id: 'crystal', name: '结晶紫染液', englishName: 'crystal violet', description: '革兰氏染色初染剂', usage: '覆盖涂片染色1分钟', icon: 'crystal' },
      { id: 'iodine', name: '碘液', englishName: 'iodine solution', description: '革兰氏染色媒染剂', usage: '覆盖涂片媒染1分钟', icon: 'iodine' },
      { id: 'alcohol', name: '95%乙醇', englishName: '95% ethanol', description: '革兰氏染色脱色剂', usage: '脱色20-30秒，时间不宜过长', icon: 'alcohol' },
      { id: 'safranin', name: '复红染液', englishName: 'safranin', description: '革兰氏染色复染剂', usage: '复染30秒-1分钟', icon: 'safranin' }
    ],
    principles: {
      content: '革兰氏染色法是细菌学中最重要的鉴别染色法之一。其原理是基于细菌细胞壁结构和成分的差异。革兰氏阳性菌细胞壁含有大量肽聚糖和磷壁酸，染色后能被结晶紫-碘复合物牢固结合，乙醇脱色时不易被洗脱，保持紫色；而革兰氏阴性菌细胞壁肽聚糖层较薄，外膜含有脂多糖，乙醇脱色时脂类被溶解，细胞壁通透性增加，结晶紫-碘复合物被洗脱，再经复红复染后呈红色。',
      questions: [
        { id: 1, question: '革兰氏阳性菌染色后呈：', options: ['紫色', '红色'], correctIndex: 0 },
        { id: 2, question: '革兰氏染色中，乙醇脱色时间应控制在：', options: ['20-30秒', '2-3分钟'], correctIndex: 0 }
      ]
    },
    safety: [
      { id: 1, content: '染色剂具有腐蚀性，操作时戴手套，避免接触皮肤。' },
      { id: 2, content: '乙醇易燃，远离火源，在通风处使用。' },
      { id: 3, content: '使用过的染液按规定处理，不随意倾倒。' },
      { id: 4, content: '显微镜使用完毕，关闭光源，将载物台降至最低。' }
    ]
  },
  {
    id: 3,
    title: '实验3：质粒载体（pET-28a）的小量提取与琼脂糖凝胶电泳检测',
    subtitle: '质粒提取技术',
    description: '从大肠杆菌中提取pET-28a质粒载体，进行琼脂糖凝胶电泳检测。',
    difficulty: 'easy',
    steps: [
      { id: 1, title: '菌液培养', content: '将含pET-28a的大肠杆菌接种于含卡那霉素的LB培养基中，37℃振荡培养过夜。', detailContent: '将含pET-28a的大肠杆菌接种于含卡那霉素的LB培养基中，37℃振荡培养过夜。' },
      { id: 2, title: '收集菌体', content: '取1.5ml菌液，12000rpm离心1分钟，弃上清。', detailContent: '取1.5ml菌液，12000rpm离心1分钟，弃上清，收集菌体沉淀。' },
      { id: 3, title: '重悬菌体', content: '加入250μl重悬液，充分振荡混匀。', detailContent: '加入250μl重悬液（含RNase A），充分振荡混匀，使菌体完全重悬。' },
      { id: 4, title: '裂解细胞', content: '加入250μl裂解液，温和颠倒混匀，静置5分钟。', detailContent: '加入250μl裂解液（含SDS和NaOH），温和颠倒混匀，静置5分钟，使细胞裂解。' },
      { id: 5, title: '中和沉淀', content: '加入350μl中和液，立即颠倒混匀，冰浴5分钟。', detailContent: '加入350μl中和液（含醋酸钾），立即颠倒混匀，冰浴5分钟，使蛋白质和多糖沉淀。' },
      { id: 6, title: '离心取上清', content: '12000rpm离心10分钟，取上清液至新离心管。', detailContent: '12000rpm离心10分钟，取上清液至新离心管，弃去沉淀。' },
      { id: 7, title: '结合洗涤', content: '将上清液过吸附柱，洗涤液洗涤两次。', detailContent: '将上清液过吸附柱，用洗涤液洗涤两次，去除杂质。' },
      { id: 8, title: '洗脱质粒', content: '加入洗脱液，离心洗脱质粒DNA。', detailContent: '加入50-100μl洗脱液，12000rpm离心1分钟，洗脱质粒DNA。' },
      { id: 9, title: '电泳检测', content: '取5μl质粒DNA进行琼脂糖凝胶电泳检测。', detailContent: '取5μl质粒DNA进行1%琼脂糖凝胶电泳检测，观察质粒条带。' }
    ],
    instruments: [
      { id: 'centrifuge', name: '离心机', englishName: 'centrifuge', description: '用于分离混合物的设备', usage: '使用前检查转子是否安装正确，设定好转速和时间', icon: 'centrifuge' },
      { id: 'electrophoresis', name: '电泳仪', englishName: 'electrophoresis apparatus', description: '用于核酸或蛋白质分离的设备', usage: '正确连接正负极，设置合适的电压和时间', icon: 'electrophoresis' },
      { id: 'vortex', name: '涡旋振荡器', englishName: 'vortex mixer', description: '用于快速混匀液体的设备', usage: '将离心管置于振荡头，按压使其振荡混匀', icon: 'vortex' }
    ],
    reagents: [
      { id: 'resuspension', name: '重悬液', englishName: 'resuspension buffer', description: '用于重悬菌体的缓冲液', usage: '加入后充分振荡使菌体重悬', icon: 'resuspension' },
      { id: 'lysis', name: '裂解液', englishName: 'lysis buffer', description: '含SDS和NaOH，用于裂解细胞', usage: '温和颠倒混匀，不要剧烈振荡', icon: 'lysis' },
      { id: 'neutralization', name: '中和液', englishName: 'neutralization buffer', description: '含醋酸钾，用于中和并沉淀蛋白质', usage: '立即颠倒混匀，冰浴使沉淀完全', icon: 'neutralization' },
      { id: 'agarose', name: '琼脂糖', englishName: 'agarose', description: '用于制备电泳凝胶', usage: '配制1%凝胶，加热溶解后倒胶', icon: 'agarose' }
    ],
    principles: {
      content: '质粒提取基于碱裂解法原理。在碱性条件下（pH 12.0-12.5），细菌细胞壁和细胞膜被破坏，染色体DNA和质粒DNA变性。加入中和液后，质粒DNA迅速复性并溶解于溶液中，而染色体DNA与蛋白质、多糖等形成沉淀。通过离心去除沉淀，上清液中的质粒DNA可被吸附柱特异性吸附，经洗涤去除杂质后洗脱得到纯化的质粒DNA。',
      questions: [
        { id: 1, question: '碱裂解法中，裂解液的pH值为：', options: ['pH 12.0-12.5', 'pH 7.0-8.0'], correctIndex: 0 },
        { id: 2, question: '中和后，质粒DNA会：', options: ['形成沉淀', '保持溶解状态'], correctIndex: 1 }
      ]
    },
    safety: [
      { id: 1, content: '裂解液含NaOH，具有强腐蚀性，操作时戴手套和护目镜。' },
      { id: 2, content: '离心机使用前检查转子是否安装牢固，盖子是否盖好。' },
      { id: 3, content: '电泳时使用防护罩，避免接触电泳缓冲液。' },
      { id: 4, content: '紫外线观察凝胶时，使用防护面罩或观察箱。' }
    ]
  },
  {
    id: 4,
    title: '实验4：GFP基因片段的琼脂糖凝胶回收',
    subtitle: 'DNA片段回收技术',
    description: '从琼脂糖凝胶中回收GFP基因片段。',
    difficulty: 'easy',
    steps: [
      { id: 1, title: '切取凝胶', content: '在紫外灯下切取含有目标DNA条带的凝胶块。', detailContent: '在紫外灯下切取含有目标DNA条带的凝胶块，尽量减少多余凝胶。' },
      { id: 2, title: '称重', content: '将凝胶块称重，记录重量。', detailContent: '将凝胶块放入离心管中称重，记录重量用于计算结合液用量。' },
      { id: 3, title: '溶解凝胶', content: '加入结合液，50-60℃水浴溶解凝胶。', detailContent: '按每100mg凝胶加入300μl结合液，50-60℃水浴10分钟溶解凝胶。' },
      { id: 4, title: '结合DNA', content: '将溶解后的凝胶液过吸附柱，使DNA结合到柱上。', detailContent: '将溶解后的凝胶液过吸附柱，离心使DNA结合到柱膜上。' },
      { id: 5, title: '洗涤', content: '用洗涤液洗涤吸附柱，去除盐分。', detailContent: '加入700μl洗涤液，12000rpm离心1分钟，去除盐分。' },
      { id: 6, title: '干燥', content: '空转离心2分钟，去除残留乙醇。', detailContent: '空转离心2分钟，去除残留乙醇，室温放置5分钟使乙醇挥发。' },
      { id: 7, title: '洗脱DNA', content: '加入洗脱液，离心洗脱DNA。', detailContent: '加入30-50μl洗脱液，室温放置2分钟后12000rpm离心1分钟，洗脱DNA。' }
    ],
    instruments: [
      { id: 'waterbath', name: '水浴锅', englishName: 'water bath', description: '用于恒温加热的设备', usage: '设定温度后预热，放入样品加热', icon: 'waterbath' },
      { id: 'uvtrans', name: '紫外透射仪', englishName: 'UV transilluminator', description: '用于观察DNA条带的设备', usage: '使用时戴防护面罩，快速切取凝胶', icon: 'uvtrans' },
      { id: 'centrifuge', name: '离心机', englishName: 'centrifuge', description: '用于分离混合物的设备', usage: '使用前检查转子是否安装正确', icon: 'centrifuge' }
    ],
    reagents: [
      { id: 'binding', name: '结合液', englishName: 'binding buffer', description: '含离液盐，用于溶解凝胶并结合DNA', usage: '按凝胶重量加入相应体积', icon: 'binding' },
      { id: 'wash', name: '洗涤液', englishName: 'wash buffer', description: '含乙醇，用于洗涤去除盐分', usage: '使用前检查是否加入乙醇', icon: 'wash' },
      { id: 'elution', name: '洗脱液', englishName: 'elution buffer', description: '用于洗脱DNA的低盐缓冲液', usage: '室温放置2分钟后离心洗脱', icon: 'elution' }
    ],
    principles: {
      content: '琼脂糖凝胶回收基于硅胶膜吸附原理。在高浓度离液盐存在下，DNA能够特异性地结合到硅胶膜上，而凝胶中的其他成分如琼脂糖、染料等则不被吸附。通过洗涤去除残留的盐分后，用低盐缓冲液或水洗脱，即可得到纯化的DNA片段。该方法回收率高，操作简便，是分子生物学实验中常用的DNA纯化方法。',
      questions: [
        { id: 1, question: '凝胶回收中，DNA结合到硅胶膜需要在：', options: ['高盐条件', '低盐条件'], correctIndex: 0 },
        { id: 2, question: '洗脱DNA时，洗脱液应：', options: ['预热至60℃', '室温即可'], correctIndex: 1 }
      ]
    },
    safety: [
      { id: 1, content: '紫外光对皮肤和眼睛有害，切胶时戴防护面罩，尽量缩短暴露时间。' },
      { id: 2, content: '水浴锅使用时注意防烫伤，水位应高于样品液面。' },
      { id: 3, content: '结合液含离液盐，避免接触皮肤和眼睛。' }
    ]
  },
  {
    id: 5,
    title: '实验5：GFP基因的PCR扩增与产物验证',
    subtitle: 'PCR扩增技术',
    description: '通过PCR技术扩增GFP基因，验证产物。',
    difficulty: 'medium',
    steps: [
      { id: 1, title: '设计引物', content: '根据GFP基因序列设计特异性引物。', detailContent: '根据GFP基因序列设计特异性引物，引物长度18-25bp，GC含量40-60%。' },
      { id: 2, title: '配制反应体系', content: '按配方配制PCR反应体系。', detailContent: '在冰浴上配制PCR反应体系：10×缓冲液5μl，dNTPs 4μl，引物各2μl，模板1μl，Taq酶0.5μl，补水至50μl。' },
      { id: 3, title: '设置PCR程序', content: '设置PCR循环参数。', detailContent: '设置PCR程序：94℃预变性5分钟；94℃变性30秒，55℃退火30秒，72℃延伸1分钟，共30个循环；72℃终延伸10分钟。' },
      { id: 4, title: '运行PCR', content: '将反应管放入PCR仪，启动程序。', detailContent: '将反应管放入PCR仪，确保管盖盖紧，启动程序。' },
      { id: 5, title: '电泳检测', content: '取5μl PCR产物进行琼脂糖凝胶电泳。', detailContent: '取5μl PCR产物与上样缓冲液混合，进行1.5%琼脂糖凝胶电泳检测。' },
      { id: 6, title: '结果分析', content: '观察电泳结果，判断扩增是否成功。', detailContent: '在紫外灯下观察电泳结果，判断是否有预期大小的特异性条带。' }
    ],
    instruments: [
      { id: 'pcr', name: 'PCR仪', englishName: 'PCR thermal cycler', description: '用于DNA扩增的仪器', usage: '正确放置反应管，设置程序后启动', icon: 'pcr' },
      { id: 'electrophoresis', name: '电泳仪', englishName: 'electrophoresis apparatus', description: '用于核酸分离的设备', usage: '正确连接正负极，设置电压', icon: 'electrophoresis' },
      { id: 'micropipette', name: '微量移液器', englishName: 'micropipette', description: '用于精确量取微量液体', usage: '选择合适量程，垂直吸取液体', icon: 'micropipette' }
    ],
    reagents: [
      { id: 'taq', name: 'Taq DNA聚合酶', englishName: 'Taq DNA polymerase', description: '用于DNA扩增的耐热酶', usage: '在冰浴上加入，最后加入反应体系', icon: 'taq' },
      { id: 'dntp', name: 'dNTPs', englishName: 'dNTP mixture', description: 'DNA合成的原料', usage: '终浓度一般为200μM each', icon: 'dntp' },
      { id: 'buffer', name: 'PCR缓冲液', englishName: 'PCR buffer', description: '含Mg2+的缓冲体系', usage: '通常为10×浓度，按1/10体积加入', icon: 'buffer' },
      { id: 'primer', name: '引物', englishName: 'primer', description: 'DNA扩增的起始寡核苷酸', usage: '工作浓度一般为0.2-0.5μM', icon: 'primer' }
    ],
    principles: {
      content: 'PCR（聚合酶链式反应）是一种体外扩增DNA的技术。其原理基于DNA的半保留复制：在高温下（94-95℃）DNA双链变性解离为单链；降温至50-65℃时，引物与模板DNA的互补序列退火结合；在72℃时，Taq DNA聚合酶以dNTPs为原料，从引物3端开始合成新的DNA链。通过反复进行变性-退火-延伸三个步骤，目标DNA片段呈指数级扩增。',
      questions: [
        { id: 1, question: 'PCR反应中，变性温度一般为：', options: ['94-95℃', '72℃'], correctIndex: 0 },
        { id: 2, question: 'Taq DNA聚合酶的最适延伸温度为：', options: ['55℃', '72℃'], correctIndex: 1 }
      ]
    },
    safety: [
      { id: 1, content: 'PCR产物可能造成污染，使用专用区域和设备。' },
      { id: 2, content: '紫外观察时做好防护，避免皮肤和眼睛暴露。' },
      { id: 3, content: '实验结束后，PCR产物应专门收集处理。' }
    ]
  },
  {
    id: 6,
    title: '实验6：质粒载体（pET-28a）与GFP基因的双酶切反应',
    subtitle: '限制性酶切技术',
    description: '对pET-28a质粒和GFP基因进行双酶切处理。',
    difficulty: 'medium',
    steps: [
      { id: 1, title: '选择酶切位点', content: '根据载体多克隆位点和插入片段选择合适的限制性内切酶。', detailContent: '选择EcoRI和HindIII作为双酶切的限制性内切酶。' },
      { id: 2, title: '配制酶切体系', content: '配制质粒和GFP片段的双酶切反应体系。', detailContent: '在冰浴上配制酶切体系：DNA 1μg，10×缓冲液2μl，EcoRI 1μl，HindIII 1μl，补水至20μl。' },
      { id: 3, title: '酶切反应', content: '37℃水浴孵育2-4小时。', detailContent: '37℃水浴孵育2-4小时，使酶切反应充分进行。' },
      { id: 4, title: '电泳检测', content: '取部分酶切产物进行电泳检测。', detailContent: '取5μl酶切产物进行琼脂糖凝胶电泳，检测酶切是否完全。' },
      { id: 5, title: '灭活酶', content: '65℃加热20分钟或酚氯仿抽提灭活内切酶。', detailContent: '65℃加热20分钟灭活内切酶，防止后续反应中继续切割。' }
    ],
    instruments: [
      { id: 'waterbath', name: '水浴锅', englishName: 'water bath', description: '用于恒温孵育', usage: '设定37℃预热后放入样品', icon: 'waterbath' },
      { id: 'electrophoresis', name: '电泳仪', englishName: 'electrophoresis apparatus', description: '用于检测酶切产物', usage: '正确连接电极，设置电压', icon: 'electrophoresis' }
    ],
    reagents: [
      { id: 'ecori', name: 'EcoRI', englishName: 'EcoRI', description: '限制性内切酶', usage: '在冰浴上加入，-20℃保存', icon: 'ecori' },
      { id: 'hindiii', name: 'HindIII', englishName: 'HindIII', description: '限制性内切酶', usage: '在冰浴上加入，-20℃保存', icon: 'hindiii' },
      { id: 'enzymebuffer', name: '酶切缓冲液', englishName: 'restriction buffer', description: '提供酶切所需离子环境', usage: '按酶说明书选择合适缓冲液', icon: 'enzymebuffer' }
    ],
    principles: {
      content: '限制性内切酶是一类能够识别特定DNA序列并在该位点或附近切割双链DNA的酶。双酶切是指使用两种不同的限制性内切酶同时对DNA进行切割，以产生具有不同粘性末端的DNA片段。这种方法常用于分子克隆中，使载体和插入片段产生互补的粘性末端，便于后续的连接反应。',
      questions: [
        { id: 1, question: '限制性内切酶的酶切温度一般为：', options: ['37℃', '72℃'], correctIndex: 0 },
        { id: 2, question: '双酶切的目的是产生：', options: ['平末端', '粘性末端'], correctIndex: 1 }
      ]
    },
    safety: [
      { id: 1, content: '限制性内切酶需-20℃保存，使用时在冰浴上操作。' },
      { id: 2, content: '酶切缓冲液可能含有DTT等还原剂，避免接触皮肤。' },
      { id: 3, content: '酶切产物及时灭活或纯化，防止过度切割。' }
    ]
  },
  {
    id: 7,
    title: '实验7：酶切后载体与GFP基因片段的连接反应',
    subtitle: 'DNA连接技术',
    description: '将酶切后的载体与GFP基因片段进行连接。',
    difficulty: 'medium',
    steps: [
      { id: 1, title: '准备DNA片段', content: '将酶切后的载体和GFP片段进行凝胶回收纯化。', detailContent: '将酶切后的载体和GFP片段进行琼脂糖凝胶电泳，切胶回收纯化。' },
      { id: 2, title: '计算用量', content: '根据浓度计算载体和插入片段的用量。', detailContent: '载体与插入片段的摩尔比一般为1:3至1:10，计算所需体积。' },
      { id: 3, title: '配制连接体系', content: '配制DNA连接反应体系。', detailContent: '在冰浴上配制连接体系：载体50-100ng，插入片段按比例加入，10×缓冲液1μl，T4 DNA连接酶1μl，补水至10μl。' },
      { id: 4, title: '连接反应', content: '16℃连接过夜或室温连接2-4小时。', detailContent: '16℃连接过夜，或室温（20-25℃）连接2-4小时。' },
      { id: 5, title: '灭活或保存', content: '65℃加热10分钟灭活连接酶，或直接使用。', detailContent: '65℃加热10分钟灭活连接酶，或-20℃保存备用。' }
    ],
    instruments: [
      { id: 'waterbath', name: '水浴锅', englishName: 'water bath', description: '用于16℃连接孵育', usage: '设定16℃或室温操作', icon: 'waterbath' },
      { id: 'spectro', name: '分光光度计', englishName: 'spectrophotometer', description: '用于测定DNA浓度', usage: '使用NanoDrop等微量测定仪', icon: 'spectro' }
    ],
    reagents: [
      { id: 'ligase', name: 'T4 DNA连接酶', englishName: 'T4 DNA ligase', description: '用于连接DNA片段', usage: '在冰浴上加入，-20℃保存', icon: 'ligase' },
      { id: 'ligasebuffer', name: '连接缓冲液', englishName: 'ligation buffer', description: '含ATP，提供连接反应所需能量', usage: '避免反复冻融，-20℃保存', icon: 'ligasebuffer' }
    ],
    principles: {
      content: 'DNA连接酶能够催化DNA链之间磷酸二酯键的形成，将两个DNA片段连接起来。T4 DNA连接酶来源于T4噬菌体感染的大肠杆菌，能够连接粘性末端和平末端。在连接反应中，载体和插入片段的摩尔比是影响连接效率的重要因素，通常载体与插入片段的摩尔比为1:3至1:10时连接效率最高。',
      questions: [
        { id: 1, question: 'T4 DNA连接酶能够连接：', options: ['粘性末端和平末端', '只能连接粘性末端'], correctIndex: 0 },
        { id: 2, question: '载体与插入片段的最佳摩尔比为：', options: ['1:1', '1:3至1:10'], correctIndex: 1 }
      ]
    },
    safety: [
      { id: 1, content: '连接缓冲液含ATP，避免反复冻融。' },
      { id: 2, content: 'T4 DNA连接酶需-20℃保存，使用时在冰浴上操作。' },
      { id: 3, content: '连接产物可直接用于转化或-20℃保存。' }
    ]
  },
  {
    id: 8,
    title: '实验8：大肠杆菌感受态细胞制备与重组质粒转化',
    subtitle: '感受态制备与转化技术',
    description: '制备大肠杆菌感受态细胞，进行重组质粒转化。',
    difficulty: 'hard',
    steps: [
      { id: 1, title: '活化菌株', content: '将大肠杆菌DH5α接种于LB培养基，37℃振荡培养过夜。', detailContent: '将大肠杆菌DH5α接种于LB培养基，37℃振荡培养过夜。' },
      { id: 2, title: '扩大培养', content: '取过夜培养物按1:100接种于新鲜LB培养基。', detailContent: '取1ml过夜培养物接种于100ml LB培养基中，37℃振荡培养至OD600=0.4-0.6。' },
      { id: 3, title: '冰浴冷却', content: '将菌液冰浴30分钟，使细胞停止生长。', detailContent: '将菌液冰浴30分钟，使细胞停止生长，保持低温状态。' },
      { id: 4, title: '收集菌体', content: '4℃ 4000rpm离心10分钟，弃上清。', detailContent: '4℃ 4000rpm离心10分钟收集菌体，弃上清，保持低温操作。' },
      { id: 5, title: 'CaCl2处理', content: '用预冷的0.1M CaCl2溶液重悬菌体，冰浴30分钟。', detailContent: '用30ml预冷的0.1M CaCl2溶液轻柔重悬菌体，冰浴30分钟。' },
      { id: 6, title: '再次离心', content: '4℃ 4000rpm离心10分钟，弃上清。', detailContent: '4℃ 4000rpm离心10分钟，弃上清，收集菌体。' },
      { id: 7, title: '制备感受态', content: '用预冷的CaCl2/甘油溶液重悬菌体，分装保存。', detailContent: '用2ml预冷的CaCl2/甘油溶液重悬菌体，每管100μl分装，液氮速冻后-80℃保存。' },
      { id: 8, title: '转化', content: '取感受态细胞加入重组质粒，冰浴30分钟。', detailContent: '取100μl感受态细胞，加入5-10μl连接产物，轻轻混匀，冰浴30分钟。' },
      { id: 9, title: '热激', content: '42℃热激90秒，立即冰浴2分钟。', detailContent: '42℃水浴热激90秒，立即取出冰浴2分钟。' },
      { id: 10, title: '复苏培养', content: '加入LB培养基，37℃振荡培养1小时。', detailContent: '加入900μl LB培养基，37℃振荡培养1小时，使抗性基因表达。' },
      { id: 11, title: '涂板筛选', content: '将菌液涂布于含抗生素的LB平板，37℃培养过夜。', detailContent: '将菌液涂布于含卡那霉素的LB平板，37℃培养过夜，观察转化子。' }
    ],
    instruments: [
      { id: 'shaker', name: '恒温振荡器', englishName: 'shaking incubator', description: '用于细菌振荡培养', usage: '设定37℃，转速200-250rpm', icon: 'shaker' },
      { id: 'centrifuge', name: '冷冻离心机', englishName: 'refrigerated centrifuge', description: '用于4℃离心收集菌体', usage: '提前预冷至4℃，设定转速和时间', icon: 'centrifuge' },
      { id: 'waterbath', name: '水浴锅', englishName: 'water bath', description: '用于42℃热激', usage: '设定42℃，确保温度准确', icon: 'waterbath' }
    ],
    reagents: [
      { id: 'cacl2', name: 'CaCl2溶液', englishName: 'calcium chloride', description: '用于制备感受态细胞', usage: '配制0.1M CaCl2，预冷后使用', icon: 'cacl2' },
      { id: 'glycerol', name: '甘油', englishName: 'glycerol', description: '用于感受态细胞冷冻保存', usage: '与CaCl2配成保存液，终浓度10-15%', icon: 'glycerol' },
      { id: 'kanamycin', name: '卡那霉素', englishName: 'kanamycin', description: '用于转化子筛选的抗生素', usage: '工作浓度30-50μg/ml', icon: 'kanamycin' }
    ],
    principles: {
      content: '感受态细胞是指能够摄取外源DNA的细胞。CaCl2法制备感受态的原理是：在低温条件下，Ca2+能够中和细胞表面的负电荷，使细胞间的排斥力减弱；同时Ca2+能够改变细胞膜的通透性，使细胞膜形成暂时的通道，便于外源DNA进入细胞。热激处理能够短暂地增加细胞膜的流动性，促进DNA的进入。转化后的细胞在不含抗生素的培养基中复苏，使抗性基因得以表达，然后才能在含抗生素的平板上生长。',
      questions: [
        { id: 1, question: 'CaCl2法制备感受态时，Ca2+的作用是：', options: ['中和细胞表面负电荷，改变膜通透性', '提供能量'], correctIndex: 0 },
        { id: 2, question: '热激处理的温度为：', options: ['42℃', '37℃'], correctIndex: 0 }
      ]
    },
    safety: [
      { id: 1, content: '整个过程保持低温操作，感受态细胞对温度敏感。' },
      { id: 2, content: '抗生素使用注意防护，避免吸入或接触皮肤。' },
      { id: 3, content: '液氮速冻时戴防冻手套，防止冻伤。' },
      { id: 4, content: '热激时严格控制时间，避免细胞死亡。' }
    ]
  },
  {
    id: 9,
    title: '实验9：阳性克隆的PCR鉴定、GFP荧光观察及蛋白表达验证',
    subtitle: '克隆鉴定与蛋白表达',
    description: '对阳性克隆进行PCR鉴定，观察GFP荧光，验证蛋白表达。',
    difficulty: 'hard',
    steps: [
      { id: 1, title: '挑取单克隆', content: '从转化平板上挑取单菌落接种于含抗生素的LB培养基。', detailContent: '从转化平板上挑取单菌落接种于含卡那霉素的LB培养基，37℃振荡培养过夜。' },
      { id: 2, title: '菌落PCR', content: '以菌液为模板进行PCR鉴定。', detailContent: '取1μl菌液作为模板，使用载体通用引物进行PCR鉴定。' },
      { id: 3, title: '电泳检测', content: 'PCR产物电泳检测，判断插入片段大小是否正确。', detailContent: '取5μl PCR产物进行琼脂糖凝胶电泳，观察是否有预期大小的条带。' },
      { id: 4, title: '荧光观察', content: '在紫外光或蓝光下观察菌液的GFP荧光。', detailContent: '取适量菌液在紫外光或蓝光激发下观察绿色荧光。' },
      { id: 5, title: '诱导表达', content: '加入IPTG诱导GFP蛋白表达。', detailContent: '当OD600达到0.6-0.8时，加入0.5mM IPTG，37℃继续培养4小时。' },
      { id: 6, title: '收集菌体', content: '离心收集诱导后的菌体。', detailContent: '取1ml菌液，12000rpm离心1分钟，收集菌体沉淀。' },
      { id: 7, title: '裂解细胞', content: '加入裂解缓冲液，超声或煮沸裂解细胞。', detailContent: '加入100μl裂解缓冲液，煮沸10分钟裂解细胞。' },
      { id: 8, title: 'SDS-PAGE', content: '进行SDS-PAGE电泳分离蛋白。', detailContent: '取20μl裂解液进行SDS-PAGE电泳，分离蛋白。' },
      { id: 9, title: '染色观察', content: '考马斯亮蓝染色或荧光成像观察GFP蛋白条带。', detailContent: '考马斯亮蓝染色后脱色，观察是否有预期大小的GFP蛋白条带。' }
    ],
    instruments: [
      { id: 'pcr', name: 'PCR仪', englishName: 'PCR thermal cycler', description: '用于菌落PCR鉴定', usage: '正确放置反应管，设置程序', icon: 'pcr' },
      { id: 'uvtrans', name: '紫外透射仪', englishName: 'UV transilluminator', description: '用于观察GFP荧光', usage: '使用蓝光激发，避免紫外损伤', icon: 'uvtrans' },
      { id: 'sds', name: 'SDS-PAGE电泳系统', englishName: 'SDS-PAGE system', description: '用于蛋白分离', usage: '正确组装凝胶，设置电压', icon: 'sds' },
      { id: 'shaker', name: '恒温振荡器', englishName: 'shaking incubator', description: '用于诱导培养', usage: '设定37℃，转速200rpm', icon: 'shaker' }
    ],
    reagents: [
      { id: 'iptg', name: 'IPTG', englishName: 'isopropyl β-D-1-thiogalactopyranoside', description: '诱导剂，用于诱导蛋白表达', usage: '工作浓度0.5-1mM', icon: 'iptg' },
      { id: 'loading', name: '蛋白上样缓冲液', englishName: 'protein loading buffer', description: '含SDS和还原剂，用于蛋白变性', usage: '与样品等体积混合，煮沸5分钟', icon: 'loading' },
      { id: 'coomassie', name: '考马斯亮蓝', englishName: 'Coomassie brilliant blue', description: '蛋白染色剂', usage: '染色1小时后脱色', icon: 'coomassie' }
    ],
    principles: {
      content: 'GFP（绿色荧光蛋白）是一种来源于水母的发光蛋白，在蓝光或紫外光激发下能够发出绿色荧光。pET表达系统是一种原核表达系统，利用T7噬菌体启动子驱动外源基因的表达。在IPTG诱导下，T7 RNA聚合酶表达，识别pET载体上的T7启动子，驱动下游GFP基因的转录和翻译，产生GFP蛋白。通过观察荧光和SDS-PAGE分析，可以验证GFP蛋白是否成功表达。',
      questions: [
        { id: 1, question: 'GFP在哪种光激发下发出绿色荧光：', options: ['蓝光或紫外光', '红光'], correctIndex: 0 },
        { id: 2, question: 'pET表达系统中，IPTG的作用是：', options: ['诱导T7 RNA聚合酶表达', '抑制蛋白降解'], correctIndex: 0 }
      ]
    },
    safety: [
      { id: 1, content: '紫外光对皮肤和眼睛有害，观察荧光时做好防护。' },
      { id: 2, content: 'IPTG和丙烯酰胺有毒，操作时戴手套，避免吸入。' },
      { id: 3, content: 'SDS-PAGE使用的电泳缓冲液含SDS，避免接触皮肤。' },
      { id: 4, content: '考马斯亮蓝染色液含有机溶剂，在通风处使用。' }
    ]
  }
];

// 获取指定难度的实验
export const getExperimentsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return experiments.filter(exp => exp.difficulty === difficulty);
};

// 获取所有实验
export const getAllExperiments = () => experiments;

// 根据ID获取实验
export const getExperimentById = (id: number) => {
  return experiments.find(exp => exp.id === id);
};
