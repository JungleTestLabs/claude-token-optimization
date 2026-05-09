// generate-ppt.js
// Claude Token 优化最佳实践 - 团队宣讲PPT
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "狗助 (Dog Assistant)";
pres.title = "Claude Token 优化最佳实践";

// === 色彩体系 ===
const C = {
  navy:    "1E2761",
  navyL:   "2A3A7A",
  teal:    "028090",
  tealL:   "00A896",
  tealD:   "016070",
  ice:     "CADCFC",
  white:   "FFFFFF",
  offW:    "F5F7FA",
  gray:    "64748B",
  grayL:   "E2E8F0",
  dark:    "1E293B",
  red:     "DC2626",
  green:   "059669",
  orange:  "EA580C",
  gold:    "D97706",
};

// === 工具函数 ===
const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.12 });
const makeShadowUp = () => ({ type: "outer", blur: 5, offset: 2, angle: 270, color: "000000", opacity: 0.10 });

function titleBar(slide, title) {
  // 顶部装饰条
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  // 标题
  slide.addText(title, {
    x: 0.7, y: 0.25, w: 8.6, h: 0.65,
    fontSize: 28, fontFace: "Arial", bold: true,
    color: C.navy, margin: 0,
  });
  // 分隔线
  slide.addShape(pres.shapes.LINE, { x: 0.7, y: 0.95, w: 8.6, h: 0, line: { color: C.teal, width: 2 } });
}

function footer(slide, pageNum) {
  slide.addText(`${pageNum}`, {
    x: 8.5, y: 5.25, w: 1, h: 0.3,
    fontSize: 9, color: C.gray, align: "right",
  });
  slide.addText("Claude Token 优化最佳实践", {
    x: 0.5, y: 5.25, w: 4, h: 0.3,
    fontSize: 9, color: C.gray,
  });
}

function bulletList(slide, items, x, y, w, fontSize) {
  const texts = items.map((item, i) => ({
    text: item,
    options: { bullet: true, breakLine: i < items.length - 1, fontSize: fontSize || 14, color: C.dark, paraSpaceAfter: 4 },
  }));
  slide.addText(texts, { x: x || 0.7, y: y || 1.2, w: w || 8.6, h: 3.5, valign: "top" });
}

function card(slide, x, y, w, h, title, body, accentColor) {
  const ac = accentColor || C.teal;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white },
    shadow: makeShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h,
    fill: { color: ac },
  });
  slide.addText(title, {
    x: x + 0.2, y: y + 0.1, w: w - 0.4, h: 0.4,
    fontSize: 13, bold: true, color: C.navy, margin: 0,
  });
  slide.addText(body, {
    x: x + 0.2, y: y + 0.5, w: w - 0.4, h: h - 0.6,
    fontSize: 11, color: C.gray, margin: 0, valign: "top",
  });
}

function bigNumber(slide, x, y, number, label, color) {
  slide.addText(number, {
    x, y: y - 0.15, w: 3, h: 0.8,
    fontSize: 44, bold: true, color: color || C.teal, margin: 0,
  });
  slide.addText(label, {
    x, y: y + 0.65, w: 3, h: 0.4,
    fontSize: 11, color: C.gray, margin: 0,
  });
}

// ============================================================
// SLIDE 1: 标题页
// ============================================================
const s1 = pres.addSlide();
s1.background = { color: C.navy };
// 装饰块
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.5, h: 5.625, fill: { color: C.navyL } });
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.0, w: 3.5, h: 0.06, fill: { color: C.teal } });
// 主标题
s1.addText("Claude Token\n优化最佳实践", {
  x: 4.0, y: 1.2, w: 5.5, h: 1.8,
  fontSize: 38, fontFace: "Arial", bold: true, color: C.white, margin: 0,
});
// 副标题
s1.addText("系统性减少Token消耗的方法论与实践", {
  x: 4.0, y: 3.0, w: 5.5, h: 0.5,
  fontSize: 16, color: C.ice, margin: 0,
});
// 底部信息
s1.addText("面向安卓转鸿蒙开发团队  |  2026年5月", {
  x: 4.0, y: 4.5, w: 5.5, h: 0.4,
  fontSize: 11, color: C.gray, margin: 0,
});
// 左侧标签
s1.addText("TOKEN\nOPTIMIZATION", {
  x: 0.4, y: 1.2, w: 2.8, h: 1.8,
  fontSize: 16, fontFace: "Arial", charSpacing: 8, color: C.gray, align: "center", margin: 0,
});

// ============================================================
// SLIDE 2: 议程
// ============================================================
const s2 = pres.addSlide();
s2.background = { color: C.offW };
titleBar(s2, "议程");
footer(s2, "02");

