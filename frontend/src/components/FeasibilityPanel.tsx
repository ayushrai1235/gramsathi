'use client';

import { FeasibilityAnalysis } from '@/lib/types';
import { getConfidenceBadge, getRatingColor } from '@/lib/format';

export default function FeasibilityPanel({ feasibility }: { feasibility: FeasibilityAnalysis }) {
  
  const IndicatorCard = ({ title, indicator, goodIsLow = false }: { title: string, indicator: any, goodIsLow?: boolean }) => {
    let colorClass = getRatingColor(indicator.rating);
    if (goodIsLow) {
      if (indicator.rating === 'LOW') colorClass = 'text-green-700 font-medium';
      else if (indicator.rating === 'HIGH') colorClass = 'text-red-700 font-medium';
    }
    
    return (
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-md">
        <h3 className="text-sm font-semibold text-slate-600 mb-2">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-lg ${colorClass}`}>{indicator.rating}</span>
          <span className={`px-2 py-0.5 text-[10px] rounded border ${getConfidenceBadge(indicator.confidence)}`}>
            {indicator.confidence}
          </span>
        </div>
        <p className="text-sm text-slate-700">{indicator.evidence}</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">📊 Business Feasibility / व्यवसाय व्यवहार्यता</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <IndicatorCard title="Local Fit / स्थानीय उपयुक्तता" indicator={feasibility.local_fit} />
        <IndicatorCard title="Opportunity / अवसर" indicator={feasibility.opportunity} />
        <IndicatorCard title="Competition / प्रतिस्पर्धा" indicator={feasibility.competition} goodIsLow={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Risk Factors</h3>
          {feasibility.risks.length > 0 ? (
            <ul className="space-y-3">
              {feasibility.risks.map((risk, i) => (
                <li key={i} className="flex flex-col bg-white border border-slate-100 p-3 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-800 text-sm">{risk.factor}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      risk.severity === 'HIGH' ? 'bg-red-100 text-red-800' : 
                      risk.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 
                      'bg-slate-100 text-slate-800'
                    }`}>{risk.severity}</span>
                  </div>
                  <span className="text-sm text-slate-600">{risk.evidence}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No significant risks identified.</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Data Limitations</h3>
          <div className="bg-slate-100 p-4 rounded-md border border-slate-200">
            <ul className="list-disc pl-4 space-y-1">
              {feasibility.limitations.map((lim, i) => (
                <li key={i} className="text-sm text-slate-600">{lim}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
