// ============================================================================
// 集中简历数据源 —— 网站与 PDF 简历的唯一内容来源
// 修改简历内容只需改这个文件，然后重新 `npm run build` 即可
// 重要：所有经历必须真实，禁止编造；网站描述与 PDF 简历保持一致
// ============================================================================

const BASE = import.meta.env.BASE_URL
const withBase = (p) => (BASE.endsWith('/') ? BASE + p : BASE + '/' + p)

export const resume = {
  basics: {
    name: '牛润田',
    title: 'Java + AI 全栈开发工程师',
    tagline:
      '应届本科毕业生，专注 Java 后端与 AI 大模型应用开发，可独立完成前后端联调与工程化交付。',
    location: '广东深圳',
    educationShort: '中南林业科技大学 · 本科',
    email: '352246219@qq.com',
    phone: '19973865217',
    github: 'https://github.com/runtian611-ops',
    gitee: 'https://gitee.com/lonely-and-compassionate-ire',
    // ATS 友好简历 PDF（静态文件，位于 public/resume/）
    resumePdf: withBase('resume/Resume-NiuRuntian.pdf')
  },

  about: {
    intro:
      '应届本科毕业生，专注 Java 全栈与 AI 应用开发方向。对 AI 技术抱有浓厚兴趣，持续跟踪 AI 前沿技术；学习能力强，擅长借助 AI 编程工具辅助开发，独立排查定位解决问题。',
    objective: '求职意向：Java + AI 全栈开发工程师'
  },

  education: {
    school: '中南林业科技大学',
    major: '地理信息科学（计算机方向，一本）',
    degree: '本科',
    period: '2022.09 - 2026.06',
    note: '储备干部',
    courses: [
      'Java 程序设计',
      '数据结构',
      '数据库原理',
      'Web 开发',
      '软件工程',
      '面向对象编程',
      '计算机网络'
    ]
  },

  // 实习/工作经历（职责详情原始简历未提供，可自行在 desc 补充）
  experience: [
    {
      company: '深圳德利和能源技术有限公司',
      role: '实习',
      period: '2026.04 - 2026.08',
      desc: ''
    }
  ],

  // 技术栈：分组标签，不使用百分比进度条
  skills: [
    {
      group: '后端核心',
      items: ['Java', 'Spring Boot', 'Spring Cloud Alibaba', 'MyBatis', 'MyBatis-Plus', 'MySQL', 'Redis']
    },
    {
      group: '微服务中间件',
      items: ['Nacos', 'RabbitMQ', 'Seata', 'Sentinel', 'Canal', 'XXL-JOB', 'Elasticsearch', 'ShardingSphere']
    },
    {
      group: '前端',
      items: ['Vue3', 'Element Plus', 'Axios', 'ECharts']
    },
    {
      group: 'AI 大模型',
      items: ['Prompt 工程', 'LLM SDK 调用', 'JSON 结构化输出', 'RAG', 'AI Agent', 'MCP', 'Dify']
    },
    {
      group: '工程与运维',
      items: ['Docker', 'Nginx', 'Git', 'Jenkins', 'Knife4j', 'Apifox']
    },
    {
      group: '其他',
      items: ['Python', 'CET-4（510+）', '计算机二级', 'Office', 'Markdown']
    }
  ],

  honors: [
    '校级（2025）优秀班干部',
    'iCAN 大学生创新创业大赛创新赛道 省三等奖',
    '2025 国际大学生创新创业大赛 校级立项',
    '3D 大赛 · 数字文化设计大赛 省二等奖'
  ],

  // 项目作品集
  projects: [
    {
      id: 'znursing',
      name: '养老物联网 · 智慧养老管理平台',
      role: '后端 / 全栈开发',
      period: '2026.07 - 2026.09',
      tagline:
        '基于若依框架二次开发的养老院管理后台与家属小程序双端系统，覆盖入住办理、护理计划、健康评估、IoT 监测与报警推送全流程。',
      tags: ['Spring Boot', 'RuoYi-Vue', 'MyBatis-Plus', 'MySQL', 'Redis', 'Vue3', 'Element Plus', 'ERNIE-4.0', 'IoTDA', 'Docker'],
      // 项目截图：暂无真实截图，留 null，卡片渲染占位视觉，不编造截图
      cover: null,
      links: {
        source: 'https://gitee.com/lonely-and-compassionate-ire/znursing',
        sourceLabel: 'Gitee 源码',
        demo: null
      },
      background:
        '养老机构日常管理依赖大量人工：入住办理、护理计划排期、老人健康评估、床垫手环等设备监测与异常报警。项目目标是用一套「管理后台 + 家属小程序」双端系统把这些环节数字化，降低人工负担、提升照护及时性。',
      architecture: `flowchart TB
  subgraph 客户端["客户端"]
    A1["养老院管理后台（Vue3 + Element Plus）"]
    A2["家属小程序"]
  end
  subgraph 后端["后端（Spring Boot + RuoYi-Vue 二次开发）"]
    B1["入住办理 / 护理计划"]
    B2["健康评估模块"]
    B3["IoT 监测模块"]
    B4["报警推送模块"]
  end
  subgraph 能力["外部能力"]
    C1["百度千帆 ERNIE-4.0（PDFBox 解析体检报告）"]
    C2["华为云 IoTDA（MQTT 接入设备）"]
  end
  subgraph 数据["数据层"]
    D1[("MySQL")]
    D2[("Redis")]
  end
  DEP["Jenkins + Docker + Nginx（CI/CD）"]
  A1 --> B1
  A2 --> B1
  B1 --> D1
  B1 --> D2
  B2 --> C1
  B3 --> C2
  B4 -->|"WebSocket 秒级推送"| A1
  B1 --> DEP
  B2 --> DEP
  B3 --> DEP
  B4 --> DEP`,
      highlights: [
        {
          title: 'AI 健康评估——体检报告人工审核效率低',
          solution:
            '集成百度千帆 ERNIE-4.0，用 PDFBox 解析老人 PDF 体检报告，设计 Prompt 让模型输出结构化 JSON（健康评分、五级风险等级、8 大系统雷达分、异常指标解读），openai-java SDK 调用 + Fastjson 解析入库，前端 ECharts 雷达图展示。',
          result: '以 AI 评估替代人工审核，评估结果结构化、可复用'
        },
        {
          title: 'IoT 设备数据接入与实时展示',
          solution:
            '对接华为云 IoTDA 平台，基于 MQTT 接入智能床垫、手环，定义产品物模型（心率、呼吸率、在床状态），规则引擎将设备数据转发至后端。',
          result: 'ECharts 实时折线图展示设备体征数据'
        },
        {
          title: '异常报警需秒级触达护理员',
          solution:
            '基于 WebSocket 实现报警秒级推送，打通「数据采集 - 规则判断 - 报警生成 - 消息推送 - 业务处理」完整闭环。',
          result: '报警实时送达护理员管理端'
        },
        {
          title: '老人/床位高频查询存在慢 SQL',
          solution:
            '对高频查询字段建立联合索引，用 explain 分析并优化慢 SQL；引入 Redis 缓存字典与会话 Token；改造若依 Velocity 代码生成模板并集成 Lombok。',
          result: '查询性能提升，开发效率提高'
        },
        {
          title: '手工打包部署效率低',
          solution: '集成 Knife4j 接口文档，用 Jenkins + Docker + Nginx 搭建 CI/CD 流水线。',
          result: '实现项目自动打包部署'
        }
      ]
    },
    {
      id: 'yunlan',
      name: '家政 O2O 微服务平台（云岚到家）',
      role: '后端开发',
      period: '2026.09 - 2026.11',
      tagline:
        '面向本地生活的家政 O2O 平台，包含用户小程序、服务人员 APP、机构 PC 端、平台运营管理 PC 四端，实现家政预约、下单支付、抢派单、服务履约、结算营销的完整业务闭环。',
      tags: ['Spring Cloud Alibaba', 'Nacos', 'MyBatis-Plus', 'MySQL', 'Redis', 'RabbitMQ', 'Elasticsearch', 'Seata', 'Canal', 'XXL-JOB', 'Sentinel', 'Vue3'],
      cover: null,
      links: {
        source: null,
        sourceLabel: null,
        demo: null
      },
      background:
        '本地家政服务存在「用户找服务难、服务人员接单慢、平台调度与结算复杂」的问题。平台需要支撑高并发的下单与抢派单、可实时检索的家政服务搜索，并保证多端数据一致。参与订单、抢派单、搜索服务模块的后端开发。',
      architecture: `flowchart TB
  subgraph 客户端["四端客户端"]
    U1["用户小程序"]
    U2["服务人员 APP"]
    U3["机构 PC 端"]
    U4["平台运营 PC 端"]
  end
  GW["网关（Spring Cloud Gateway）"]
  REG["注册与配置中心（Nacos）"]
  subgraph 服务["微服务层"]
    S1["订单服务"]
    S2["抢派单服务"]
    S3["搜索服务"]
    S4["账户 / 结算服务"]
  end
  subgraph 中间件["中间件"]
    M1[("MySQL")]
    M2[("Redis")]
    M3["RabbitMQ"]
    M4[("Elasticsearch")]
  end
  CANAL["Canal（binlog 监听）"]
  SEATA["Seata（分布式事务）"]
  JOB["XXL-JOB（定时任务）"]
  SENT["Sentinel（限流熔断）"]
  U1 & U2 & U3 & U4 --> GW
  GW --> S1 & S2 & S3 & S4
  S1 & S2 & S3 & S4 --> REG
  S1 & S2 & S3 & S4 --> M1
  S1 & S2 & S3 --> M2
  S3 --> M4
  CANAL --> M3 --> M4
  S1 & S2 --> SEATA
  S1 --> JOB
  S1 & S2 & S3 --> SENT
  S1 & S2 & S3 --> M3`,
      highlights: [
        {
          title: '订单与抢派单核心链路',
          solution:
            '实现下单、支付、取消订单、抢单、AI 智能派单；基于 XXL-JOB 实现订单超时自动关闭、未支付订单定时回收；使用 Seata 解决跨微服务分布式事务。',
          result: '保障订单、账户、库存数据一致性'
        },
        {
          title: '家政服务全文 + 地理位置检索',
          solution:
            '基于 Elasticsearch 实现家政服务的全文检索 + 地理位置范围检索；采用 Canal + RabbitMQ 监听 MySQL binlog 做增量数据同步。',
          result: 'MySQL 与 ES 索引实时一致'
        },
        {
          title: '下单高峰期高并发防护',
          solution:
            'Redis 实现热点服务信息缓存；Sentinel 完成接口限流、熔断降级；ShardingSphere 实现订单表分库分表。',
          result: '减轻 DB 压力，应对海量订单存储'
        },
        {
          title: '支付/订单/结算消息异步解耦',
          solution: 'RabbitMQ 异步投递支付结果通知、订单状态变更、结算消息。',
          result: '提升接口响应速度，削峰填谷'
        },
        {
          title: '服务治理与联调',
          solution: 'Nacos 完成服务注册发现与统一配置管理；集成 Knife4j 生成接口文档。',
          result: '完成微服务接口联调与单元测试'
        }
      ]
    }
  ],

  contact: {
    email: '352246219@qq.com',
    phone: '19973865217',
    github: 'https://github.com/runtian611-ops',
    gitee: 'https://gitee.com/lonely-and-compassionate-ire'
  }
}