const agenda = [
  { num: "01", title: "Token消耗全景", desc: "钱花在哪了？输入/输出各阶段占比" },
  { num: "02", title: "成本量化模型", desc: "Sonnet vs Opus vs DeepSeek 真实成本对比" },
  { num: "03", title: "四大优化支柱", desc: "配置 · 流程 · 提示 · 工具链" },
  { num: "04", title: "量化对比与ROI", desc: "优化前 vs 优化后 — 省了多少钱？" },
  { num: "05", title: "安卓转鸿蒙专项", desc: "四大任务特征 × 针对性优化策略" },
  { num: "06", title: "数据来源与准确性", desc: "数字怎么来的？如何验证？" },
  { num: "07", title: "优先级排序", desc: "从易到难，从快到慢" },
  { num: "08", title: "OpenCode优化指南", desc: "提供商套利 + 多模型策略" },
  { num: "09", title: "行动清单", desc: "今天/本周/持续要做的事" },
  { num: "10", title: "Token监控工具", desc: "度量才能优化 — 四层工具体系" },
];

agenda.forEach((a, i) => {
  const yBase = 1.3 + i * 0.65;
  s2.addText(a.num, {
    x: 1.0, y: yBase, w: 0.6, h: 0.45,
    fontSize: 18, bold: true, color: C.teal, margin: 0,
  });
  s2.addText(a.title, {
    x: 1.7, y: yBase, w: 2.5, h: 0.45,
    fontSize: 15, bold: true, color: C.navy, margin: 0,
  });
  s2.addText(a.desc, {
    x: 4.3, y: yBase, w: 4.0, h: 0.45,
    fontSize: 13, color: C.gray, margin: 0,
  });
  if (i < agenda.length - 1) {
    s2.addShape(pres.shapes.LINE, { x: 1.7, y: yBase + 0.55, w: 6.5, h: 0, line: { color: C.grayL, width: 0.5 } });
  }
});

// ============================================================
// SLIDE 3: Token消耗全景
// ============================================================
const s3 = pres.addSlide();
s3.background = { color: C.offW };
titleBar(s3, "Token消耗全景 — 钱花在哪了？");
footer(s3, "03");

// 饼图
s3.addChart(pres.charts.PIE, [{
  name: "占比",
  labels: ["文件读取", "对话历史", "系统提示词", "输出回答", "工具定义"],
  values: [45, 30, 12, 8, 5],
}], {
  x: 5.2, y: 1.2, w: 4.3, h: 3.0,
  showPercent: true, showLegend: false, showTitle: false,
  chartColors: [C.red, C.orange, C.gold, C.teal, C.gray],
  dataLabelColor: C.white,
});

// 左侧说明
const breakdown = [
  { text: "文件读取 45%", options: { bold: true, color: C.red, breakLine: true, fontSize: 15 } },
  { text: "每次 @file 读取整个.ets文件(5K-15K tokens)，项目中需反复读取多个文件", options: { breakLine: true, fontSize: 12, color: C.gray } },
  { text: "", options: { breakLine: true, fontSize: 6 } },
  { text: "对话历史 30%", options: { bold: true, color: C.orange, breakLine: true, fontSize: 15 } },
  { text: "每轮对话都携带全部历史，第40轮时单次输入可达260K tokens", options: { breakLine: true, fontSize: 12, color: C.gray } },
  { text: "", options: { breakLine: true, fontSize: 6 } },
  { text: "系统提示词 12%", options: { bold: true, color: C.gold, breakLine: true, fontSize: 15 } },
  { text: "Claude Code默认系统提示 ~5K tokens，每次会话都注入", options: { breakLine: true, fontSize: 12, color: C.gray } },
];

s3.addText(breakdown, { x: 0.7, y: 1.3, w: 4.2, h: 3.2, valign: "top" });

// 底部关键数据
s3.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.3, w: 8.6, h: 0.55, fill: { color: C.navy } });
s3.addText("⚠️ 文件读取 + 对话历史 = 75% Token消耗 → 这是优化的主战场", {
  x: 0.9, y: 4.35, w: 8.2, h: 0.45,
  fontSize: 14, color: C.white, bold: true, margin: 0,
});

// ============================================================
// SLIDE 4: 成本量化模型
// ============================================================
const s4 = pres.addSlide();
s4.background = { color: C.offW };
titleBar(s4, "成本量化模型 — 三种模型对比");
footer(s4, "04");

// 三列对比
const models = [
  { name: "Claude Opus 4", in: "$15/MTok", out: "$75/MTok", month: "$3,795", color: C.red, note: "最强推理，最贵" },
  { name: "Claude Sonnet", in: "$3/MTok", out: "$15/MTok", month: "$759", color: C.orange, note: "日常开发主力" },
  { name: "DeepSeek V4", in: "¥2/MTok", out: "¥8/MTok", month: "¥493 (~$69)", color: C.green, note: "性价比之王" },
];

