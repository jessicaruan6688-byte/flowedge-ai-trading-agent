export type AppLanguage = "en" | "zh";

export const defaultLanguage: AppLanguage = "zh";

const translations = {
  en: {
    /* ---------- Language switcher ---------- */
    "language.switch": "Switch language",
    "language.next": "中文",

    /* ---------- Brand / Header ---------- */
    "brand.name": "flowEdge",
    "brand.nameShort": "flowEdge",
    "shell.subtitle": "AI Master Investor Tribunal",
    "header.reviewConsole": "Trading Desk",
    "header.operational": "Live",
    "header.notifications": "Notifications",
    "header.operatorWorkspace": "flowEdge Trading",
    "header.portfolioValue": "Portfolio",

    /* ---------- Navigation (matches navigation.ts) ---------- */
    "nav.workspace": "Trading Desk",
    "nav.court": "Courtroom",
    "nav.cases": "Case Files",
    "nav.memory": "Masters",
    "nav.trace": "Trace",
    "nav.settings": "Settings",

    /* ---------- Shell ---------- */
    "shell.skip": "Skip to content",
    "shell.reasoning": "5 Masters Debate",

    /* Sidebar feature bullets (bottom hints) */
    "shell.feature.debate": "5 Masters Debate",
    "shell.feature.precedent": "Track Record Learning",
    "shell.feature.judgeRisk": "Risk-First Verdict",

    /* ---------- Trial / Courtroom terminology ---------- */
    "trial.filed": "Filing",
    "trial.evidentiary": "Discovery",
    "trial.bullArguing": "Buffett",
    "trial.bearArguing": "Soros",
    "trial.precedentSearch": "Precedent Search",
    "trial.judging": "Verdict",
    "trial.executed": "Execution",
    "trial.archived": "Track Record Updated",

    /* Roles */
    "role.buffett": "Warren Buffett",
    "role.soros": "George Soros",
    "role.dalio": "Ray Dalio",
    "role.lynch": "Peter Lynch",
    "role.livermore": "Jesse Livermore",
    "role.pm": "Portfolio Manager",
    "role.risk": "Risk Manager",
    "role.reviewer": "Reviewer",

    /* Verdicts */
    "verdict.BUY": "BUY",
    "verdict.SELL": "SELL",
    "verdict.REJECT": "DISMISSED",
    "verdict.REDUCE_POSITION": "REDUCE",

    /* Modes */
    "mode.Spot": "Spot HK",
    "mode.Swing": "Swing",
    "mode.Event": "Event Driven",
    "mode.Sentiment": "Sentiment",

  },
  zh: {
    /* ---------- 语言切换 ---------- */
    "language.switch": "切换语言",
    "language.next": "EN",

    /* ---------- 品牌 / 头部 ---------- */
    "brand.name": "flowEdge",
    "brand.nameShort": "flowEdge",
    "shell.subtitle": "AI 投资大师审判团",
    "header.reviewConsole": "交易台",
    "header.operational": "运行中",
    "header.notifications": "通知",
    "header.operatorWorkspace": "flowEdge 交易",
    "header.portfolioValue": "组合净值",

    /* ---------- 导航（与 navigation.ts 一致） ---------- */
    "nav.workspace": "交易台",
    "nav.court": "分析庭",
    "nav.cases": "交易卷宗",
    "nav.memory": "大师战绩",
    "nav.trace": "调用溯源",
    "nav.settings": "设置",

    /* ---------- Shell ---------- */
    "shell.skip": "跳到内容区",
    "shell.reasoning": "五位大师辩论",

    /* 侧边栏底部特性列表 */
    "shell.feature.debate": "五位大师辩论",
    "shell.feature.precedent": "战绩学习进化",
    "shell.feature.judgeRisk": "风控优先裁决",

    /* ---------- 庭审术语 ---------- */
    "trial.filed": "立案",
    "trial.evidentiary": "证据开示",
    "trial.bullArguing": "巴菲特",
    "trial.bearArguing": "索罗斯",
    "trial.precedentSearch": "判例检索",
    "trial.judging": "裁决",
    "trial.executed": "执行",
    "trial.archived": "战绩更新",

    /* 角色 */
    "role.buffett": "沃伦·巴菲特",
    "role.soros": "乔治·索罗斯",
    "role.dalio": "瑞·达利欧",
    "role.lynch": "彼得·林奇",
    "role.livermore": "杰西·利弗莫尔",
    "role.pm": "组合经理",
    "role.risk": "风控官",
    "role.reviewer": "复核员",

    /* 裁决 */
    "verdict.BUY": "做多",
    "verdict.SELL": "做空",
    "verdict.REJECT": "驳回",
    "verdict.REDUCE_POSITION": "减仓",

    /* 模式 */
    "mode.Spot": "港股现货",
    "mode.Swing": "波段",
    "mode.Event": "事件驱动",
    "mode.Sentiment": "情绪",

  },
} as const;

export type I18nKey = keyof typeof translations.en;

export function translate(language: AppLanguage, key: I18nKey) {
  return translations[language][key] ?? translations.en[key];
}

export function parseLanguage(value: string | null | undefined): AppLanguage {
  return value === "zh" || value === "en" ? value : defaultLanguage;
}
