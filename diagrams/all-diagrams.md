# 图表汇总

> 项目中所有Mermaid图表的集中展示页面，便于宣讲时使用。

---

## 1. Token消耗全景流程

```mermaid
flowchart TB
    subgraph INPUT["📥 输入Token (Input) — $3/MTok"]
        SP["系统提示词 System Prompt<br/>(每次会话固定 ~2K-8K tokens)"]
        CP["项目上下文 CLAUDE.md<br/>(自定义, 通常 0.5K-3K tokens)"]
        FC["文件内容 File Context<br/>(@file读取, 10K-100K+ tokens) ⚠️最大消耗源"]
        CH["对话历史 Chat History<br/>(累积增长, 50K-200K+ tokens) ⚠️沉默杀手"]
        TD["工具定义 Tool Definitions<br/>(固定 ~2K-5K tokens)"]
    end
    
    subgraph OUTPUT["📤 输出Token (Output) — $15/MTok"]
        RT["回答文本 Response Text<br/>(每次 0.5K-5K tokens)"]
        TC["工具调用 Tool Calls<br/>(每次 0.2K-1K tokens)"]
        ET["扩展思考 Extended Thinking<br/>(可翻倍输出!) ⚠️"]
    end
    
    INPUT --> Claude
    Claude --> OUTPUT
    
    style INPUT fill:#e3f2fd,stroke:#1565c0
    style OUTPUT fill:#fce4ec,stroke:#c62828
    style FC fill:#ffcdd2
    style CH fill:#ffcdd2
    style ET fill:#ffcdd2
```

---

## 2. 优化路径图

```mermaid
flowchart LR
    Start["🚀 现在: $759/月"] --> S1["第1步: 立即实施"]
    S1 --> S2["第2步: 本周内"]
    S2 --> S3["第3步: 持续优化"]
    
    subgraph S1["10分钟"]
        A["export ENABLE_THINKING=false<br/>export AUTO_COMPACT=true<br/>→ $614/月 (-19%)"]
    end
    
    subgraph S2["40分钟"]
        B["创建 .claudeignore<br/>精简 CLAUDE.md<br/>→ $437/月 (-42%)"]
    end
    
    subgraph S3["习惯养成"]
        C["分模块会话<br/>高效提问<br/>任务分层<br/>→ $68/月 (-91%)"]
    end
    
    style S1 fill:#c8e6c9
    style S2 fill:#fff9c4
    style S3 fill:#ffccbc
```

---

## 3. 对话历史增长曲线

```mermaid
xychart-beta
    title "对话轮次 vs 输入Token消耗"
    x-axis "对话轮次" [1, 5, 10, 15, 20, 25, 30, 35, 40]
    y-axis "输入Token (K)" 0 --> 260
    line "不做压缩" [15, 35, 60, 90, 120, 155, 190, 225, 260]
    line "每10轮compact" [15, 35, 60, 55, 70, 85, 60, 75, 90]
    line "每5轮compact" [15, 25, 28, 30, 25, 28, 30, 25, 28]
```

---

## 4. 优化潜力矩阵

```mermaid
quadrantChart
    title 优化潜力 vs 实施难度
    x-axis "实施难度 低 → 高"
    y-axis "节省潜力 小 → 大"
    quadrant-1 "⭐ 优先执行"
    quadrant-2 "值得投入"
    quadrant-3 "低优先级"
    quadrant-4 "快速胜利"
    "文件读取优化": [0.3, 0.9]
    "/compact 定期压缩": [0.15, 0.7]
    "关闭扩展思考": [0.1, 0.50]
    "CLAUDE.md 精简": [0.2, 0.5]
    "Prompt Caching": [0.7, 0.85]
    "分模块会话": [0.4, 0.75]
    "系统提示词精简": [0.6, 0.3]
    "工具定义优化": [0.8, 0.2]
```

---

## 5. 业界工具策略映射

```mermaid
graph TB
    subgraph "Cursor 策略"
        C1["代码库嵌入索引"]
        C2["语义搜索精准匹配"]
        C3["@引用精确控制"]
        C1 --> C2 --> C3
    end
    
    subgraph "Aider 策略"
        A1["Repo Map廉价扫描"]
        A2["按需加载相关文件"]
        A3["Search/Replace编辑块"]
        A1 --> A2 --> A3
    end
    
    subgraph "Copilot 策略"
        G1["Fill-in-Middle格式"]
        G2["只发送邻近文件"]
        G3["缓存编码表示"]
        G1 --> G2 --> G3
    end
    
    subgraph "推荐 Claude Code 策略"
        R1["分层文件加载<br/>≈ Cursor + Aider"]
        R2["关键区优先<br/>≈ Aider + Copilot"]
        R3["增量编辑+分离审查<br/>≈ Aider"]
        C3 --> R1
        A2 --> R2
        A3 --> R3
    end
    
    style R1 fill:#e8f5e9
    style R2 fill:#e8f5e9
    style R3 fill:#e8f5e9
```

---

## 6. 安卓转鸿蒙工作流

```mermaid
flowchart TD
    Prep["📋 准备工作(1次)"]
    Prep --> A["建立API映射表<br/>创建CLAUDE.md<br/>配置.claudeignore"]
    
    A --> M1["📱 模块1: 登录"]
    A --> M2["🏠 模块2: 首页"]
    A --> Mn["⚙️ 模块N: 设置"]
    
    M1 --> M1S1["会话1.1: UI迁移<br/>模型: DeepSeek V4<br/><30轮"]
    M1S1 --> M1compact["/compact"]
    M1compact --> M1S2["会话1.2: 逻辑+网络<br/>模型: Sonnet<br/><30轮"]
    M1S2 --> M1memory["/memory 保存模块约定"]
    
    M1memory --> M_review["🔍 集成审查<br/>Haiku审查 + DeepSeek修改"]
    
    style M1 fill:#bbdefb
    style M2 fill:#bbdefb
    style Mn fill:#bbdefb
    style M_review fill:#c8e6c9
```

---

## 7. 模型选择决策树

```mermaid
flowchart TD
    Task["❓ 这是什么任务?"]
    
    Task -->|"简单/重复<br/>格式化/重命名/注释"| Haiku["Claude Haiku<br/>成本: $0.01-0.05"]
    Task -->|"日常开发<br/>UI/逻辑/网络"| DS["DeepSeek V4<br/>成本: $0.02-0.10"]
    Task -->|"复杂开发<br/>状态管理/API集成"| Sonnet["Claude Sonnet<br/>成本: $0.10-0.50"]
    Task -->|"架构设计<br/>关键决策/审查"| Opus["Claude Opus<br/>成本: $0.50-3.00"]
    
    style Haiku fill:#e8f5e9
    style DS fill:#c8e6c9
    style Sonnet fill:#fff9c4
    style Opus fill:#ffccbc
```

---

## 8. Token消耗构成饼图

```mermaid
pie title 典型Claude Code会话Token构成
    "文件读取(45%)" : 45
    "对话历史(30%)" : 30
    "系统提示词(12%)" : 12
    "输出回答(8%)" : 8
    "工具定义(5%)" : 5
```
