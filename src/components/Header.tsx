import type { ReactNode } from "react";
import { Sparkles, User, Briefcase, Monitor, Smartphone } from "lucide-react";
import type { Language, Mode, Platform } from "../types";
import { copy } from "../i18n";

type SegmentedProps = {
  children: ReactNode;
  className?: string;
};

function SegmentedGroup({ children, className = "" }: SegmentedProps) {
  return (
    <div className={`flex shrink-0 items-center gap-0.5 rounded-xl border border-[rgba(74,85,200,0.1)] bg-[#f0f1f7] p-0.5 ${className}`}>
      {children}
    </div>
  );
}

function SegmentedButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex items-center gap-1.5 rounded-[10px] px-2.5 py-1 text-xs font-semibold transition-colors",
        active
          ? "bg-white text-[#111827] shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]"
          : "text-[#6b7280] hover:text-[#374151]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function Header({
  language,
  setLanguage,
  mode,
  setMode,
  platform,
  setPlatform,
}: {
  language: Language;
  setLanguage: (l: Language) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
}) {
  const t = copy[language];

  return (
    <header className="w-full shrink-0 border-b border-[rgba(74,85,200,0.1)] bg-[rgba(255,255,255,0.95)] backdrop-blur-md">
      <div
        className={[
          "mx-auto flex min-h-14 w-full max-w-[1280px] min-w-0 justify-between gap-3 px-4 py-3 sm:px-6",
          platform === "mini"
            ? "flex-col items-stretch"
            : "flex-col items-stretch sm:flex-row sm:items-center",
        ].join(" ")}
      >
        <div className="flex shrink-0 items-center gap-3">
          <div
            className="flex size-8 items-center justify-center rounded-2xl shadow-[0_1px_1.5px_rgba(75,99,232,0.2),0_1px_1px_rgba(75,99,232,0.2)]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #4B63E8 0%, #6A5FF4 50%, #7C5CFC 100%)",
            }}
          >
            <Sparkles className="size-3.5 text-white" strokeWidth={2.25} />
          </div>
          <div className="flex flex-col">
            <p className="font-heading text-sm font-bold leading-5 text-[#111827]">
              {t.appName}
            </p>
            <p className="text-[10px] font-normal leading-[12.5px] text-[#6b7280]">
              {t.tagline}
            </p>
          </div>
        </div>

        <div
          className={
            platform === "mini"
              ? "flex min-w-0 flex-col items-stretch gap-2"
              : "flex flex-wrap items-center gap-2"
          }
        >
          <SegmentedGroup className={platform === "mini" ? "self-end" : ""}>
            <SegmentedButton active={language === "en"} onClick={() => setLanguage("en")}>
              EN
            </SegmentedButton>
            <SegmentedButton active={language === "zh"} onClick={() => setLanguage("zh")}>
              中文
            </SegmentedButton>
          </SegmentedGroup>

          <SegmentedGroup
            className={platform === "mini" ? "w-full [&>button]:min-w-0 [&>button]:flex-1 [&>button]:justify-center" : ""}
          >
            <SegmentedButton active={mode === "candidate"} onClick={() => setMode("candidate")}>
              <User
                className={`size-3 ${mode === "candidate" ? "text-[#4b63e8]" : "text-[#6b7280]"}`}
              />
              <span className={mode === "candidate" ? "text-[#4b63e8]" : undefined}>
                {t.candidateModeLabel}
              </span>
            </SegmentedButton>
            <SegmentedButton active={mode === "recruiter"} onClick={() => setMode("recruiter")}>
              <Briefcase
                className={`size-3 ${mode === "recruiter" ? "text-[#4b63e8]" : "text-[#6b7280]"}`}
              />
              <span className={mode === "recruiter" ? "text-[#4b63e8]" : undefined}>
                {t.recruiterModeLabel}
              </span>
            </SegmentedButton>
          </SegmentedGroup>

          <SegmentedGroup
            className={platform === "mini" ? "w-full [&>button]:min-w-0 [&>button]:flex-1 [&>button]:justify-center" : ""}
          >
            <SegmentedButton active={platform === "desktop"} onClick={() => setPlatform("desktop")}>
              <Monitor className="size-3" />
              {t.desktopLabel}
            </SegmentedButton>
            <SegmentedButton active={platform === "mini"} onClick={() => setPlatform("mini")}>
              <Smartphone className="size-3" />
              {t.miniProgramLabel}
            </SegmentedButton>
          </SegmentedGroup>
        </div>
      </div>
    </header>
  );
}
