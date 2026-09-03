import { Eye, ShieldCheck, UserCheck } from "lucide-react";
import type { Language } from "../types";

const content = {
  en: {
    eyebrow: "Responsible analysis by design",
    heading: "Signals support a conversation — they do not decide a person",
    items: [
      { title: "Evidence first", body: "Every signal is paired with the exact message that triggered it." },
      { title: "Privacy aware", body: "Free-form analysis runs locally in this prototype and warns about contact details." },
      { title: "Human decision", body: "Coverage indicates available evidence, never a candidate's value or a guaranteed outcome." },
    ],
    scope: "Prototype scope: curated examples plus an explainable local rule engine. No LLM or applicant-tracking system is connected.",
  },
  zh: {
    eyebrow: "将负责任分析融入产品设计",
    heading: "信号用于改善沟通，而不是替人作出判断",
    items: [
      { title: "证据优先", body: "每个信号都展示触发判断的原始文本，便于人工核对。" },
      { title: "隐私意识", body: "当前自由输入仅在浏览器本地分析，并对可能的联系方式进行提醒。" },
      { title: "人工决策", body: "覆盖度只代表可用证据多少，不评价候选人价值，也不保证结果。" },
    ],
    scope: "原型范围：经人工编写的示例案例与可解释的本地规则引擎；尚未连接大模型或招聘管理系统。",
  },
} as const;

const icons = [Eye, ShieldCheck, UserCheck];

export default function MethodologyPanel({
  language,
  compact = false,
}: {
  language: Language;
  compact?: boolean;
}) {
  const t = content[language];

  return (
    <section className="mt-3 border-t border-[rgba(74,85,200,0.1)] pt-6" aria-labelledby="methodology-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b63e8]">{t.eyebrow}</p>
      <h2 id="methodology-heading" className="mt-1 font-heading text-lg font-bold leading-7 text-[#111827]">
        {t.heading}
      </h2>
      <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-3"}`}>
        {t.items.map((item, index) => {
          const Icon = icons[index];
          return (
            <article key={item.title} className="rounded-2xl border border-[rgba(74,85,200,0.1)] bg-white p-4">
              <Icon className="size-4 text-[#4b63e8]" aria-hidden="true" />
              <h3 className="mt-2 text-sm font-semibold text-[#111827]">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#6b7280]">{item.body}</p>
            </article>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] leading-5 text-[#6b7280]">{t.scope}</p>
    </section>
  );
}
