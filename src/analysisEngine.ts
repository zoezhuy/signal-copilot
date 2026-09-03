import type { AnalysisResult, Language, Mode, ReadLevel, Signal } from "./types";

type Tone = "positive" | "risk";

type Rule = {
  id: string;
  tone: Tone;
  terms: string[];
  title: Record<Language, string>;
};

const sharedCandidateRules: Rule[] = [
  {
    id: "next-step",
    tone: "positive",
    terms: ["next round", "final round", "next step", "schedule", "calendar invite", "下一轮", "终面", "下一步", "安排面试", "日历邀请"],
    title: { en: "A concrete next step is named", zh: "明确给出下一步安排" },
  },
  {
    id: "positive-feedback",
    tone: "positive",
    terms: ["impressed", "great feedback", "strong feedback", "very positive", "表现非常满意", "反馈很好", "评价积极"],
    title: { en: "Positive interview feedback", zh: "收到积极面试反馈" },
  },
  {
    id: "timeline",
    tone: "positive",
    terms: ["tomorrow", "this week", "next week", "monday", "tuesday", "wednesday", "thursday", "friday", "明天", "本周", "这周", "下周", "周一", "周二", "周三", "周四", "周五"],
    title: { en: "A timeline is provided", zh: "沟通中包含具体时间" },
  },
  {
    id: "vague-wait",
    tone: "risk",
    terms: ["no firm timeline", "still interviewing", "on hold", "keep you posted", "no update", "没有确定的时间", "还没走完", "暂停招聘", "有进展会", "暂时没有进展"],
    title: { en: "The process or timeline remains uncertain", zh: "流程或时间安排仍不确定" },
  },
  {
    id: "rejection",
    tone: "risk",
    terms: ["another candidate", "not move forward", "won't be moving forward", "closer match", "position has been filled", "另一位候选人", "不再推进", "更匹配", "岗位已关闭", "遗憾通知"],
    title: { en: "Explicit rejection or closure language", zh: "出现明确拒绝或流程结束表述" },
  },
  {
    id: "delayed-response",
    tone: "risk",
    terms: ["days later", "haven't heard back", "no reply", "followed up twice", "多天后", "一直没有回复", "未收到回复", "跟进了两次"],
    title: { en: "Possible response-delay signal", zh: "可能存在回复延迟信号" },
  },
];

const sharedRecruiterRules: Rule[] = [
  {
    id: "enthusiasm",
    tone: "positive",
    terms: ["excited", "looking forward", "happy to join", "很期待", "非常期待", "愿意加入", "很感兴趣"],
    title: { en: "The candidate expresses clear enthusiasm", zh: "候选人明确表达积极意愿" },
  },
  {
    id: "acceptance",
    tone: "positive",
    terms: ["accept the offer", "ready to sign", "sign this week", "confirm my start", "接受 offer", "接受offer", "可以签约", "确认入职", "这周就能签"],
    title: { en: "Acceptance or signing intent is explicit", zh: "候选人明确表达接受或签约意愿" },
  },
  {
    id: "competing-offer",
    tone: "risk",
    terms: ["another offer", "competing offer", "other opportunity", "另一个 offer", "另一个offer", "其他 offer", "竞品 offer", "其他机会"],
    title: { en: "A competing opportunity is mentioned", zh: "候选人提及竞争 Offer 或其他机会" },
  },
  {
    id: "compensation",
    tone: "risk",
    terms: ["salary is lower", "compensation concern", "base salary", "expected salary", "薪资偏低", "薪资顾虑", "基本工资", "期望薪资", "待遇"],
    title: { en: "Compensation may be a decision factor", zh: "薪资可能影响候选人决策" },
  },
  {
    id: "decision-delay",
    tone: "risk",
    terms: ["need more time", "think it through", "talk with my family", "not ready to decide", "再考虑", "需要更多时间", "和家人商量", "还不能决定"],
    title: { en: "The candidate is not ready to commit", zh: "候选人尚未准备作出承诺" },
  },
  {
    id: "start-date",
    tone: "risk",
    terms: ["unsure when i can start", "start date is uncertain", "can't confirm a start date", "入职时间不确定", "无法确认入职", "还不能确定入职", "延后入职"],
    title: { en: "The start date is uncertain", zh: "候选人入职时间尚不确定" },
  },
  {
    id: "withdrawal",
    tone: "risk",
    terms: ["decline the offer", "withdraw", "no longer interested", "拒绝 offer", "拒绝offer", "退出流程", "不再考虑", "放弃这个机会"],
    title: { en: "Withdrawal or decline language is present", zh: "出现退出流程或拒绝 Offer 的表述" },
  },
];

