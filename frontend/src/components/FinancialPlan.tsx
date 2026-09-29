'use client';

import { useState } from 'react';
import { FinancialPlan as FinancialPlanType } from '@/lib/types';
import { formatINR } from '@/lib/format';

interface Props {
  plans: FinancialPlanType[];
}

export default function FinancialPlan({ plans }: Props) {
  const [showSchedule, setShowSchedule] = useState(false);

  if (!plans || plans.length === 0) return null;

  const mainPlan = plans[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <span>💰 Financial Structure & EMI Plan</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Calculated deterministically by Python Decimal rules engine using standard quarterly EMI amortization formulas.
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full text-xs font-bold self-start sm:self-auto">
          {mainPlan.scheme_name}
        </span>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <span className="text-stone-400 text-xs font-medium block uppercase">Loan Required</span>
          <span className="text-lg font-black text-stone-900 mt-0.5 block">{formatINR(mainPlan.loan_required)}</span>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
          <span className="text-emerald-800 text-xs font-bold block uppercase">Eligible Loan Amount</span>
          <span className="text-lg font-black text-emerald-950 mt-0.5 block">{formatINR(mainPlan.eligible_loan)}</span>
        </div>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <span className="text-stone-400 text-xs font-medium block uppercase">Quarterly EMI</span>
          <span className="text-lg font-black text-stone-900 mt-0.5 block">{formatINR(mainPlan.quarterly_emi)}</span>
        </div>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <span className="text-stone-400 text-xs font-medium block uppercase">Total Repayment</span>
          <span className="text-lg font-black text-stone-900 mt-0.5 block">{formatINR(mainPlan.total_repayment)}</span>
        </div>

      </div>

      {/* Supplementary Financial Metrics */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-stone-400 block font-medium">Own Contribution</span>
          <span className="text-stone-900 font-bold">{formatINR(mainPlan.own_contribution)}</span>
        </div>
        <div>
          <span className="text-stone-400 block font-medium">Interest Rate</span>
          <span className="text-stone-900 font-bold">{mainPlan.interest_rate_pct ? `${mainPlan.interest_rate_pct}% p.a.` : 'N/A'}</span>
        </div>
        <div>
          <span className="text-stone-400 block font-medium">Tenure / Moratorium</span>
          <span className="text-stone-900 font-bold">{mainPlan.tenure_months}m tenure ({mainPlan.moratorium_months}m moratorium)</span>
        </div>
        <div>
          <span className="text-stone-400 block font-medium">Total Interest Accrual</span>
          <span className="text-amber-800 font-bold">{formatINR(mainPlan.total_interest)}</span>
        </div>
      </div>

      {/* Amortization Schedule Collapsible */}
      {mainPlan.repayment_schedule && mainPlan.repayment_schedule.length > 0 && (
        <div className="pt-2">
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-xs font-bold rounded-xl border border-stone-300/80 transition-colors flex items-center justify-between"
          >
            <span>
              {showSchedule ? '▼ Hide Amortization Schedule' : '▶ Show Full Quarterly Amortization Schedule'} ({mainPlan.repayment_schedule.length} Quarters)
            </span>
            <span className="text-emerald-800 underline">
              {showSchedule ? 'Collapse' : 'Expand Schedule Table'}
            </span>
          </button>

          {showSchedule && (
            <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 max-h-80 overflow-y-auto">
              <table className="min-w-full divide-y divide-stone-200 text-xs">
                <thead className="bg-stone-100 sticky top-0 font-bold text-stone-700">
                  <tr>
                    <th className="px-4 py-2.5 text-center">Quarter</th>
                    <th className="px-4 py-2.5 text-right">EMI (₹)</th>
                    <th className="px-4 py-2.5 text-right">Principal Paid (₹)</th>
                    <th className="px-4 py-2.5 text-right">Interest Paid (₹)</th>
                    <th className="px-4 py-2.5 text-right">Remaining Balance (₹)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-100">
                  {mainPlan.repayment_schedule.map((row) => (
                    <tr key={row.quarter} className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-2 text-center font-bold text-stone-700">Q{row.quarter}</td>
                      <td className="px-4 py-2 text-right font-semibold text-stone-900">{formatINR(row.emi)}</td>
                      <td className="px-4 py-2 text-right text-emerald-800 font-medium">{formatINR(row.principal)}</td>
                      <td className="px-4 py-2 text-right text-amber-800 font-medium">{formatINR(row.interest)}</td>
                      <td className="px-4 py-2 text-right text-stone-600 font-mono">{formatINR(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
