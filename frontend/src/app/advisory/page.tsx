'use client';

import { useState, useRef } from 'react';
import { UserInput, AnalysisResponse } from '@/lib/types';
import { analyzeProject, recalculateProject } from '@/lib/api';

import InputForm from '@/components/InputForm';
import LocalEvidence from '@/components/LocalEvidence';
import FeasibilityPanel from '@/components/FeasibilityPanel';
import SchemeCard from '@/components/SchemeCard';
import FinancialPlan from '@/components/FinancialPlan';
import RepayabilityTest from '@/components/RepayabilityTest';
import HindiExplanation from '@/components/HindiExplanation';
import OfficerReport from '@/components/OfficerReport';

export default function AdvisoryPage() {
  const [formInput, setFormInput] = useState<UserInput | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const repayabilityRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeProject(input);
      setFormInput(input);
      setAnalysisResult(result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDemo = async (scenarioId: string) => {
    // handled in InputForm component state
  };

  const handleRecalculate = async (modifiedInput: UserInput) => {
    if (!formInput) return;
    setIsRecalculating(true);
    setError(null);
    try {
      const result = await recalculateProject(modifiedInput);
      setFormInput(modifiedInput);
      setAnalysisResult(result);
      setTimeout(() => {
        repayabilityRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Failed to recalculate project');
    } finally {
      setIsRecalculating(false);
    }
  };

  const handleReset = () => {
    setFormInput(null);
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {error && (
        <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-xl shadow-xs text-xs">
          <p className="font-bold text-rose-900">Analysis Request Failed</p>
          <p className="text-rose-800 mt-0.5">{error}</p>
        </div>
      )}

      {/* Input Form Section */}
      <div className={analysisResult ? 'hidden print:hidden' : 'block'}>
        <InputForm 
          onSubmit={handleAnalyze} 
          onLoadDemo={handleLoadDemo} 
          isLoading={isLoading} 
        />
      </div>

      {/* Analysis Results Display */}
      {analysisResult && formInput && (
        <div ref={resultsRef} className="space-y-8 pt-2 animate-in fade-in duration-500">
          
          {/* Action Navigation Bar */}
          <div className="bg-stone-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md print:hidden">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Enterprise Advisory Dossier / मूल्यांकन परिणाम
              </span>
              <span className="text-sm font-bold text-stone-100">
                {formInput.business_idea} — {formInput.location}
              </span>
            </div>

            <button 
              onClick={handleReset}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-lg border border-stone-700 transition-colors self-start sm:self-auto"
            >
              ← Start New Appraisal / नया मूल्यांकन
            </button>
          </div>

          <LocalEvidence evidence={analysisResult.local_evidence} />
          
          <FeasibilityPanel feasibility={analysisResult.feasibility} />
          
          <SchemeCard schemes={analysisResult.matched_schemes} />
          
          <FinancialPlan plans={analysisResult.financial_plans} />
          
          <div ref={repayabilityRef}>
            <RepayabilityTest 
              repayability={analysisResult.repayability} 
              currentInput={formInput}
              onRecalculate={handleRecalculate}
              isRecalculating={isRecalculating}
            />
          </div>
          
          <HindiExplanation 
            explanation={analysisResult.ai_explanation} 
            demoMode={analysisResult.demo_mode} 
          />
          
          <OfficerReport result={analysisResult} input={formInput} />

        </div>
      )}
    </div>
  );
}