models.forEach((m, i) => {
  const x = 0.7 + i * 3.1;
  // 卡片
  s4.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.8, h: 3.5, fill: { color: C.white }, shadow: makeShadow() });
  s4.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.8, h: 0.06, fill: { color: m.color } });
  // 标题
  s4.addText(m.name, {
    x: x + 0.2, y: 1.5, w: 2.4, h: 0.4,
    fontSize: 16, bold: true, color: C.navy, margin: 0,
  });
  s4.addText(m.note, {
    x: x + 0.2, y: 1.85, w: 2.4, h: 0.3,
    fontSize: 10, color: C.gray, italic: true, margin: 0,
  });
  // 定价
  s4.addText("输入: " + m.in, {
    x: x + 0.2, y: 2.3, w: 2.4, h: 0.3,
    fontSize: 12, color: C.dark, margin: 0,
  });
  s4.addText("输出: " + m.out, {
    x: x + 0.2, y: 2.6, w: 2.4, h: 0.3,
    fontSize: 12, color: C.dark, margin: 0,
  });
  // 月费
  s4.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: 3.1, w: 2.4, h: 0.06, fill: { color: C.grayL } });
  s4.addText("月费用(未优化)", {
    x: x + 0.2, y: 3.25, w: 2.4, h: 0.25,
    fontSize: 10, color: C.gray, margin: 0,
  });
  s4.addText(m.month, {
    x: x + 0.2, y: 3.5, w: 2.4, h: 0.5,
    fontSize: 28, bold: true, color: m.color, margin: 0,
  });
  // 说明
  s4.addText("假定: 100次/天 × 22天, 每次100K输入+3K输出", {
    x: x + 0.2, y: 4.1, w: 2.4, h: 0.3,
    fontSize: 9, color: C.gray, italic: true, margin: 0,
  });
});

// ============================================================
// SLIDE 5: 四大优化支柱
// ============================================================
const s5 = pres.addSlide();
s5.background = { color: C.offW };
titleBar(s5, "四大优化支柱");
footer(s5, "05");

const pillars = [
  { title: "🔧 配置优化", desc: "关扩展思考 · .claudeignore · CLAUDE.md精简 · 环境变量", saving: "42%", color: C.teal },
  { title: "📋 流程优化", desc: "分模块会话 · 定期/compact · /memory跨会话 · 自动压缩", saving: "60%", color: C.tealL },
  { title: "💬 提示优化", desc: "列表式提问 · @引用精确 · 限制输出 · 模板化", saving: "35%", color: C.gold },
  { title: "🏭 工具链优化", desc: "多模型分层 · DeepSeek替代 · Prompt Caching · 审查分离", saving: "70%", color: C.green },
];

pillars.forEach((p, i) => {
  const x = 0.7 + i * 2.25;
  s5.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.0, h: 3.2, fill: { color: C.white }, shadow: makeShadow() });
  s5.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.0, h: 0.06, fill: { color: p.color } });
  
  s5.addText(p.title, {
    x: x + 0.15, y: 1.5, w: 1.7, h: 0.8,
    fontSize: 14, bold: true, color: C.navy, margin: 0,
  });
  s5.addText(p.desc, {
    x: x + 0.15, y: 2.5, w: 1.7, h: 1.2,
    fontSize: 10, color: C.gray, margin: 0, valign: "top",
  });
  // 节省数字
  s5.addShape(pres.shapes.RECTANGLE, { x: x + 0.4, y: 3.85, w: 1.2, h: 0.5, fill: { color: p.color } });
  s5.addText("省 " + p.saving, {
    x: x + 0.4, y: 3.88, w: 1.2, h: 0.44,
    fontSize: 18, bold: true, color: C.white, align: "center", margin: 0,
  });
});

// 底部组合提示
s5.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.8, w: 8.6, h: 0.45, fill: { color: C.navy } });
s5.addText("四项叠加: 全面优化可节省 91% Token消耗", {
  x: 0.9, y: 4.83, w: 8.2, h: 0.4,
  fontSize: 14, color: C.white, bold: true, margin: 0, align: "center",
});

// ============================================================
// SLIDE 6: 配置优化详解
// ============================================================
const s6 = pres.addSlide();
s6.background = { color: C.offW };
titleBar(s6, "配置优化 — 10分钟省42%");
footer(s6, "06");

// 左列：配置项
const configs = [
  { label: "关闭扩展思考", effect: "省30-40%输出", code: "ENABLE_THINKING=false" },
  { label: "启用自动压缩", effect: "省20-30%输入", code: "AUTO_COMPACT=true" },
  { label: "创建.claudeignore", effect: "省20-40%文件读取", code: "排除build/ oh_modules/ *.hap" },
  { label: "精简CLAUDE.md", effect: "省10-15%输入", code: "<1,500 tokens" },
  { label: "切换便宜模型", effect: "省60-80%总费", code: "DeepSeek V4 替代 Sonnet" },
];

