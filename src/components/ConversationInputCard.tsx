import { FileText, Circle, Sparkles, Loader2 } from "lucide-react";
import type { Language, Mode, SampleCase } from "../types";
import { copy } from "../i18n";

const SAMPLE_CASES: SampleCase[] = ["strongPositive", "unclearWaiting", "likelyRejection"];

export default function ConversationInputCard({
  language,
  mode,
  value,
  onChange,
  onSampleClick,
  onAnalyze,
  analyzing,
  privacyWarning,
}: {
  language: Language;
  mode: Mode;
  value: string;
  onChange: (v: string) => void;
  onSampleClick: (c: SampleCase) => void;
  onAnalyze: () => void;
  analyzing: boolean;
  privacyWarning: boolean;
}) {
  const t = copy[language];
  const modeCopy = t.modes[mode];
  const canAnalyze = value.trim().length > 0 && !analyzing;

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-[rgba(74,85,200,0.1)] bg-white p-5 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
      <div className="flex w-full items-center gap-2 border-b border-[rgba(74,85,200,0.1)] pb-3">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-xl bg-[rgba(75,99,232,0.1)]">
          <FileText className="size-3 text-[#4b63e8]" strokeWidth={2.25} />
        </div>
        <p className="text-sm font-semibold leading-5 text-[#111827]">{t.conversationInput}</p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={modeCopy.placeholder}
          rows={6}
          className="h-40 w-full resize-none rounded-2xl border border-[rgba(74,85,200,0.1)] bg-white p-4 text-sm leading-[22.75px] text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4b63e8]/30"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#6b7280]">{t.sampleCaseLabel}</span>
          {SAMPLE_CASES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onSampleClick(c)}
              className="rounded-xl border border-[rgba(74,85,200,0.1)] bg-[rgba(238,240,251,0.5)] px-2.5 py-1 text-xs font-medium text-[#3547c8] transition-colors hover:bg-[rgba(238,240,251,0.9)]"
            >
              {t.sampleLabels[c]}
            </button>
          ))}
        </div>

        <div className="flex w-full items-center gap-1.5">
          <Circle className="size-[11px] text-[#6b7280]" strokeWidth={2} />
          <span className="text-xs text-[#6b7280]">{t.anonymizeNote}</span>
        </div>

        {privacyWarning && (
          <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
            {t.privacyWarning}
          </div>
        )}

        <button
          type="button"
          disabled={!canAnalyze}
          onClick={onAnalyze}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4b63e8] py-3 text-sm font-semibold text-white shadow-[0_1px_1.5px_rgba(75,99,232,0.2),0_1px_1px_rgba(75,99,232,0.2)] transition-opacity",
            canAnalyze ? "opacity-100 hover:opacity-90 cursor-pointer" : "opacity-40 cursor-not-allowed",
          ].join(" ")}
        >
          {analyzing ? (
            <Loader2 className="size-[15px] animate-spin" />
          ) : (
            <Sparkles className="size-[15px]" />
          )}
          {t.analyzeButton}
        </button>
      </div>
    </div>
  );
}
