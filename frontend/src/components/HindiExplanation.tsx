'use client';

interface Props {
  explanation: string;
  demoMode: boolean;
}

export default function HindiExplanation({ explanation, demoMode }: Props) {
  return (
    <div className="bg-amber-50/70 rounded-2xl shadow-sm border border-amber-200/80 p-6 sm:p-8 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
        <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <span>🗣️ Advisory Explanation in Hindi</span>
          <span className="text-xs font-semibold text-amber-800">/ हिंदी में सरल व्याख्या</span>
        </h2>

        {demoMode && (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
            DEMO EXPLANATION
          </span>
        )}
      </div>

      {/* Explanation Text */}
      <div className="bg-white p-5 rounded-xl border border-amber-200/60 text-stone-900 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium shadow-2xs">
        {explanation}
      </div>

      {/* Disclaimer Box */}
      <div className="bg-amber-100/60 p-3.5 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <span className="text-base leading-none">⚠️</span>
        <div>
          <p className="font-bold">
            यह व्याख्या AI (Gemini) द्वारा तैयार की गई है। सभी वित्तीय आंकड़े नियम-आधारित गणना से हैं।
          </p>
          <p className="mt-0.5 opacity-90">
            This natural language explanation is synthesized by AI for advisory clarity. All underlying financial figures are computed deterministically.
          </p>
        </div>
      </div>

    </div>
  );
}