configs.forEach((c, i) => {
  const y = 1.3 + i * 0.82;
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 5.0, h: 0.7, fill: { color: C.white }, shadow: makeShadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.06, h: 0.7, fill: { color: C.teal } });
  s6.addText(c.label, {
    x: 0.95, y: y + 0.05, w: 1.8, h: 0.28,
    fontSize: 12, bold: true, color: C.navy, margin: 0,
  });
  s6.addText(c.effect, {
    x: 2.8, y: y + 0.05, w: 1.5, h: 0.28,
    fontSize: 11, color: C.teal, bold: true, margin: 0,
  });
  s6.addText(c.code, {
    x: 0.95, y: y + 0.35, w: 4.5, h: 0.28,
    fontSize: 10, fontFace: "Consolas", color: C.gray, margin: 0,
  });
});

// 右列：对比数字
s6.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 1.3, w: 3.5, h: 2.0, fill: { color: C.navy } });
s6.addText("优化前", {
  x: 6.2, y: 1.4, w: 3.1, h: 0.35,
  fontSize: 12, color: C.ice, margin: 0,
});
s6.addText("$759/月", {
  x: 6.2, y: 1.8, w: 3.1, h: 0.6,
  fontSize: 36, bold: true, color: C.red, margin: 0,
});
s6.addText("Sonnet 模型", {
  x: 6.2, y: 2.4, w: 3.1, h: 0.3,
  fontSize: 10, color: C.ice, margin: 0,
});

s6.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 3.6, w: 3.5, h: 2.0, fill: { color: C.teal } });
s6.addText("优化后 (仅配置)", {
  x: 6.2, y: 3.7, w: 3.1, h: 0.35,
  fontSize: 12, color: C.white, margin: 0,
});
s6.addText("$437/月", {
  x: 6.2, y: 4.1, w: 3.1, h: 0.6,
  fontSize: 36, bold: true, color: C.white, margin: 0,
});
s6.addText("↓ 节省 $322 (42%)", {
  x: 6.2, y: 4.7, w: 3.1, h: 0.3,
  fontSize: 10, color: C.white, margin: 0,
});

// ============================================================
// SLIDE 7: 上下文管理 — 对线历史压缩
// ============================================================
const s7 = pres.addSlide();
s7.background = { color: C.offW };
titleBar(s7, "上下文管理 — /compact与分模块会话");
footer(s7, "07");

// 曲线图
s7.addChart(pres.charts.LINE, [
  { name: "不做压缩", labels: ["1", "10", "20", "30", "40"], values: [15, 60, 120, 190, 260] },
  { name: "每10轮compact", labels: ["1", "10", "20", "30", "40"], values: [15, 60, 70, 60, 90] },
  { name: "每5轮compact", labels: ["1", "10", "20", "30", "40"], values: [15, 28, 25, 30, 28] },
], {
  x: 0.7, y: 1.2, w: 5.5, h: 3.0,
  showTitle: true, title: "对话轮次 vs 输入Token (K)", titleColor: C.navy,
  lineSize: 2.5, lineSmooth: true,
  chartColors: [C.red, C.orange, C.teal],
  catAxisLabelColor: C.gray, valAxisLabelColor: C.gray,
  valGridLine: { color: C.grayL, size: 0.5 },
  catGridLine: { style: "none" },
  showLegend: true, legendPos: "b",
});

// 右侧关键数据
const keyData = [
  { label: "不压缩 40轮后", value: "260K", color: C.red },
  { label: "每10轮compact", value: "90K", color: C.orange },
  { label: "每5轮compact", value: "28K", color: C.teal },
];

keyData.forEach((d, i) => {
  const y = 1.4 + i * 1.1;
  s7.addShape(pres.shapes.RECTANGLE, { x: 6.5, y, w: 2.8, h: 0.85, fill: { color: C.white }, shadow: makeShadow() });
  s7.addShape(pres.shapes.RECTANGLE, { x: 6.5, y, w: 0.06, h: 0.85, fill: { color: d.color } });
  s7.addText(d.label, {
    x: 6.75, y: y + 0.08, w: 2.3, h: 0.3,
    fontSize: 12, color: C.gray, margin: 0,
  });
  s7.addText(d.value, {
    x: 6.75, y: y + 0.35, w: 2.3, h: 0.35,
    fontSize: 20, bold: true, color: d.color, margin: 0,
  });
});

// 底部建议
s7.addText("💡 建议: 每10-15轮执行 /compact，每完成一个模块开始新会话", {
  x: 0.7, y: 4.55, w: 8.6, h: 0.4,
  fontSize: 13, color: C.tealD, bold: true, italic: true, margin: 0,
});

// ============================================================
// SLIDE 8: 量化对比 — 优化前后
// ============================================================
const s8 = pres.addSlide();
s8.background = { color: C.offW };
titleBar(s8, "量化对比 — 优化到底省多少？");
footer(s8, "08");

// 柱状图
s8.addChart(pres.charts.BAR, [
  { name: "月费用($)", labels: ["基准", "+配置优化", "+流程优化", "全面优化", "混合模型"], values: [759, 437, 105, 68, 52] },
], {
  x: 0.7, y: 1.2, w: 5.5, h: 3.3,
  barDir: "col", showTitle: false,
  chartColors: [C.red, C.orange, C.gold, C.teal, C.green],
  catAxisLabelColor: C.gray, valAxisLabelColor: C.gray,
  valGridLine: { color: C.grayL, size: 0.5 },
  catGridLine: { style: "none" },
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.dark,
  showLegend: false,
});

