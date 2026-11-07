# -*- coding: utf-8 -*-
"""
生成 ATS 友好的简历 DOCX，内容与 src/data/resume.js 保持完全一致。
规则：单栏排版、无表格、无图片、无文本框、标准字体、标准标题，纯文本可被 ATS 完整抽取。
本脚本只做排版，不编造任何经历；所有文字均来自 src/data/resume.js。
"""
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

EAST = '微软雅黑'
LATIN = 'Arial'
BLACK = (0, 0, 0)
DARK = (0x33, 0x33, 0x33)

def set_font(run, size=None, bold=False, color=None):
    run.font.name = LATIN
    rpr = run._element.get_or_add_rPr()
    rfonts = rpr.get_or_add_rFonts()
    rfonts.set(qn('w:eastAsia'), EAST)
    if size:
        run.font.size = Pt(size)
    run.font.bold = bold
    if color:
        run.font.color.rgb = RGBColor(*color)

def add_para(doc, text='', size=10.5, bold=False, align=None, space_after=4, space_before=0, color=None):
    p = doc.add_paragraph()
    if align is not None:
        p.alignment = align
    pf = p.paragraph_format
    pf.space_after = Pt(space_after)
    pf.space_before = Pt(space_before)
    pf.line_spacing = 1.15
    if text:
        run = p.add_run(text)
        set_font(run, size, bold, color)
    return p

def add_section_title(doc, text):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(10)
    pf.space_after = Pt(4)
    run = p.add_run(text)
    set_font(run, 12, bold=True, color=BLACK)
    ppr = p._p.get_or_add_pPr()
    pbdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '6')
    bottom.set(qn('w:space'), '2')
    bottom.set(qn('w:color'), '000000')
    pbdr.append(bottom)
    ppr.append(pbdr)
    return p

def add_bullet(doc, text, size=10.5, bold_prefix=None):
    """普通段落 + 项目符号前缀，避免 Word 列表编号对 ATS 抽取的干扰。"""
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_after = Pt(2)
    pf.space_before = Pt(0)
    pf.line_spacing = 1.15
    pf.left_indent = Cm(0.4)
    pf.first_line_indent = Cm(-0.4)
    r = p.add_run('•  ')
    set_font(r, size)
    if bold_prefix:
        rb = p.add_run(bold_prefix)
        set_font(rb, size, bold=True, color=BLACK)
    run = p.add_run(text)
    set_font(run, size)
    return p

doc = Document()

# 页面：A4 + 适中边距
sec = doc.sections[0]
sec.page_width = Cm(21)
sec.page_height = Cm(29.7)
sec.top_margin = Cm(1.4)
sec.bottom_margin = Cm(1.4)
sec.left_margin = Cm(1.7)
sec.right_margin = Cm(1.7)

# 默认字体
normal = doc.styles['Normal']
normal.font.name = LATIN
normal.font.size = Pt(10.5)
normal.element.get_or_add_rPr().get_or_add_rFonts().set(qn('w:eastAsia'), EAST)

