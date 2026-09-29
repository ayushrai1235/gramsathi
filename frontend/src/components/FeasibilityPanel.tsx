'use client';

import { FeasibilityAnalysis } from '@/lib/types';
import { getRatingPill, getConfidenceBadge } from '@/lib/format';

interface Props {
  feasibility: FeasibilityAnalysis;
}

export default function FeasibilityPanel({ feasibility }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
          📊 Qualitative Business Feasibility Analysis
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Evaluates local product-market fit, market gap opportunity, direct local competition, and environmental risks without fake percentages.
        </p>
      </div>

      {/* 3 Main Indicator Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Local Fit */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Local Fit / स्थानीय उपयुक्तता</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${getRatingPill(feasibility.local_fit.rating)}`}>
                {feasibility.local_fit.rating}
              </span>
            </div>
            <p className="text-sm font-semibold text-stone-800 leading-snug">
              {feasibility.local_fit.evidence}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-200/80 flex justify-between items-center text-xs">
            <span className="text-stone-400">Confidence</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${getConfidenceBadge(feasibility.local_fit.confidence)}`}>
              {feasibility.local_fit.confidence}
            </span>
          </div>
        </div>

        {/* Opportunity */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Market Opportunity / अवसर</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${getRatingPill(feasibility.opportunity.rating)}`}>
                {feasibility.opportunity.rating}
              </span>
            </div>
            <p className="text-sm font-semibold text-stone-800 leading-snug">
              {feasibility.opportunity.evidence}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-200/80 flex justify-between items-center text-xs">
            <span className="text-stone-400">Confidence</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${getConfidenceBadge(feasibility.opportunity.confidence)}`}>
              {feasibility.opportunity.confidence}
            </span>
          </div>
        </div>

        {/* Competition */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Local Competition / प्रतिस्पर्धा</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${getRatingPill(feasibility.competition.rating)}`}>
                {feasibility.competition.rating}
              </span>
            </div>
            <p className="text-sm font-semibold text-stone-800 leading-snug">
              {feasibility.competition.evidence}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-200/80 flex justify-between items-center text-xs">
            <span className="text-stone-400">Confidence</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${getConfidenceBadge(feasibility.competition.confidence)}`}>
              {feasibility.competition.confidence}
            </span>
          </div>
        </div>

      </div>

      {/* Risks & Limitations Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Identified Risks */}
        <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-200/80 space-y-3">
          <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>⚠️ Identified Risk Factors ({feasibility.risks.length})</span>
          </h3>
          <div className="space-y-2 text-xs">
            {feasibility.risks.map((r, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-rose-200 flex items-start justify-between gap-3 shadow-2xs">
                <div>
                  <span className="font-bold text-stone-900 block">{r.factor}</span>
                  <span className="text-stone-600 mt-0.5 block">{r.evidence}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase text-[10px]">
                  {r.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Honest Limitations Callout */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>ℹ️ Dataset & Mapping Limitations</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-600">
            {feasibility.limitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-stone-400">•</span>
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