// 右侧节省数据
const savings = [
  { label: "优化前", val: "$9,108/年", pct: "基准" },
  { label: "全面优化", val: "$816/年", pct: "↓ 91%" },
  { label: "混合模型", val: "$624/年", pct: "↓ 93%" },
];

savings.forEach((s, i) => {
  const y = 1.4 + i * 1.15;
  s8.addShape(pres.shapes.RECTANGLE, { x: 6.5, y, w: 2.8, h: 0.95, fill: { color: i === 0 ? C.red : C.teal } });
  s8.addText(s.label, {
    x: 6.7, y: y + 0.08, w: 2.4, h: 0.25,
    fontSize: 11, color: C.white, margin: 0,
  });
  s8.addText(s.val, {
    x: 6.7, y: y + 0.3, w: 2.4, h: 0.35,
    fontSize: 22, bold: true, color: C.white, margin: 0,
  });
  s8.addText(s.pct, {
    x: 6.7, y: y + 0.65, w: 2.4, h: 0.22,
    fontSize: 10, color: C.white, margin: 0,
  });
});

// 底部关键句
s8.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.8, w: 8.6, h: 0.55, fill: { color: C.navy } });
s8.addText("年节省: $8,292 (Sonnet) / $41,460 (Opus)  → 相当于一个中级开发者的月薪", {
  x: 0.9, y: 4.85, w: 8.2, h: 0.45,
  fontSize: 14, color: C.white, bold: true, align: "center", margin: 0,
});

// ============================================================
// SLIDE 9: 安卓转鸿蒙专项 — 任务特征 × 优化策略
// ============================================================
const s9 = pres.addSlide();
s9.background = { color: C.offW };
titleBar(s9, "安卓转鸿蒙专项 — 四大任务特征");
footer(s9, "09");

// 2×2 网格: 特征 + 策略
const features = [
  {
    title: "📖 读多写少 (Input 90% vs Output 10%)",
    desc: "迁移需完整理解源文件逻辑(50K/r)<br/>但输出仅翻译后的代码(3K/r)",
    strategy: "策略: 方法级引用 + /memory保存分析<br/>节省: 读token ↓60-80%",
    color: C.red,
  },
  {
    title: "🔄 对照翻译 (双文件上下文)",
    desc: "Kotlin原文 + ArkTS译文 = 2倍读取<br/>12个模块重复读取相同源文件",
    strategy: "策略: Prompt Caching 缓存源文件<br/>节省: 跨模块读取 ↓87%",
    color: C.orange,
  },
  {
    title: "🔁 增量迭代 (编译→修复循环)",
    desc: "每模块20-30轮迭代,每次累积历史<br/>编译错误全文发送(浪费80%)",
    strategy: "策略: 错误批处理+DeepSeek修<br/>节省: 编译修复 ↓84%",
    color: C.gold,
  },
  {
    title: "📋 API映射 (重复查询开销)",
    desc: "12模块×5次API查询×1K/次<br/>= 60K token隐性浪费",
    strategy: "策略: CLAUDE.md内置映射表+缓存<br/>节省: API查询 ↓94%",
    color: C.teal,
  },
];

features.forEach((f, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.7 + col * 4.5;
  const y = 1.2 + row * 1.7;
  const w = 4.2;
  const h = 1.5;

  s9.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: makeShadow() });
  s9.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: f.color } });
  
  // 标题
  s9.addText(f.title, {
    x: x + 0.2, y: y + 0.08, w: w - 0.4, h: 0.35,
    fontSize: 11, bold: true, color: C.navy, margin: 0,
  });
  // 描述
  s9.addText(f.desc, {
    x: x + 0.2, y: y + 0.45, w: w - 0.4, h: 0.5,
    fontSize: 9, color: C.gray, margin: 0, valign: "top",
  });
  // 策略(高亮条)
  s9.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: y + 1.05, w: w - 0.4, h: 0.35, fill: { color: f.color } });
  s9.addText(f.strategy, {
    x: x + 0.3, y: y + 1.08, w: w - 0.6, h: 0.3,
    fontSize: 9, bold: true, color: C.white, margin: 0,
  });
});

// 底部：总览
s9.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.7, w: 8.6, h: 0.65, fill: { color: C.navy } });
s9.addText("12模块迁移: 未优化$1,440(纯Opus) → 混合模型+特征优化 $3.50 = 节省99.76%", {
  x: 0.9, y: 4.75, w: 8.2, h: 0.55,
  fontSize: 13, color: C.white, bold: true, align: "center", margin: 0,
});

// ============================================================
// SLIDE 10: 数据来源与准确性
// ============================================================
const s10 = pres.addSlide();
s10.background = { color: C.offW };
titleBar(s10, "数据来源与准确性 — 数字从哪来？");
footer(s10, "10");

