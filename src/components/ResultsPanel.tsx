import { CheckCircle2, Flag, ListChecks, Info, RotateCcw } from "lucide-react";
import type { AnalysisResult, AnalysisSource, Language } from "../types";
import { copy } from "../i18n";

const READ_LEVEL_STYLES: Record<
  AnalysisResult["readLevel"],
  { badgeBg: string; badgeText: string; bar: string }
> = {
  positive: { badgeBg: "bg-emerald-50", badgeText: "text-emerald-600", bar: "bg-emerald-500" },
  moderate: { badgeBg: "bg-amber-50", badgeText: "text-amber-600", bar: "bg-amber-500" },
  "high-risk": { badgeBg: "bg-rose-50", badgeText: "text-rose-600", bar: "bg-rose-500" },
};

export default function ResultsPanel({
  language,
  result,
  onReset,
  source,
}: {
  language: Language;
  result: AnalysisResult;
  onReset: () => void;
  source: AnalysisSource;
}) {
  const t = copy[language].results;
  const styles = READ_LEVEL_STYLES[result.readLevel];

  return (
    <div className="flex w-full flex-col gap-5 rounded-2xl border border-[rgba(74,85,200,0.1)] bg-white p-5 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span
            className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badgeBg} ${styles.badgeText}`}
          >
            {t.readLevelLabels[result.readLevel]}
          </span>
          <p className="font-heading text-base font-bold leading-6 text-[#111827]">
            {result.headline}
          </p>
        </div>
        <span className="rounded-full border border-dashed border-[rgba(74,85,200,0.25)] px-2.5 py-1 text-[11px] font-medium text-[#6b7280]">
          {source === "curated-sample" ? t.mockNote : t.localRuleNote}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs text-[#6b7280]">
          <span>{t.confidenceLabel}</span>
          <span className="font-semibold text-[#111827]">{result.confidence}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0f1f7]">
          <div
            className={`h-full rounded-full ${styles.bar}`}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="size-3.5 text-emerald-500" strokeWidth={2} />
          <p className="text-sm font-semibold text-[#111827]">{t.positiveSignalsHeading}</p>
        </div>
        {result.positiveSignals.length === 0 ? (
          <p className="pl-5 text-xs text-[#6b7280]">—</p>
        ) : (
          <ul className="flex flex-col gap-2 pl-5">
            {result.positiveSignals.map((s) => (
              <li key={s.title} className="text-sm">
                <span className="font-medium text-[#111827]">{s.title}</span>
                <span className="block text-xs italic text-[#6b7280]">{s.evidence}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <Flag className="size-3.5 text-amber-500" strokeWidth={2} />
          <p className="text-sm font-semibold text-[#111827]">{t.riskSignalsHeading}</p>
        </div>
        {result.riskSignals.length === 0 ? (
          <p className="pl-5 text-xs text-[#6b7280]">{t.noRiskSignals}</p>
        ) : (
          <ul className="flex flex-col gap-2 pl-5">
            {result.riskSignals.map((s) => (
              <li key={s.title} className="text-sm">
                <span className="font-medium text-[#111827]">{s.title}</span>
                <span className="block text-xs italic text-[#6b7280]">{s.evidence}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-[#f6f7fb] p-3.5">
        <div className="flex items-center gap-1.5">
          <ListChecks className="size-3.5 text-[#4b63e8]" strokeWidth={2} />
          <p className="text-sm font-semibold text-[#111827]">{t.followUpsHeading}</p>
        </div>
        <ul className="flex flex-col gap-1.5 pl-5 text-sm text-[#374151]">
          {result.followUps.map((f) => (
            <li key={f} className="list-disc">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-1.5 text-[11px] leading-[16px] text-[#6b7280]">
        <Info className="mt-0.5 size-3 shrink-0" strokeWidth={2} />
        <span>{t.disclaimer}</span>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(74,85,200,0.1)] bg-white py-2.5 text-sm font-semibold text-[#4b63e8] transition-colors hover:bg-[rgba(238,240,251,0.5)]"
      >
        <RotateCcw className="size-3.5" strokeWidth={2} />
        {t.newAnalysis}
      </button>
    </div>
  );
}
