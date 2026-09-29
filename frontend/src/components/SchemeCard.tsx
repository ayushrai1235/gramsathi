'use client';

import { MatchedScheme } from '@/lib/types';
import { getConfidenceBadge } from '@/lib/format';

export default function SchemeCard({ schemes }: { schemes: MatchedScheme[] }) {
  if (!schemes || schemes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">🏛️ Government Schemes / सरकारी योजनाएँ</h2>
        <p className="text-slate-600">No matching schemes found for this profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">🏛️ Government Schemes / सरकारी योजनाएँ</h2>
      
      <div className="space-y-6">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="border border-blue-100 rounded-lg overflow-hidden">
            <div className="bg-blue-50 px-5 py-4 border-b border-blue-100 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="font-bold text-blue-900 text-lg">{scheme.name}</h3>
                <p className="text-sm text-blue-700">{scheme.name_hi}</p>
              </div>
              <span className={`mt-2 md:mt-0 px-3 py-1 text-xs font-medium rounded-full border ${getConfidenceBadge(scheme.confidence)}`}>
                {scheme.confidence} CONFIDENCE
              </span>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Eligible Loan</p>
                  <p className="font-semibold text-slate-800">Up to ₹{(scheme.eligible_loan / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Interest Rate</p>
                  {scheme.interest_rate_pct === null ? (
                    <p className="font-semibold text-amber-600 text-sm">असत्यापित / Unverified</p>
                  ) : (
                    <p className="font-semibold text-slate-800">{scheme.interest_rate_pct}% p.a.</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Tenure</p>
                  <p className="font-semibold text-slate-800">{scheme.tenure_months} months</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Moratorium</p>
                  <p className="font-semibold text-slate-800">{scheme.moratorium_months} months</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Repayment</p>
                  <p className="font-semibold text-slate-800 capitalize">{scheme.repayment_frequency}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded text-sm text-slate-700 mb-4 border border-slate-100">
                <span className="font-medium text-slate-900">Eligibility Notes: </span>
                {scheme.eligibility_notes}
              </div>
              
              <div className="text-xs text-slate-500 flex justify-between items-center">
                <span>Verified on: {scheme.verification_date}</span>
                <a href={scheme.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Official Source →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
