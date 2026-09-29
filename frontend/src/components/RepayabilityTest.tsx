'use client';

import { useState, useEffect } from 'react';
import { RepayabilityResult, UserInput } from '@/lib/types';
import { formatINR, formatRatio, getVerdictColor, getVerdictLabel } from '@/lib/format';

interface Props {
  repayability: RepayabilityResult;
  currentInput: UserInput;
  onRecalculate: (input: UserInput) => void;
  isRecalculating: boolean;
}

export default function RepayabilityTest({ repayability, currentInput, onRecalculate, isRecalculating }: Props) {
  const [modifyData, setModifyData] = useState({
    project_cost: currentInput.project_cost,
    own_contribution: currentInput.own_contribution,
    expected_monthly_revenue: currentInput.expected_monthly_revenue,
    monthly_expenses: currentInput.monthly_expenses
  });

  useEffect(() => {
    setModifyData({
      project_cost: currentInput.project_cost,
      own_contribution: currentInput.own_contribution,
      expected_monthly_revenue: currentInput.expected_monthly_revenue,
      monthly_expenses: currentInput.monthly_expenses
    });
  }, [currentInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyData(prev => ({
      ...prev,
      [e.target.name]: Number(e.target.value) || 0
    }));
  };

  const handleRecalculate = () => {
    onRecalculate({
      ...currentInput,
      ...modifyData
    });
  };

  const isWarning = repayability.verdict === 'HIGH_RISK' || repayability.verdict === 'NOT_VIABLE';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">🛡️ Repayability Stress Test / भुगतान तनाव परीक्षण</h2>

      <div className={`p-6 rounded-lg border-2 text-center mb-8 ${getVerdictColor(repayability.verdict)}`}>
        <h3 className="text-2xl font-bold mb-2">{getVerdictLabel(repayability.verdict)}</h3>
        <p className="text-sm opacity-90">{repayability.recommendation}</p>
        
        {isWarning && (
          <div className="mt-4 bg-red-100 text-red-800 py-2 px-4 rounded text-sm font-semibold border border-red-200">
            ऋण कम करें या व्यवसाय योजना में बदलाव करें / Reduce loan or modify business plan
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-4 rounded-md border border-slate-200">
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Monthly Surplus</p>
          <p className="font-semibold text-lg">{formatINR(repayability.monthly_surplus)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Quarterly Surplus</p>
          <p className="font-semibold text-lg">{formatINR(repayability.quarterly_surplus)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Quarterly EMI</p>
          <p className="font-semibold text-lg">{formatINR(repayability.quarterly_emi)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Repayment Ratio</p>
          <p className={`font-semibold text-lg ${repayability.repayment_ratio > 0.6 ? 'text-red-600' : 'text-slate-800'}`}>
            {formatRatio(repayability.repayment_ratio)}
          </p>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Stress Scenarios</h3>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full divide-y divide-slate-200 border border-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-slate-500">Scenario</th>
              <th className="px-4 py-2 text-right font-medium text-slate-500">Monthly Surplus</th>
              <th className="px-4 py-2 text-right font-medium text-slate-500">Quarterly Surplus</th>
              <th className="px-4 py-2 text-right font-medium text-slate-500">EMI</th>
              <th className="px-4 py-2 text-right font-medium text-slate-500">Ratio</th>
              <th className="px-4 py-2 text-center font-medium text-slate-500">Verdict</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {repayability.stress_scenarios.map((sc, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3 text-slate-800">{sc.scenario}</td>
                <td className="px-4 py-3 text-right text-slate-600">{formatINR(sc.monthly_surplus)}</td>
                <td className="px-4 py-3 text-right text-slate-600">{formatINR(sc.quarterly_surplus)}</td>
                <td className="px-4 py-3 text-right text-slate-600">{formatINR(sc.quarterly_emi)}</td>
                <td className="px-4 py-3 text-right text-slate-600">{formatRatio(sc.repayment_ratio)}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getVerdictColor(sc.verdict)}`}>
                    {sc.verdict}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`p-5 rounded-lg border ${isWarning ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
        <h3 className="text-base font-semibold text-slate-800 mb-4">🔄 Modify & Recalculate / बदलें और पुनर्गणना करें</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Project Cost (₹)</label>
            <input 
              type="number" 
              name="project_cost" 
              value={modifyData.project_cost || ''} 
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Own Contribution (₹)</label>
            <input 
              type="number" 
              name="own_contribution" 
              value={modifyData.own_contribution || ''} 
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Monthly Revenue (₹)</label>
            <input 
              type="number" 
              name="expected_monthly_revenue" 
              value={modifyData.expected_monthly_revenue || ''} 
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Monthly Expenses (₹)</label>
            <input 
              type="number" 
              name="monthly_expenses" 
              value={modifyData.monthly_expenses || ''} 
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleRecalculate}
          disabled={isRecalculating}
          className="w-full sm:w-auto px-6 py-2 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700 focus:outline-none disabled:opacity-70 flex justify-center items-center"
        >
          {isRecalculating ? 'Recalculating...' : 'Recalculate / पुनर्गणना'}
        </button>
      </div>
    </div>
  );
}
