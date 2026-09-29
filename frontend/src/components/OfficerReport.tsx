'use client';

import { AnalysisResponse, UserInput } from '@/lib/types';
import { formatINR, formatRatio } from '@/lib/format';

export default function OfficerReport({ result, input }: { result: AnalysisResponse, input: UserInput }) {
  const handlePrint = () => {
    window.print();
  };

  const scheme = result.matched_schemes.length > 0 ? result.matched_schemes[0] : null;
  const plan = result.financial_plans.length > 0 ? result.financial_plans[0] : null;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-xl font-semibold text-slate-800">📋 Officer-Ready Report / अधिकारी रिपोर्ट</h2>
        <button 
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700"
        >
          🖨️ Print Report
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 print:m-0 print:shadow-none print:border-none print:p-0">
        
        <div className="text-center mb-8 border-b-2 border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">GRAMSATHI ADVISORY REPORT</h1>
          <p className="text-sm text-slate-500 mt-1">Generated: {new Date().toLocaleString()}</p>
          {result.demo_mode && <p className="text-xs font-bold text-purple-700 mt-1">*** ILLUSTRATIVE DEMO DATA ***</p>}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase border-b border-slate-200 mb-2 pb-1">1. Beneficiary & Location</h2>
            <p className="text-sm"><span className="text-slate-600">Location:</span> {input.location}</p>
            <p className="text-sm"><span className="text-slate-600">Matched Village:</span> {result.local_evidence.village}, {result.local_evidence.district}, {result.local_evidence.state}</p>
            <p className="text-sm"><span className="text-slate-600">Coordinates:</span> {result.local_evidence.lat.toFixed(4)}, {result.local_evidence.lon.toFixed(4)}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase border-b border-slate-200 mb-2 pb-1">2. Business Idea</h2>
            <p className="text-sm"><span className="text-slate-600">Sector/Type:</span> {input.business_idea}</p>
            <p className="text-sm"><span className="text-slate-600">Project Cost:</span> {formatINR(input.project_cost)}</p>
            <p className="text-sm"><span className="text-slate-600">Own Contribution:</span> {formatINR(input.own_contribution)}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-800 uppercase border-b border-slate-200 mb-2 pb-1">3. Local Evidence Summary</h2>
          <div className="flex gap-4 text-sm">
            <p><span className="text-slate-600">Nearby Businesses Mapped:</span> {result.local_evidence.nearby_businesses.length}</p>
            <p><span className="text-slate-600">Data Coverage:</span> {result.local_evidence.coverage_note}</p>
            <p><span className="text-slate-600">Search Radius:</span> {result.local_evidence.search_radius_km}km</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-800 uppercase border-b border-slate-200 mb-2 pb-1">4. Feasibility Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <p><span className="text-slate-600">Local Fit:</span> <strong className={result.feasibility.local_fit.rating === 'HIGH' ? 'text-green-700' : ''}>{result.feasibility.local_fit.rating}</strong></p>
            <p><span className="text-slate-600">Opportunity:</span> <strong className={result.feasibility.opportunity.rating === 'HIGH' ? 'text-green-700' : ''}>{result.feasibility.opportunity.rating}</strong></p>
            <p><span className="text-slate-600">Competition:</span> <strong className={result.feasibility.competition.rating === 'LOW' ? 'text-green-700' : ''}>{result.feasibility.competition.rating}</strong></p>
          </div>
        </div>

        {scheme && plan && (
          <div className="mb-8 border border-slate-200 p-4 bg-slate-50">
            <h2 className="text-sm font-bold text-slate-800 uppercase border-b border-slate-200 mb-2 pb-1">5 & 6. Matched Scheme & Financial Plan</h2>
            <p className="text-sm font-bold text-blue-900 mb-2">{scheme.name}</p>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div><span className="text-slate-500 block text-xs">Loan Required</span><strong>{formatINR(plan.loan_required)}</strong></div>
              <div><span className="text-slate-500 block text-xs">Eligible Loan</span><strong>{formatINR(plan.eligible_loan)}</strong></div>
              <div><span className="text-slate-500 block text-xs">Interest Rate</span><strong>{plan.interest_rate_pct ? `${plan.interest_rate_pct}%` : 'TBD'}</strong></div>
              <div><span className="text-slate-500 block text-xs">Tenure / Moratorium</span><strong>{plan.tenure_months}m / {plan.moratorium_months}m</strong></div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-800 uppercase border-b border-slate-200 mb-2 pb-1">8. Repayability Verdict</h2>
          <div className="flex gap-8 items-center bg-slate-50 p-4 border border-slate-200">
            <div>
              <span className="text-slate-500 block text-xs">Verdict</span>
              <strong className={`text-lg ${
                result.repayability.verdict === 'AFFORDABLE' ? 'text-green-700' :
                result.repayability.verdict === 'CAUTION' ? 'text-amber-700' : 'text-red-700'
              }`}>{result.repayability.verdict}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Repayment Ratio</span>
              <strong className={result.repayability.repayment_ratio > 0.6 ? 'text-red-700' : ''}>
                {formatRatio(result.repayability.repayment_ratio)}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Quarterly EMI</span>
              <strong>{formatINR(result.repayability.quarterly_emi)}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Quarterly Surplus</span>
              <strong>{formatINR(result.repayability.quarterly_surplus)}</strong>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-xs font-bold text-slate-600 uppercase mb-2">9. Risks Identified</h3>
            {result.feasibility.risks.length > 0 ? (
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-800">
                {result.feasibility.risks.map((r, i) => (
                  <li key={i}><strong>{r.factor} ({r.severity}):</strong> {r.evidence}</li>
                ))}
              </ul>
            ) : <p className="text-sm text-slate-600">None significant</p>}
          </div>
          
          <div className="mt-4">
            <h3 className="text-xs font-bold text-slate-600 uppercase mb-2">10. Recommendation</h3>
            <p className="text-sm bg-slate-100 p-3 italic text-slate-800">{result.repayability.recommendation}</p>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-slate-300 text-xs text-slate-500">
          <h3 className="font-bold mb-1">11. Sources & Verification</h3>
          {scheme && <p>Scheme details sourced from: {scheme.source_url} (Verified: {scheme.verification_date})</p>}
          <p className="mt-2 text-justify">
            12. Disclaimer: This report is for advisory purposes only. It does not constitute loan approval. 
            All financial projections are estimates based on user inputs and rule-based calculations. 
            The AI-generated text is for explanation purposes.
          </p>
        </div>

      </div>
    </div>
  );
}