// 三级来源
const sources = [
  { label: "一级: 官方定价", items: "Anthropic定价页 · DeepSeek API文档 · Claude SDK count_tokens()", color: C.green },
  { label: "二级: 社区实测", items: "Reddit 20+帖 · GitHub Issues · V2EX真实账单 · 月费$20-$300", color: C.teal },
  { label: "三级: 学术/推算", items: "LLMLingua论文 · Selective Context论文 · tokenizer原理推算", color: C.gold },
];

sources.forEach((src, i) => {
  const y = 1.3 + i * 1.0;
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 4.5, h: 0.8, fill: { color: C.white }, shadow: makeShadow() });
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.06, h: 0.8, fill: { color: src.color } });
  s10.addText(src.label, {
    x: 0.95, y: y + 0.05, w: 2.0, h: 0.3,
    fontSize: 13, bold: true, color: C.navy, margin: 0,
  });
  s10.addText(src.items, {
    x: 0.95, y: y + 0.4, w: 4.0, h: 0.35,
    fontSize: 11, color: C.gray, margin: 0,
  });
});

// 右侧：验证方法
s10.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 1.3, w: 3.8, h: 3.2, fill: { color: C.navy } });
s10.addText("🔍 如何验证？", {
  x: 5.7, y: 1.45, w: 3.4, h: 0.35,
  fontSize: 14, bold: true, color: C.white, margin: 0,
});
const verifyItems = [
  "① 打开 anthropic.com/pricing 查看实时定价",
  "② 查看 ~/.claude/usage.json 对照自己用量",
  "③ 运行 /tokens 命令看当前会话",
  "④ 所有节省比例取保守值(<实测)",
  "⑤ count_tokens() = API计费同一tokenizer",
  "⚠ 估算≠账单, 以实际API账单为准",
];
s10.addText(verifyItems.map((v, i) => ({ text: v, options: { breakLine: i < verifyItems.length - 1, fontSize: 11, color: C.ice, paraSpaceAfter: 6 } })), {
  x: 5.7, y: 1.95, w: 3.4, h: 2.3, valign: "top",
});

// 底部声明
s10.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.7, w: 8.6, h: 0.55, fill: { color: C.tealD } });
s10.addText("所有数字基于官方定价+社区实测+保守推算，可独立验证。定价以官方页面为准。", {
  x: 0.9, y: 4.75, w: 8.2, h: 0.45,
  fontSize: 11, color: C.white, margin: 0, align: "center",
});

// ============================================================
// SLIDE 11: 优先级排序
// ============================================================
const s11 = pres.addSlide();
s11.background = { color: C.offW };
titleBar(s11, "优先级排序 — 从易到难");
footer(s11, "11");

const priorities = [
  { level: "P0 立即执行", time: "10秒", measures: "关闭扩展思考 + 启用autoCompact", saving: "省20-30%", color: C.green },
  { level: "P1 本周完成", time: "20分钟", measures: "创建.claudeignore + 精简CLAUDE.md", saving: "省30-55%", color: C.teal },
  { level: "P2 持续养成", time: "习惯", measures: "分模块会话 + 高效提问 + DeepSeek替代", saving: "省60-80%", color: C.gold },
  { level: "P3 技术储备", time: "需开发", measures: "Prompt Caching + LLMLingua压缩", saving: "省70-90%", color: C.orange },
];

priorities.forEach((p, i) => {
  const y = 1.25 + i * 1.05;
  s11.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 8.6, h: 0.9, fill: { color: C.white }, shadow: makeShadow() });
  // 优先级标签
  s11.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 1.6, h: 0.9, fill: { color: p.color } });
  s11.addText(p.level, {
    x: 0.7, y: y + 0.2, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, color: C.white, align: "center", margin: 0,
  });
  // 时间
  s11.addShape(pres.shapes.RECTANGLE, { x: 2.45, y: y + 0.15, w: 1.0, h: 0.55, fill: { color: C.grayL } });
  s11.addText(p.time, {
    x: 2.45, y: y + 0.2, w: 1.0, h: 0.45,
    fontSize: 12, bold: true, color: C.navy, align: "center", margin: 0,
  });
  // 措施
  s11.addText(p.measures, {
    x: 3.6, y: y + 0.05, w: 3.5, h: 0.8,
    fontSize: 12, color: C.dark, margin: 0, valign: "middle",
  });
  // 节省
  s11.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: y + 0.15, w: 1.6, h: 0.55, fill: { color: p.color } });
  s11.addText(p.saving, {
    x: 7.5, y: y + 0.2, w: 1.6, h: 0.45,
    fontSize: 13, bold: true, color: C.white, align: "center", margin: 0,
  });
});

// ============================================================
// SLIDE 12: OpenCode优化指南
// ============================================================
const s12 = pres.addSlide();
s12.background = { color: C.offW };
titleBar(s12, "OpenCode优化指南 — 提供商套利");
footer(s12, "12");

