import { MessageSquare, TrendingUp, AlertTriangle, FileText } from "lucide-react";
import type { Language } from "../types";
import { copy } from "../i18n";

export default function AnalysisPlaceholder({ language }: { language: Language }) {
  const t = copy[language];

  const features = [
    { icon: TrendingUp, label: t.featureSignal, color: "text-emerald-500" },
    { icon: AlertTriangle, label: t.featureRisk, color: "text-amber-500" },
    { icon: FileText, label: t.featureFollowup, color: "text-[#4b63e8]" },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 py-12">
      <div
        className="flex size-16 items-center justify-center rounded-2xl"
        style={{
          backgroundImage: "linear-gradient(135deg, #EEF0FB 0%, rgba(238,240,251,0.5) 100%)",
        }}
      >
        <MessageSquare className="size-7 text-[#4b63e8]" strokeWidth={1.75} />
      </div>

      <div className="flex max-w-[320px] flex-col items-center gap-1.5 text-center">
        <p className="text-sm font-semibold leading-5 text-[#111827]">{t.waitingHeading}</p>
        <p className="text-xs leading-[19.5px] text-[#6b7280]">{t.waitingDesc}</p>
      </div>

      <div className="flex w-full max-w-[320px] flex-col gap-2">
        {features.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex w-full items-center gap-2 rounded-xl border border-[rgba(74,85,200,0.1)] bg-white px-3 py-2"
          >
            <Icon className={`size-[13px] ${color}`} strokeWidth={2} />
            <span className="text-xs text-[#6b7280]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
