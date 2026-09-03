import type { Language, Mode, ReadLevel, SampleCase } from "./types";

export const copy: Record<
  Language,
  {
    appName: string;
    tagline: string;
    candidateModeLabel: string;
    recruiterModeLabel: string;
    desktopLabel: string;
    miniProgramLabel: string;
    conversationInput: string;
    sampleCaseLabel: string;
    sampleLabels: Record<SampleCase, string>;
    anonymizeNote: string;
    privacyWarning: string;
    analyzeButton: string;
    waitingHeading: string;
    waitingDesc: string;
    featureSignal: string;
    featureRisk: string;
    featureFollowup: string;
    modes: Record<Mode, { heading: string; subtext: string; placeholder: string }>;
    results: {
      confidenceLabel: string;
      readLevelLabels: Record<ReadLevel, string>;
      positiveSignalsHeading: string;
      riskSignalsHeading: string;
      followUpsHeading: string;
      noRiskSignals: string;
      disclaimer: string;
      mockNote: string;
      localRuleNote: string;
      newAnalysis: string;
    };
  }
> = {
  en: {
    appName: "Signal Copilot",
    tagline: "AI-Powered Communication Analysis",
    candidateModeLabel: "Candidate Mode",
    recruiterModeLabel: "Recruiter Mode",
    desktopLabel: "Desktop",
    miniProgramLabel: "Mini Program",
    conversationInput: "Conversation Input",
    sampleCaseLabel: "Or try a sample case:",
    sampleLabels: {
      strongPositive: "Strong Positive",
      unclearWaiting: "Unclear / Waiting",
      likelyRejection: "Likely Rejection",
    },
    anonymizeNote: "Anonymize names, companies, and contact details before pasting.",
    privacyWarning: "Possible contact details detected. Please remove personal data before analysis.",
    analyzeButton: "Analyze Signals",
    waitingHeading: "Waiting for Analysis",
    waitingDesc:
      "Paste a conversation to begin. AI will identify signals, assess risk, and suggest follow-up actions.",
    featureSignal: "Signal detection",
    featureRisk: "Risk assessment",
    featureFollowup: "Follow-up recommendations",
    modes: {
      candidate: {
        heading: "Interview Momentum",
        subtext: "Paste recruiter messages to understand your interview momentum.",
        placeholder: "Paste recruiter or interviewer messages here...",
      },
      recruiter: {
        heading: "Candidate Engagement Risk",
        subtext: "Paste candidate messages to assess offer acceptance risk.",
        placeholder: "Paste candidate messages here...",
      },
    },
    results: {
      confidenceLabel: "Evidence coverage for this read",
      readLevelLabels: {
        positive: "Positive",
        moderate: "Needs Attention",
        "high-risk": "High Risk",
      },
      positiveSignalsHeading: "Positive Signals",
      riskSignalsHeading: "Risk Signals",
      followUpsHeading: "Follow-up Recommendations",
      noRiskSignals: "No notable risk signals detected.",
      disclaimer:
        "This is a decision aid, not a verdict — use your own judgment alongside it, and avoid treating any single signal as conclusive.",
      mockNote: "Demo output using sample data — not a live model call.",
      localRuleNote: "Local rule-based demo — text is not uploaded or stored.",
      newAnalysis: "Analyze another conversation",
    },
  },
  zh: {
    appName: "招聘沟通信号分析助手",
    tagline: "AI驱动的沟通信号分析",
    candidateModeLabel: "求职者模式",
    recruiterModeLabel: "招聘方模式",
    desktopLabel: "桌面版",
    miniProgramLabel: "小程序版",
    conversationInput: "对话输入",
    sampleCaseLabel: "或试用示例案例：",
    sampleLabels: {
      strongPositive: "明确推进案例",
      unclearWaiting: "模糊等待案例",
      likelyRejection: "可能拒绝案例",
    },
    anonymizeNote: "粘贴前请匿名处理姓名、公司和联系方式。",
    privacyWarning: "检测到可能的联系方式，请先删除个人信息再分析。",
    analyzeButton: "分析信号",
    waitingHeading: "等待分析",
    waitingDesc: "粘贴对话内容后，AI 将生成信号识别、风险判断和跟进建议。",
    featureSignal: "信号识别",
    featureRisk: "风险评估",
    featureFollowup: "跟进建议",
    modes: {
      candidate: {
        heading: "面试推进信号",
        subtext: "粘贴招聘方消息以了解面试推进信号。",
        placeholder: "在此粘贴HR或面试官的消息...",
      },
      recruiter: {
        heading: "候选人入职意愿风险",
        subtext: "粘贴候选人消息以评估Offer接受风险。",
        placeholder: "在此粘贴候选人的消息...",
      },
    },
    results: {
      confidenceLabel: "本次判断的证据覆盖度",
      readLevelLabels: {
        positive: "积极",
        moderate: "需留意",
        "high-risk": "高风险",
      },
      positiveSignalsHeading: "积极信号",
      riskSignalsHeading: "风险信号",
      followUpsHeading: "跟进建议",
      noRiskSignals: "未检测到明显的风险信号。",
      disclaimer: "本结果仅作为辅助判断，请结合实际情况人工判断，不建议仅凭单一信号下结论。",
      mockNote: "当前为示例数据演示，并非真实模型调用。",
      localRuleNote: "本地规则演示，文本不会上传或存储。",
      newAnalysis: "分析下一段对话",
    },
  },
};