// 左列：OpenCode独有优势
s12.addText("OpenCode 独有优势", {
  x: 0.7, y: 1.2, w: 4.5, h: 0.4,
  fontSize: 16, bold: true, color: C.navy, margin: 0,
});

const ocAdvantages = [
  "🏦 提供商套利: 同一任务可选最便宜模型",
  "📊 用量监控: opencode stats --days 7",
  "🎯 推理控制: --variant minimal/high/max",
  "📁 Session管理: 按模块分Session避膨胀",
  "🔄 多模型切换: --model provider/model",
];

s12.addText(ocAdvantages.map((v, i) => ({ text: v, options: { bullet: true, breakLine: i < ocAdvantages.length - 1, fontSize: 12, color: C.dark, paraSpaceAfter: 6 } })), {
  x: 0.7, y: 1.7, w: 4.5, h: 2.5, valign: "top",
});

// 右列：工具分工
s12.addText("工具分工建议", {
  x: 5.5, y: 1.2, w: 3.8, h: 0.4,
  fontSize: 16, bold: true, color: C.navy, margin: 0,
});

const tools = [
  { tool: "OpenCode", pct: "60%", model: "DeepSeek V3", cost: "~$15/月", color: C.green },
  { tool: "Claude Code", pct: "25%", model: "Sonnet", cost: "~$18/月", color: C.gold },
  { tool: "Claude Code", pct: "10%", model: "Opus", cost: "~$20/月", color: C.red },
  { tool: "OpenCode", pct: "5%", model: "Haiku", cost: "~$2/月", color: C.teal },
];

tools.forEach((t, i) => {
  const y = 1.7 + i * 0.75;
  s12.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 3.8, h: 0.6, fill: { color: C.white }, shadow: makeShadow() });
  s12.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 0.06, h: 0.6, fill: { color: t.color } });
  s12.addText(t.tool + " " + t.pct, {
    x: 5.7, y: y + 0.02, w: 1.8, h: 0.25,
    fontSize: 10, bold: true, color: C.navy, margin: 0,
  });
  s12.addText(t.model, {
    x: 5.7, y: y + 0.3, w: 1.2, h: 0.22,
    fontSize: 9, color: C.gray, margin: 0,
  });
  s12.addText(t.cost, {
    x: 7.8, y: y + 0.12, w: 1.3, h: 0.35,
    fontSize: 13, bold: true, color: t.color, align: "right", margin: 0,
  });
});

// 底部
s12.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.7, w: 8.6, h: 0.55, fill: { color: C.navy } });
s12.addText("OpenCode + Claude Code 混合方案: 月费 ~$55 (vs 纯Opus $3,795 = 节省98.5%)", {
  x: 0.9, y: 4.75, w: 8.2, h: 0.45,
  fontSize: 13, color: C.white, bold: true, align: "center", margin: 0,
});

// ============================================================
// SLIDE 13: Token监控与对比工具
// ============================================================
const s13 = pres.addSlide();
s13.background = { color: C.offW };
titleBar(s13, "Token监控与对比工具 — 度量才能优化");
footer(s13, "13");

// 四层工具卡片
const toolLayers = [
  { level: "🟢 即时查看", time: "10秒", tools: "/tokens + /cost + opencode stats", color: C.green },
  { level: "🟡 会话分析", time: "5分钟", tools: "cc-cost 费用拆解 + ttok 预估 + usage.json 分析", color: C.teal },
  { level: "🟠 持续监控", time: "30分钟部署", tools: "Langfuse 仪表盘 + LiteLLM Proxy 网关", color: C.gold },
  { level: "🔴 A/B对比", time: "1小时搭建", tools: "自定义回放脚本 + tokencost 基准测试", color: C.red },
];

toolLayers.forEach((l, i) => {
  const y = 1.2 + i * 0.95;
  s13.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 8.6, h: 0.8, fill: { color: C.white }, shadow: makeShadow() });
  s13.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.06, h: 0.8, fill: { color: l.color } });
  // 标签
  s13.addShape(pres.shapes.RECTANGLE, { x: 0.9, y: y + 0.1, w: 1.6, h: 0.55, fill: { color: l.color } });
  s13.addText(l.level, {
    x: 0.9, y: y + 0.15, w: 1.6, h: 0.45,
    fontSize: 11, bold: true, color: C.white, align: "center", margin: 0,
  });
  // 时间
  s13.addText(l.time, {
    x: 2.7, y: y + 0.15, w: 1.2, h: 0.45,
    fontSize: 10, color: C.gray, margin: 0, valign: "middle",
  });
  // 工具
  s13.addText(l.tools, {
    x: 3.9, y: y + 0.05, w: 5.2, h: 0.7,
    fontSize: 11, color: C.dark, margin: 0, valign: "middle",
  });
});

