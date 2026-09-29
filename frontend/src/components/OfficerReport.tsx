'use client';

import { AnalysisResponse, UserInput } from '@/lib/types';
import { formatINR, getVerdictLabel } from '@/lib/format';

interface Props {
  result: AnalysisResponse;
  input: UserInput;
}

export default function OfficerReport({ result, input }: Props) {
  const mainPlan = result.financial_plans && result.financial_plans.length > 0 ? result.financial_plans[0] : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar with Print button */}
      <div className="flex items-center justify-between bg-stone-900 text-white p-4 rounded-xl print:hidden">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <span>📋 Officer-Ready Appraisal Report</span>
          </h2>
          <p className="text-xs text-stone-400">
            Official summary document formatted for field officers, facilitators, and institutional file review.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
        >
          <span>🖨️ Print Report</span>
        </button>
      </div>

      {/* Printable Report Canvas */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-300 p-8 sm:p-12 text-stone-900 space-y-8 print:border-none print:shadow-none print:p-0 print:m-0">
        
        {/* Document Official Header */}
        <div className="border-b-2 border-stone-800 pb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-stone-900">GRAMSATHI</span>
              <span className="text-sm font-bold text-stone-600">| ग्रामसाथी</span>
            </div>
            <p className="text-xs font-bold text-stone-700 uppercase tracking-wider mt-1">
              National Hyper-Local Enterprise Appraisal & Financial Advisory Report
            </p>
            <p className="text-[11px] text-stone-500">
              Generated under verified government scheme matching protocol v1.0
            </p>
          </div>

          <div className="text-right text-xs text-stone-600">
            <span className="block font-bold text-stone-900">REF: GS-{Date.now().toString().slice(-6)}</span>
            <span className="block mt-0.5">Date: {new Date().toLocaleDateString('en-IN')}</span>
            <span className="inline-block mt-1 px-2 py-0.5 bg-stone-100 border border-stone-300 rounded text-[10px] font-mono">
              STATUS: APPRAISED
            </span>
          </div>
        </div>

        {/* Section 1: Beneficiary & Enterprise Profile */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-1">
            1. Beneficiary & Enterprise Overview / लाभार्थी एवं उद्यम विवरण
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <span className="text-stone-400 block font-medium">Target Location</span>
              <span className="font-bold text-stone-900">{input.location}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Business Activity</span>
              <span className="font-bold text-stone-900">{input.business_idea}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Project Cost</span>
              <span className="font-bold text-stone-900">{formatINR(input.project_cost)}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Promoter Margin</span>
              <span className="font-bold text-stone-900">{formatINR(input.own_contribution)}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Local Evidence & Infrastructure */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-1">
            2. Local Evidence & Spatial Infrastructure / स्थानीय साक्ष्य
          </h3>
          <div className="text-xs space-y-2">
            <p>
              <strong className="text-stone-900">Mapped Establishments ({result.local_evidence.search_radius_km} km radius):</strong> {result.local_evidence.total_mapped} units mapped via OpenStreetMap (Overpass API). Data Source: <strong>{result.local_evidence.data_source}</strong>.
            </p>
            <p>
              <strong className="text-stone-900">Regional Climate Parameters:</strong> {result.local_evidence.weather.avg_temp_c}°C avg temp, {result.local_evidence.weather.annual_rainfall_mm} mm rainfall, Flood Risk: {result.local_evidence.weather.flood_risk}.
            </p>
          </div>
        </div>

        {/* Section 3: Business Feasibility Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-1">
            3. Feasibility Ratings / व्यवहार्यता मूल्यांकन
          </h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-400 block">Local Fit</span>
              <span className="font-bold text-stone-900 text-sm">{result.feasibility.local_fit.rating}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-400 block">Market Opportunity</span>
              <span className="font-bold text-stone-900 text-sm">{result.feasibility.opportunity.rating}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-400 block">Local Competition</span>
              <span className="font-bold text-stone-900 text-sm">{result.feasibility.competition.rating}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Scheme & Financial Appraisal */}
        {mainPlan && (
          <div className="space-y-3">
            <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-1">
              4. Matched Scheme & Financial Amortization / योजना एवं वित्तीय ढांचा
            </h3>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block">Scheme Name</span>
                <span className="font-bold text-stone-900">{mainPlan.scheme_name}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Sanction Loan Limit</span>
                <span className="font-bold text-emerald-800">{formatINR(mainPlan.eligible_loan)}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Interest / Tenure</span>
                <span className="font-bold text-stone-900">{mainPlan.interest_rate_pct ? `${mainPlan.interest_rate_pct}% p.a.` : 'Unverified'} / {mainPlan.tenure_months}m</span>
              </div>
              <div>
                <span className="text-stone-400 block">Quarterly EMI</span>
                <span className="font-bold text-stone-900">{formatINR(mainPlan.quarterly_emi)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Repayability Verdict & Recommendation */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-1">
            5. Repayability Verdict & Recommendation / ऋण भुगतान निर्णय
          </h3>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <strong className="text-stone-900">Appraisal Verdict:</strong>
              <span className="font-black text-sm text-stone-900">{getVerdictLabel(result.repayability.verdict)}</span>
            </div>
            <p>
              <strong className="text-stone-900">Burden Ratio:</strong> {(result.repayability.repayment_ratio * 100).toFixed(1)}% of quarterly operating surplus.
            </p>
            <p>
              <strong className="text-stone-900">Officer Guidance:</strong> {result.repayability.recommendation}
            </p>
          </div>
        </div>

        {/* Section 6: Official Sources & Verification */}
        <div className="space-y-2 text-[11px] text-stone-500 pt-4 border-t border-stone-200">
          <p><strong className="text-stone-700">Policy Sources & Verification:</strong> National Scheduled Castes Finance and Development Corporation (NSFDC, nsfdc.nic.in) • Rules Verification Timestamp: 2024-12-01.</p>
          <p className="italic">Disclaimer: This appraisal report is generated by GRAMSATHI for institutional advisory purposes. Final credit approval remains subject to bank underwriting guidelines.</p>
        </div>

        {/* Signatures Footer */}
        <div className="pt-12 flex justify-between items-end text-xs text-stone-600">
          <div className="text-center">
            <div className="w-40 border-b border-stone-400 mb-1" />
            <span>Signature of Applicant</span>
          </div>
          <div className="text-center">
            <div className="w-40 border-b border-stone-400 mb-1" />
            <span>Field Officer / Facilitator</span>
          </div>
        </div>

      </div>

    </div>
  );
}
