'use client';

export default function HindiExplanation({ explanation, demoMode }: { explanation: string, demoMode: boolean }) {
  if (!explanation) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">🗣️ Explanation in Hindi / हिंदी में व्याख्या</h2>
        {demoMode && (
          <span className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-1 text-xs font-semibold rounded">
            DEMO MODE
          </span>
        )}
      </div>
      
      <div className="bg-slate-50 p-5 rounded-md border border-slate-100 mb-4">
        <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap">{explanation}</p>
      </div>
      
      <div className="bg-slate-100 p-3 rounded text-xs text-slate-500 border border-slate-200">
        <p>यह व्याख्या AI द्वारा तैयार की गई है। सभी आंकड़े नियम-आधारित गणना से हैं।</p>
        <p>This explanation is prepared by AI. All figures are from rule-based calculations.</p>
      </div>
    </div>
  );
}