# ===== 头部 =====
add_para(doc, '牛润田', size=18, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
add_para(doc, 'Java + AI 全栈开发工程师 ｜ 广东深圳', size=11, bold=True,
         align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
add_para(doc, '电话：19973865217 ｜ 邮箱：352246219@qq.com ｜ GitHub：github.com/runtian611-ops ｜ '
              'Gitee：gitee.com/lonely-and-compassionate-ire',
         size=9.5, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6)

# ===== 求职意向 =====
add_section_title(doc, '求职意向')
add_para(doc, '求职意向：Java + AI 全栈开发工程师', size=10.5, space_after=2)
add_para(doc, '应届本科毕业生，专注 Java 全栈与 AI 应用开发方向。对 AI 技术抱有浓厚兴趣，持续跟踪 AI 前沿技术；'
              '学习能力强，擅长借助 AI 编程工具辅助开发，独立排查定位解决问题。', size=10.5, space_after=2)

# ===== 专业技能 =====
add_section_title(doc, '专业技能')
skills = [
    ('后端核心', 'Java、Spring Boot、Spring Cloud Alibaba、MyBatis、MyBatis-Plus、MySQL、Redis'),
    ('微服务中间件', 'Nacos、RabbitMQ、Seata、Sentinel、Canal、XXL-JOB、Elasticsearch、ShardingSphere'),
    ('前端', 'Vue3、Element Plus、Axios、ECharts'),
    ('AI 大模型', 'Prompt 工程、LLM SDK 调用、JSON 结构化输出、RAG、AI Agent、MCP、Dify'),
    ('工程与运维', 'Docker、Nginx、Git、Jenkins、Knife4j、Apifox'),
    ('其他', 'Python、CET-4（510+）、计算机二级、Office、Markdown'),
]
for group, items in skills:
    add_bullet(doc, items, bold_prefix=group + '：')

# ===== 项目经历 =====
add_section_title(doc, '项目经历')

# 项目 1
p = add_para(doc, '', space_after=0)
r = p.add_run('养老物联网 · 智慧养老管理平台')
set_font(r, 11, bold=True, color=BLACK)
r2 = p.add_run('  ｜  后端 / 全栈开发  ｜  2026.07 - 2026.09')
set_font(r2, 10, color=DARK)
add_para(doc, '基于若依框架二次开发的养老院管理后台与家属小程序双端系统，覆盖入住办理、护理计划、健康评估、'
              'IoT 监测与报警推送全流程。', size=10, space_after=2)
for h in [
    'AI 健康评估——体检报告人工审核效率低：集成百度千帆 ERNIE-4.0，用 PDFBox 解析老人 PDF 体检报告，设计 Prompt 让模型输出结构化 JSON（健康评分、五级风险等级、8 大系统雷达分、异常指标解读），openai-java SDK 调用 + Fastjson 解析入库，前端 ECharts 雷达图展示。（成果：以 AI 评估替代人工审核，评估结果结构化、可复用）',
    'IoT 设备数据接入与实时展示：对接华为云 IoTDA 平台，基于 MQTT 接入智能床垫、手环，定义产品物模型（心率、呼吸率、在床状态），规则引擎将设备数据转发至后端。（成果：ECharts 实时折线图展示设备体征数据）',
    '异常报警需秒级触达护理员：基于 WebSocket 实现报警秒级推送，打通「数据采集 - 规则判断 - 报警生成 - 消息推送 - 业务处理」完整闭环。（成果：报警实时送达护理员管理端）',
    '老人/床位高频查询存在慢 SQL：对高频查询字段建立联合索引，用 explain 分析并优化慢 SQL；引入 Redis 缓存字典与会话 Token；改造若依 Velocity 代码生成模板并集成 Lombok。（成果：查询性能提升，开发效率提高）',
    '手工打包部署效率低：集成 Knife4j 接口文档，用 Jenkins + Docker + Nginx 搭建 CI/CD 流水线。（成果：实现项目自动打包部署）',
]:
    add_bullet(doc, h, size=10)

# 项目 2
p = add_para(doc, '', space_after=0, space_before=6)
r = p.add_run('家政 O2O 微服务平台（云岚到家）')
set_font(r, 11, bold=True, color=BLACK)
r2 = p.add_run('  ｜  后端开发  ｜  2026.09 - 2026.11')
set_font(r2, 10, color=DARK)
add_para(doc, '面向本地生活的家政 O2O 平台，包含用户小程序、服务人员 APP、机构 PC 端、平台运营管理 PC 四端，'
              '实现家政预约、下单支付、抢派单、服务履约、结算营销的完整业务闭环。', size=10, space_after=2)
for h in [
    '订单与抢派单核心链路：实现下单、支付、取消订单、抢单、AI 智能派单；基于 XXL-JOB 实现订单超时自动关闭、未支付订单定时回收；使用 Seata 解决跨微服务分布式事务。（成果：保障订单、账户、库存数据一致性）',
    '家政服务全文 + 地理位置检索：基于 Elasticsearch 实现家政服务的全文检索 + 地理位置范围检索；采用 Canal + RabbitMQ 监听 MySQL binlog 做增量数据同步。（成果：MySQL 与 ES 索引实时一致）',
    '下单高峰期高并发防护：Redis 实现热点服务信息缓存；Sentinel 完成接口限流、熔断降级；ShardingSphere 实现订单表分库分表。（成果：减轻 DB 压力，应对海量订单存储）',
    '支付/订单/结算消息异步解耦：RabbitMQ 异步投递支付结果通知、订单状态变更、结算消息。（成果：提升接口响应速度，削峰填谷）',
    '服务治理与联调：Nacos 完成服务注册发现与统一配置管理；集成 Knife4j 生成接口文档。（成果：完成微服务接口联调与单元测试）',
]:
    add_bullet(doc, h, size=10)

# ===== 实习经历 =====
add_section_title(doc, '实习经历')
p = add_para(doc, '', space_after=0)
r = p.add_run('深圳德利和能源技术有限公司')
set_font(r, 11, bold=True, color=BLACK)
r2 = p.add_run('  ｜  实习  ｜  2026.04 - 2026.08')
set_font(r2, 10, color=DARK)

# ===== 教育背景 =====
add_section_title(doc, '教育背景')
p = add_para(doc, '', space_after=0)
r = p.add_run('中南林业科技大学')
set_font(r, 11, bold=True, color=BLACK)
r2 = p.add_run('  ｜  地理信息科学（计算机方向，一本）  ｜  本科  ｜  2022.09 - 2026.06  ｜  储备干部')
set_font(r2, 10, color=DARK)
add_para(doc, '主修课程：Java 程序设计、数据结构、数据库原理、Web 开发、软件工程、面向对象编程、计算机网络',
         size=10, space_after=2)

# ===== 荣誉奖项 =====
add_section_title(doc, '荣誉奖项')
for h in [
    '校级（2025）优秀班干部',
    'iCAN 大学生创新创业大赛创新赛道 省三等奖',
    '2025 国际大学生创新创业大赛 校级立项',
    '3D 大赛 · 数字文化设计大赛 省二等奖',
]:
    add_bullet(doc, h, size=10.5)

# 文档属性
cp = doc.core_properties
cp.title = '牛润田 - Java + AI 全栈开发工程师 简历'
cp.author = '牛润田'

out = r'D:\DS_WorkArea\My_repository\scripts\Resume-NiuRuntian.docx'
doc.save(out)
print('DOCX saved:', out)