function sentences(input: string) {
  return input
    .split(/(?<=[.!?。！？])|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function findEvidence(input: string, terms: string[]) {
  const segments = sentences(input);
  return segments.find((segment) => terms.some((term) => segment.toLowerCase().includes(term.toLowerCase()))) ?? input.slice(0, 140);
}

function followUps(language: Language, mode: Mode, level: ReadLevel, noEvidence: boolean) {
  if (noEvidence) {
    return language === "zh"
      ? ["补充包含时间、下一步安排或决策顾虑的上下文。", "核对说话人身份，并保留消息先后顺序。", "不要仅凭一段简短消息作出招聘决定。"]
      : ["Add context that includes timing, next steps, or decision concerns.", "Identify the speaker and keep messages in chronological order.", "Do not make a recruiting decision from one short message alone."];
  }

  if (mode === "candidate") {
    if (level === "positive") {
      return language === "zh"
        ? ["在 24 小时内确认下一步安排。", "针对下一轮沟通准备具体问题。", "继续推进其他机会，避免把单一信号视为承诺。"]
        : ["Confirm the next step within 24 hours.", "Prepare focused questions for the next conversation.", "Keep other opportunities moving; a positive signal is not a guarantee."];
    }
    return language === "zh"
      ? ["礼貌询问明确的下一步和预计时间。", "重申兴趣，但避免高频催促。", "继续推进其他机会并设置一次合理的跟进提醒。"]
      : ["Ask politely for a concrete next step and expected timing.", "Reconfirm interest without repeated pressure.", "Keep other opportunities active and schedule one reasonable follow-up."];
  }

  if (level === "positive") {
    return language === "zh"
      ? ["及时确认合同、入职日期和待解决问题。", "邀请用人经理进行一次有温度的跟进。", "继续开放提问渠道，不把积极表达等同于最终签约。"]
      : ["Confirm the contract, start date, and open questions promptly.", "Invite the hiring manager to make a warm follow-up.", "Keep questions welcome; enthusiasm is not the same as a signed offer."];
  }
  return language === "zh"
    ? ["直接询问影响决策的首要因素。", "明确双方可接受的答复时间，不进行不必要施压。", "根据候选人的实际顾虑协调薪资、时间或团队沟通。"]
    : ["Ask which factor matters most to the decision.", "Agree on a response date without unnecessary pressure.", "Address the real concern through compensation, timing, or team access."];
}

export function analyzeConversation(input: string, language: Language, mode: Mode): AnalysisResult {
  const rules = mode === "candidate" ? sharedCandidateRules : sharedRecruiterRules;
  const matched = rules.filter((rule) => rule.terms.some((term) => input.toLowerCase().includes(term.toLowerCase())));
  const positives: Signal[] = matched
    .filter((rule) => rule.tone === "positive")
    .map((rule) => ({ title: rule.title[language], evidence: `“${findEvidence(input, rule.terms)}”` }));
  const risks: Signal[] = matched
    .filter((rule) => rule.tone === "risk")
    .map((rule) => ({ title: rule.title[language], evidence: `“${findEvidence(input, rule.terms)}”` }));
  const severeRisk = matched.some((rule) => rule.id === "rejection" || rule.id === "withdrawal");
  const noEvidence = matched.length === 0;
  const readLevel: ReadLevel = severeRisk || risks.length > positives.length ? "high-risk" : risks.length > 0 || noEvidence ? "moderate" : "positive";
  const confidence = noEvidence ? 18 : Math.min(92, 38 + matched.length * 12 + Math.min(18, sentences(input).length * 3));

  const headlines: Record<Language, Record<ReadLevel | "insufficient", string>> = {
    en: {
      positive: mode === "candidate" ? "Positive Momentum Signals" : "Positive Engagement Signals",
      moderate: "Mixed or Uncertain Signals",
      "high-risk": mode === "candidate" ? "Process Risk Signals Detected" : "Acceptance Risk Signals Detected",
      insufficient: "Not Enough Evidence for a Reliable Read",
    },
    zh: {
      positive: mode === "candidate" ? "检测到积极推进信号" : "检测到积极入职意愿信号",
      moderate: "沟通信号混合或仍不明确",
      "high-risk": mode === "candidate" ? "检测到流程风险信号" : "检测到入职意愿风险信号",
      insufficient: "证据不足，暂不建议形成判断",
    },
  };

  return {
    readLevel,
    headline: headlines[language][noEvidence ? "insufficient" : readLevel],
    confidence,
    positiveSignals: positives,
    riskSignals: risks,
    followUps: followUps(language, mode, readLevel, noEvidence),
  };
}

export function containsPotentialPersonalData(input: string) {
  return /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(input) || /(?:\+?\d[\d\s()-]{7,}\d)/.test(input) || /(?:微信|wechat|linkedin)\s*[:：]?\s*[\w.-]+/i.test(input);
}