// Sample transcripts for the "try a sample case" chips.
// Candidate mode = messages the user (a candidate) received from a recruiter.
// Recruiter mode = messages a recruiter received from a candidate.
export const sampleMessages: Record<Language, Record<Mode, Record<SampleCase, string>>> = {
  en: {
    candidate: {
      strongPositive:
        "Recruiter: Great news — the panel was very impressed. We'd like to move you to the final round with the hiring director next Tuesday. I'll send the calendar invite today and can also share comp range beforehand if useful.",
      unclearWaiting:
        "Recruiter: Thanks for your patience. We're still finishing up interviews on our end, so I don't have a firm timeline yet. I'll follow up as soon as I know more.",
      likelyRejection:
        "Recruiter: Thank you again for the time you invested in the process. We've decided to move forward with another candidate whose background is a closer match for this particular role.",
    },
    recruiter: {
      strongPositive:
        "Candidate: Thank you for the offer! I'm really excited about the team and the role. I don't have any outstanding questions — happy to sign this week if that works on your end.",
      unclearWaiting:
        "Candidate: Thanks for sending this over. I need a bit more time to think it through with my family — can I get back to you by early next week?",
      likelyRejection:
        "Candidate: I appreciate the offer, but I wanted to be upfront — I've received another offer with a start date that's coming up fast, so I may need to decide sooner than we discussed.",
    },
  },
  zh: {
    candidate: {
      strongPositive:
        "招聘方：好消息，面试官对你的表现非常满意，我们希望邀请你下周二进入和用人总监的终面。我今天会发日历邀请，如果需要也可以提前同步一下薪资范围。",
      unclearWaiting:
        "招聘方：感谢你的耐心等待，我们这边的面试流程还没走完，目前还没有确定的时间表，有进展会第一时间同步给你。",
      likelyRejection:
        "招聘方：非常感谢你在整个流程中投入的时间，经过慎重考虑，我们决定推进另一位背景更匹配这个岗位的候选人。",
    },
    recruiter: {
      strongPositive:
        "候选人：谢谢你们的Offer！我对这个团队和岗位都非常期待，目前没有其他疑问，如果可以的话这周就能签约。",
      unclearWaiting:
        "候选人：谢谢发给我的资料，我想再和家人商量一下，能不能下周初再给你答复？",
      likelyRejection:
        "候选人：谢谢你们的Offer，不过想坦诚说一下——我手上还有另一个Offer，入职时间比较紧，所以可能需要比我们之前说的更早做决定。",
    },
  },
};
