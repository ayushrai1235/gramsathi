'use client';

import { MatchedScheme } from '@/lib/types';
import { formatINR, getConfidenceBadge } from '@/lib/format';

interface Props {
  schemes: MatchedScheme[];
}

export default function SchemeCard({ schemes }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <span>🏛️ Government Credit Schemes Matched</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Rule-Based Versioned Data
          </span>
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Matched from official government scheme tables based on enterprise cost boundaries and promoter margin eligibility.
        </p>
      </div>

      {schemes.length === 0 ? (
        <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl text-center text-stone-600 text-sm">
          No matching government scheme found for the given project cost range.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {schemes.map((s) => (
            <div 
              key={s.id}
              className="bg-stone-50/70 hover:bg-stone-50 rounded-xl p-6 border border-stone-200 shadow-2xs transition-all space-y-5"
            >
              {/* Card Top Title & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-900">{s.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getConfidenceBadge(s.confidence)}`}>
                      {s.confidence}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">{s.name_hi}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Max Eligible Loan</span>
                  <span className="text-xl font-extrabold text-emerald-800">{formatINR(s.eligible_loan)}</span>
                </div>
              </div>

              {/* Scheme Key Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block font-medium">Interest Rate (p.a.)</span>
                  <span className="text-stone-900 font-bold text-sm mt-0.5 block">
                    {s.interest_rate_pct !== null ? `${s.interest_rate_pct}%` : (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs font-semibold border border-amber-200">
                        Unverified Rate
                      </span>
                    )}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block font-medium">Max Tenure</span>
                  <span className="text-stone-900 font-bold text-sm mt-0.5 block">
                    {s.tenure_months ? `${s.tenure_months / 12} Years (${s.tenure_months}m)` : 'N/A'}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block font-medium">Moratorium Period</span>
                  <span className="text-stone-900 font-bold text-sm mt-0.5 block">
                    {s.moratorium_months} Months
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block font-medium">Repayment Frequency</span>
                  <span className="text-stone-900 font-bold text-sm mt-0.5 block uppercase">
                    {s.repayment_frequency}
                  </span>
                </div>
              </div>

              {/* Eligibility Notes */}
              <div className="text-xs text-stone-700 bg-white p-3.5 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">Eligibility Criteria & Guidelines:</span>
                <p>{s.eligibility_notes}</p>
              </div>

              {/* Traceability & Source Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pt-2 border-t border-stone-200/80">
                <div className="flex items-center gap-2">
                  <span>Source Verification Date:</span>
                  <span className="font-semibold text-stone-700">{s.verification_date}</span>
                </div>

                <a 
                  href={s.source_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-800 hover:text-emerald-900 font-bold underline flex items-center gap-1"
                >
                  <span>Official Policy Document</span>
                  <span>↗</span>
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
