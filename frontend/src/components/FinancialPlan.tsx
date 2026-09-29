'use client';

import { useState } from 'react';
import { FinancialPlan } from '@/lib/types';
import { formatINR } from '@/lib/format';

export default function FinancialPlanView({ plans }: { plans: FinancialPlan[] }) {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const validPlans = plans.filter(p => p.repayment_schedule && p.repayment_schedule.length > 0);

  if (validPlans.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">💰 Financial Plan / वित्तीय योजना</h2>
      
      <div className="space-y-8">
        {validPlans.map((plan, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200">
              <h3 className="font-medium text-slate-800">Based on: {plan.scheme_name}</h3>
            </div>
            
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 border-b border-slate-200">
              <div>
                <p className="text-xs text-slate-500">Loan Required</p>
                <p className="font-semibold">{formatINR(plan.loan_required)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Interest Rate</p>
                <p className="font-semibold">{plan.interest_rate_pct !== null ? `${plan.interest_rate_pct}%` : 'TBD'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Quarterly EMI</p>
                <p className="font-semibold text-blue-700">{formatINR(plan.quarterly_emi)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Interest</p>
                <p className="font-semibold text-slate-600">{formatINR(plan.total_interest)}</p>
              </div>
            </div>
            
            <div className="p-5">
              <button 
                onClick={() => setExpandedPlan(expandedPlan === plan.scheme_id ? null : plan.scheme_id)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
              >
                {expandedPlan === plan.scheme_id ? 'Hide Full Schedule' : 'Show Full Schedule'}
                <svg className={`ml-1 w-4 h-4 transform ${expandedPlan === plan.scheme_id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedPlan === plan.scheme_id && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 border border-slate-200 text-sm text-right">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase">Qtr</th>
                        <th className="px-4 py-2 text-xs font-medium text-slate-500 uppercase">EMI (₹)</th>
                        <th className="px-4 py-2 text-xs font-medium text-slate-500 uppercase">Principal (₹)</th>
                        <th className="px-4 py-2 text-xs font-medium text-slate-500 uppercase">Interest (₹)</th>
                        <th className="px-4 py-2 text-xs font-medium text-slate-500 uppercase">Balance (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {plan.repayment_schedule.map((row) => (
                        <tr key={row.quarter}>
                          <td className="px-4 py-2 text-center text-slate-500">{row.quarter}</td>
                          <td className="px-4 py-2 font-medium">{formatINR(row.emi)}</td>
                          <td className="px-4 py-2 text-slate-600">{formatINR(row.principal)}</td>
                          <td className="px-4 py-2 text-slate-600">{formatINR(row.interest)}</td>
                          <td className="px-4 py-2 text-slate-600">{formatINR(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
