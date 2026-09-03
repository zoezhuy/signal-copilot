import { useEffect, useState } from "react";
import Header from "./components/Header";
import ConversationInputCard from "./components/ConversationInputCard";
import AnalysisPlaceholder from "./components/AnalysisPlaceholder";
import ResultsPanel from "./components/ResultsPanel";
import MethodologyPanel from "./components/MethodologyPanel";
import { copy, sampleMessages } from "./i18n";
import { mockResults } from "./mockResults";
import { analyzeConversation, containsPotentialPersonalData } from "./analysisEngine";
import type { AnalysisResult, AnalysisSource, Language, Mode, Platform, SampleCase } from "./types";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [mode, setMode] = useState<Mode>("candidate");
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [lastScenario, setLastScenario] = useState<SampleCase | null>(null);
  const [customResult, setCustomResult] = useState<AnalysisResult | null>(null);
  const [resultSource, setResultSource] = useState<AnalysisSource>("curated-sample");

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const handleInputChange = (v: string) => {
    setInput(v);
    // Edited text no longer matches whatever result was showing.
    setAnalyzed(false);
    setLastScenario(null);
    setCustomResult(null);
  };

  const handleSample = (c: SampleCase) => {
    setInput(sampleMessages[language][mode][c]);
    setAnalyzed(false);
    setLastScenario(c);
    setCustomResult(null);
  };

  const handleAnalyze = () => {
    if (!input.trim()) return;
    const generated = lastScenario ? null : analyzeConversation(input, language, mode);
    setAnalyzing(true);
    // Curated samples use reviewed demo outputs. Free-form input is analyzed
    // locally with transparent phrase rules and is never uploaded.
    window.setTimeout(() => {
      setAnalyzing(false);
      setCustomResult(generated);
      setResultSource(lastScenario ? "curated-sample" : "local-rules");
      setAnalyzed(true);
    }, 1100);
  };

  const handleReset = () => {
    setInput("");
    setAnalyzed(false);
    setLastScenario(null);
    setCustomResult(null);
  };

  // Switching modes clears everything so candidate-side and recruiter-side
  // transcripts/results never bleed into each other.
  const handleSetMode = (m: Mode) => {
    setMode(m);
    setInput("");
    setAnalyzed(false);
    setLastScenario(null);
    setCustomResult(null);
  };

  const handleSetLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    setLanguage(nextLanguage);
    if (lastScenario) {
      setInput(sampleMessages[nextLanguage][mode][lastScenario]);
    } else if (input) {
      setAnalyzed(false);
      setCustomResult(null);
    }
  };

  const modeCopy = copy[language].modes[mode];
  const result = analyzed
    ? lastScenario
      ? mockResults[language][mode][lastScenario]
      : customResult
    : null;

  const content = (
    <div
      className={`flex min-h-[643px] w-full min-w-0 flex-col gap-6 ${
        platform === "mini" ? "px-4 py-6" : "px-6 py-8"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-xl font-bold leading-7 text-[#111827]">
            {modeCopy.heading}
          </h1>
          <p className="text-sm leading-5 text-[#6b7280]">{modeCopy.subtext}</p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[764px] flex-col gap-5">
        <ConversationInputCard
          language={language}
          mode={mode}
          value={input}
          onChange={handleInputChange}
          onSampleClick={handleSample}
          onAnalyze={handleAnalyze}
          analyzing={analyzing}
          privacyWarning={containsPotentialPersonalData(input)}
        />
        {result ? (
          <ResultsPanel language={language} result={result} source={resultSource} onReset={handleReset} />
        ) : (
          <AnalysisPlaceholder language={language} />
        )}
        <MethodologyPanel language={language} compact={platform === "mini"} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#f6f7fb]">
      <div className={platform === "mini" ? "flex justify-center bg-[#e5e7f0] px-2 py-4 sm:py-8" : ""}>
        <div
          className={
            platform === "mini"
              ? "flex w-full max-w-[390px] min-w-0 flex-col overflow-x-hidden rounded-[2.25rem] border-8 border-[#111827] bg-[#f6f7fb] shadow-2xl"
              : "flex w-full flex-col"
          }
        >
          <Header
            language={language}
            setLanguage={handleSetLanguage}
            mode={mode}
            setMode={handleSetMode}
            platform={platform}
            setPlatform={setPlatform}
          />
          <div className="mx-auto w-full max-w-[812px]">{content}</div>
        </div>
      </div>
    </div>
  );
}