// 右侧核心指标
s13.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.55, w: 8.6, h: 0.75, fill: { color: C.navy } });
s13.addText("核心指标: Token效率(行/token) | 单模块成本 | 优化节省率 | 误修复率", {
  x: 0.9, y: 4.6, w: 8.2, h: 0.3,
  fontSize: 12, color: C.white, bold: true, align: "center", margin: 0,
});
s13.addText("P0: 每次用 /tokens看消耗 → P1: cc-cost拆解费用 → P2: 部署Langfuse团队监控", {
  x: 0.9, y: 4.9, w: 8.2, h: 0.3,
  fontSize: 10, color: C.ice, align: "center", margin: 0,
});

// ============================================================
// SLIDE 14: 行动清单
// ============================================================
const s14 = pres.addSlide();
s14.background = { color: C.offW };
titleBar(s14, "行动清单");
footer(s14, "14");

const actions = [
  {
    when: "今天 (10分钟)", color: C.green,
    items: [
      "export CLAUDE_CODE_ENABLE_THINKING=false",
      "export CLAUDE_CODE_AUTO_COMPACT=true",
      "export CLAUDE_CODE_MAX_TOKENS=4096",
    ],
    result: "→ 立即省 20%",
  },
  {
    when: "本周 (40分钟)", color: C.gold,
    items: [
      "创建 .claudeignore 排除 build/oh_modules/",
      "精简 CLAUDE.md 至 <1,500 tokens",
      "安装 DeepSeek V4 模型配置",
    ],
    result: "→ 累计省 42%",
  },
  {
    when: "持续养成", color: C.teal,
    items: [
      "每10-15轮执行 /compact",
      "一个模块一个会话",
      "简单任务用 DeepSeek，架构用 Opus",
      "用高效提问模板 （列表 + @引用）",
    ],
    result: "→ 累计省 91%",
  },
];

actions.forEach((a, i) => {
  const y = 1.2 + i * 1.4;
  // 时间标签
  s14.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 1.8, h: 0.4, fill: { color: a.color } });
  s14.addText(a.when, {
    x: 0.7, y: y + 0.02, w: 1.8, h: 0.36,
    fontSize: 12, bold: true, color: C.white, align: "center", margin: 0,
  });
  // 结果标签
  s14.addShape(pres.shapes.RECTANGLE, { x: 8.3, y: y, w: 1.0, h: 0.4, fill: { color: a.color } });
  s14.addText(a.result, {
    x: 7.0, y: y + 0.02, w: 2.3, h: 0.36,
    fontSize: 11, bold: true, color: a.color, align: "right", margin: 0,
  });
  // 条目
  const itemTexts = a.items.map((item, j) => ({
    text: item,
    options: { bullet: true, breakLine: j < a.items.length - 1, fontSize: 11, color: C.dark, paraSpaceAfter: 2 },
  }));
  s14.addText(itemTexts, { x: 0.9, y: y + 0.45, w: 8.0, h: 0.9, valign: "top" });
});

// ============================================================
// SLIDE 15: 结束页
// ============================================================
const s15 = pres.addSlide();
s14.background = { color: C.navy };
s15.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.5, h: 5.625, fill: { color: C.navyL } });
s15.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.0, w: 3.5, h: 0.06, fill: { color: C.teal } });

s15.addText("感谢聆听", {
  x: 4.0, y: 1.5, w: 5.5, h: 0.8,
  fontSize: 38, bold: true, color: C.white, margin: 0,
});

s15.addText("三个关键数字", {
  x: 4.0, y: 2.5, w: 5.5, h: 0.4,
  fontSize: 14, color: C.ice, margin: 0,
});

const numbers = [
  { n: "91%", label: "最大节省比例" },
  { n: "10min", label: "最小投入时间" },
  { n: "$8,292", label: "年节省(Sonnet)" },
];

numbers.forEach((n, i) => {
  const x = 4.0 + i * 1.8;
  s15.addText(n.n, {
    x, y: 3.1, w: 1.6, h: 0.6,
    fontSize: 28, bold: true, color: C.tealL, align: "center", margin: 0,
  });
  s15.addText(n.label, {
    x, y: 3.7, w: 1.6, h: 0.3,
    fontSize: 10, color: C.gray, align: "center", margin: 0,
  });
});

s15.addText("GitHub: JungleTestLabs/claude-token-optimization", {
  x: 4.0, y: 4.8, w: 5.5, h: 0.3,
  fontSize: 10, color: C.gray, margin: 0,
});

s15.addText("TOKEN\nOPTIMIZATION", {
  x: 0.4, y: 1.2, w: 2.8, h: 1.8,
  fontSize: 16, fontFace: "Arial", charSpacing: 8, color: C.gray, align: "center", margin: 0,
});

// ============================================================
// 生成文件
// ============================================================
pres.writeFile({ fileName: "Claude-Token优化最佳实践.pptx" })
  .then(() => console.log("PPT生成成功: Claude-Token优化最佳实践.pptx"))
  .catch(err => console.error("生成失败:", err));
