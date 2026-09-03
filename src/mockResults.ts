import type { AnalysisResult, Language, Mode, SampleCase } from "./types";

type ResultSet = Record<Language, Record<Mode, Record<SampleCase, AnalysisResult>>>;

export const mockResults: ResultSet = {
  en: {
    candidate: {
      strongPositive: {
        readLevel: "positive",
        headline: "Strong Forward Momentum",
        confidence: 88,
        positiveSignals: [
          { title: "Clear next step named", evidence: "\u201cmove you to the final round with the hiring director\u201d" },
          { title: "Concrete timeline offered", evidence: "\u201cnext Tuesday\u201d" },
          { title: "Proactive information sharing", evidence: "\u201ccan also share comp range beforehand\u201d" },
        ],
        riskSignals: [],
        followUps: [
          "Confirm your availability for Tuesday within 24 hours to keep momentum.",
          "Ask for the comp range now so you can prepare questions for the final round.",
          "Send a short thank-you note referencing the panel's feedback.",
        ],
      },
      unclearWaiting: {
        readLevel: "moderate",
        headline: "Momentum Stalled \u2014 Awaiting Update",
        confidence: 54,
        positiveSignals: [
          { title: "Communication is still open", evidence: "\u201cI'll follow up as soon as I know more\u201d" },
        ],
        riskSignals: [
          { title: "No firm timeline given", evidence: "\u201cI don't have a firm timeline yet\u201d" },
          { title: "Process described as still in progress", evidence: "\u201cstill finishing up interviews on our end\u201d" },
        ],
        followUps: [
          "Politely ask for an estimated decision date.",
          "Reiterate your interest and availability.",
          "Set a personal follow-up reminder for one week out.",
        ],
      },
      likelyRejection: {
        readLevel: "high-risk",
        headline: "Rejection Signal Detected",
        confidence: 91,
        positiveSignals: [
          { title: "Respectful, professional close", evidence: "\u201cThank you again for the time you invested\u201d" },
        ],
        riskSignals: [
          { title: "Explicit rejection language", evidence: "\u201cmoving forward with another candidate\u201d" },
          { title: "No alternative role offered", evidence: "\u201ca closer match for this particular role\u201d" },
        ],
        followUps: [
          "Send a brief thank-you and ask to stay in touch for future roles.",
          "Request feedback on the interview to improve next time.",
          "Mark this opportunity as closed in your tracker.",
        ],
      },
    },
    recruiter: {
      strongPositive: {
        readLevel: "positive",
        headline: "Low Risk \u2014 High Acceptance Likelihood",
        confidence: 92,
        positiveSignals: [
          { title: "Explicit enthusiasm", evidence: "\u201creally excited about the team and the role\u201d" },
          { title: "No open questions", evidence: "\u201cI don't have any outstanding questions\u201d" },
          { title: "Fast close signaled", evidence: "\u201chappy to sign this week\u201d" },
        ],
        riskSignals: [],
        followUps: [
          "Send the contract today while momentum is high.",
          "Confirm start date and onboarding logistics.",
          "Loop in the hiring manager for a warm welcome note.",
        ],
      },
      unclearWaiting: {
        readLevel: "moderate",
        headline: "Moderate Risk \u2014 Decision Pending",
        confidence: 47,
        positiveSignals: [
          { title: "Still engaged, asked for more time", evidence: "\u201ccan I get back to you by early next week\u201d" },
        ],
        riskSignals: [
          { title: "Needs external input before deciding", evidence: "\u201cthink it through with my family\u201d" },
          { title: "No firm commitment date", evidence: "\u201ca bit more time\u201d" },
        ],
        followUps: [
          "Offer to answer any remaining questions before their decision.",
          "Check in early next week, as they suggested.",
          "Highlight key benefits (team, growth, flexibility) in a follow-up note.",
        ],
      },
      likelyRejection: {
        readLevel: "high-risk",
        headline: "High Risk \u2014 Competing Offer",
        confidence: 85,
        positiveSignals: [
          { title: "Transparent about the situation", evidence: "\u201cwanted to be upfront\u201d" },
        ],
        riskSignals: [
          { title: "Competing offer with a deadline", evidence: "\u201canother offer with a start date that's coming up fast\u201d" },
          { title: "Compressed decision timeline", evidence: "\u201cdecide sooner than we discussed\u201d" },
        ],
        followUps: [
          "Escalate internally to see if paperwork can be expedited or the offer improved.",
          "Ask directly what would make this offer the clear choice.",
          "Set a same-day check-in given the compressed timeline.",
        ],
      },
    },
  },
  zh: {
    candidate: {
      strongPositive: {
        readLevel: "positive",
        headline: "面试推进强劲",
        confidence: 88,
        positiveSignals: [
          { title: "明确给出下一步安排", evidence: "\u201c邀请你下周二进入终面\u201d" },
          { title: "给出具体时间", evidence: "\u201c下周二\u201d" },
          { title: "主动提供信息", evidence: "\u201c可以提前同步一下薪资范围\u201d" },
        ],
        riskSignals: [],
        followUps: [
          "24 小时内确认周二的时间，保持推进节奏。",
          "提前问一下薪资范围，为终面做准备。",
          "发一封简短的感谢信，提及面试官的反馈。",
        ],
      },
      unclearWaiting: {
        readLevel: "moderate",
        headline: "推进停滞，等待进一步消息",
        confidence: 54,
        positiveSignals: [{ title: "沟通渠道仍然畅通", evidence: "\u201c有进展会第一时间同步给你\u201d" }],
        riskSignals: [
          { title: "没有给出明确时间表", evidence: "\u201c目前还没有确定的时间表\u201d" },
          { title: "流程仍在进行中", evidence: "\u201c面试流程还没走完\u201d" },
        ],
        followUps: [
          "礼貌询问预计的决定时间。",
          "重申你的意向和可安排的时间。",
          "给自己设置一周后的跟进提醒。",
        ],
      },
      likelyRejection: {
        readLevel: "high-risk",
        headline: "检测到拒绝信号",
        confidence: 91,
        positiveSignals: [{ title: "结束语专业得体", evidence: "\u201c非常感谢你在整个流程中投入的时间\u201d" }],
        riskSignals: [
          { title: "明确的拒绝表述", evidence: "\u201c推进另一位背景更匹配的候选人\u201d" },
          { title: "没有提供其他岗位机会", evidence: "\u201c更匹配这个岗位\u201d" },
        ],
        followUps: [
          "发送简短感谢信，表达希望保持联系。",
          "请求面试反馈，为下次做准备。",
          "在你的求职记录里把这个机会标记为已结束。",
        ],
      },
    },
    recruiter: {
      strongPositive: {
        readLevel: "positive",
        headline: "低风险，接受概率高",
        confidence: 92,
        positiveSignals: [
          { title: "明确表达兴奋和期待", evidence: "\u201c对这个团队和岗位都非常期待\u201d" },
          { title: "没有遗留问题", evidence: "\u201c目前没有其他疑问\u201d" },
          { title: "愿意尽快签约", evidence: "\u201c这周就能签约\u201d" },
        ],
        riskSignals: [],
        followUps: [
          "趁热度高，今天就发送合同。",
          "确认入职日期和入职流程细节。",
          "邀请用人经理发一封欢迎邮件。",
        ],
      },
      unclearWaiting: {
        readLevel: "moderate",
        headline: "中等风险，决定待定",
        confidence: 47,
        positiveSignals: [{ title: "仍在沟通，主动给出时间", evidence: "\u201c下周初再给你答复\u201d" }],
        riskSignals: [
          { title: "需要和家人商量才能决定", evidence: "\u201c想再和家人商量一下\u201d" },
          { title: "没有明确的承诺时间", evidence: "\u201c再给我一点时间\u201d" },
        ],
        followUps: [
          "主动提出解答决定前的任何疑问。",
          "按候选人建议的时间在下周初跟进。",
          "在跟进中再强调团队、成长空间等关键优势。",
        ],
      },
      likelyRejection: {
        readLevel: "high-risk",
        headline: "高风险，存在竞争 Offer",
        confidence: 85,
        positiveSignals: [{ title: "坦诚说明情况", evidence: "\u201c想坦诚说一下\u201d" }],
        riskSignals: [
          { title: "有截止日期紧张的竞争 Offer", evidence: "\u201c入职时间比较紧\u201d" },
          { title: "决定时间被压缩", evidence: "\u201c需要比我们之前说的更早做决定\u201d" },
        ],
        followUps: [
          "内部升级沟通，看能否加快流程或优化条件。",
          "直接询问候选人怎样能让这个 Offer 成为首选。",
          "鉴于时间紧迫，安排当天跟进。",
        ],
      },
    },
  },
};
