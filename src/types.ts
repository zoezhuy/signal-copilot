export type Language = "en" | "zh";
export type Mode = "candidate" | "recruiter";
export type Platform = "desktop" | "mini";
export type SampleCase = "strongPositive" | "unclearWaiting" | "likelyRejection";

export type SignalTone = "positive" | "risk";

export type Signal = {
  title: string;
  evidence: string;
};

export type ReadLevel = "positive" | "moderate" | "high-risk";

export type AnalysisResult = {
  readLevel: ReadLevel;
  headline: string;
  confidence: number; // 0-100 evidence coverage, not a probability of outcome
  positiveSignals: Signal[];
  riskSignals: Signal[];
  followUps: string[];
};

export type AnalysisSource = "curated-sample" | "local-rules";
