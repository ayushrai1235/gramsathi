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
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <span>🛡️ Repayability Stress Test</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
            Core Assessment Module
          </span>
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Evaluates projected business operating surplus against debt repayment burden across base and sensitivity stress scenarios.
        </p>
      </div>

      {/* Main Verdict Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border-2 text-center transition-all ${getVerdictColor(repayability.verdict)}`}>
        <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-white/70 border border-current mb-3">
          Repayability Status Verdict / ऋण भुगतान स्थिति
        </div>
        
        <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
          {getVerdictLabel(repayability.verdict)}
        </h3>

        <p className="text-sm font-medium opacity-90 max-w-2xl mx-auto">
          {repayability.recommendation}
        </p>
        
        {/* MANDATORY HIGH RISK WARNING BANNER */}
        {isWarning && (
          <div className="mt-6 bg-rose-600 text-white py-3.5 px-6 rounded-xl text-sm font-black tracking-wide shadow-md border border-rose-700 animate-pulse">
            ⚠️ ऋण कम करें या व्यवसाय योजना में बदलाव करें / Reduce loan or modify business plan
          </div>
        )}
      </div>

      {/* Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
        <div>
          <span className="text-[10px] text-stone-400 font-bold uppercase block">Monthly Surplus</span>
          <span className="font-extrabold text-base sm:text-lg text-stone-900">{formatINR(repayability.monthly_surplus)}</span>
        </div>

        <div>
          <span className="text-[10px] text-stone-400 font-bold uppercase block">Quarterly Surplus</span>
          <span className="font-extrabold text-base sm:text-lg text-stone-900">{formatINR(repayability.quarterly_surplus)}</span>
        </div>

        <div>
          <span className="text-[10px] text-stone-400 font-bold uppercase block">Quarterly EMI</span>
          <span className="font-extrabold text-base sm:text-lg text-stone-900">{formatINR(repayability.quarterly_emi)}</span>
        </div>

        <div>
          <span className="text-[10px] text-stone-400 font-bold uppercase block">Repayment Burden Ratio</span>
          <span className={`font-extrabold text-base sm:text-lg ${repayability.repayment_ratio > 0.6 ? 'text-rose-700' : 'text-emerald-800'}`}>
            {formatRatio(repayability.repayment_ratio)}
          </span>
        </div>
      </div>

      {/* Stress Scenarios Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
          Sensitivity Stress Test Scenarios
        </h3>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 text-xs">
            <thead className="bg-stone-50 font-bold text-stone-600">
              <tr>
                <th className="px-4 py-3 text-left">Scenario</th>
                <th className="px-4 py-3 text-right">Monthly Surplus</th>
                <th className="px-4 py-3 text-right">Quarterly Surplus</th>
                <th className="px-4 py-3 text-right">Quarterly EMI</th>
                <th className="px-4 py-3 text-right">Burden Ratio</th>
                <th className="px-4 py-3 text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-100">
              {repayability.stress_scenarios.map((sc, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-stone-900">{sc.scenario}</td>
                  <td className="px-4 py-3 text-right font-medium text-stone-700">{formatINR(sc.monthly_surplus)}</td>
                  <td className="px-4 py-3 text-right font-medium text-stone-700">{formatINR(sc.quarterly_surplus)}</td>
                  <td className="px-4 py-3 text-right font-medium text-stone-700">{formatINR(sc.quarterly_emi)}</td>
                  <td className="px-4 py-3 text-right font-bold text-stone-900">{formatRatio(sc.repayment_ratio)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${getVerdictColor(sc.verdict)}`}>
                      {sc.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modify & Recalculate Panel */}
      <div className={`p-6 rounded-2xl border ${isWarning ? 'bg-amber-50/80 border-amber-300' : 'bg-stone-50 border-stone-200'} space-y-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <span>🔄 Modify & Recalculate Advisory Plan</span>
            <span className="text-xs font-semibold text-stone-500">/ बदलें और पुनर्गणना करें</span>
          </h3>
          <span className="text-xs text-stone-500">Adjust figures below to re-evaluate stress test</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Project Cost (₹)</label>
            <input 
              type="number" 
              name="project_cost" 
              value={modifyData.project_cost || ''} 
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Own Contribution (₹)</label>
            <input 
              type="number" 
              name="own_contribution" 
              value={modifyData.own_contribution || ''} 
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Monthly Revenue (₹)</label>
            <input 
              type="number" 
              name="expected_monthly_revenue" 
              value={modifyData.expected_monthly_revenue || ''} 
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Monthly Expenses (₹)</label>
            <input 
              type="number" 
              name="monthly_expenses" 
              value={modifyData.monthly_expenses || ''} 
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-2xs"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 transition-colors"
          >
            {isRecalculating ? (
              <span>Recalculating Advisory Plan...</span>
            ) : (
              <span>Recalculate Stress Test / पुनर्गणना</span>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
