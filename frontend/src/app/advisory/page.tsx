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
    // handled inside InputForm state already, user will just click Analyze
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
    <div className="max-w-4xl mx-auto pb-16">
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      <div className={analysisResult ? 'hidden print:hidden' : 'block'}>
        <InputForm 
          onSubmit={handleAnalyze} 
          onLoadDemo={handleLoadDemo} 
          isLoading={isLoading} 
        />
      </div>

      {analysisResult && formInput && (
        <div ref={resultsRef} className="space-y-6 pt-4 animate-in fade-in duration-500">
          
          <div className="flex justify-end print:hidden">
            <button 
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 underline"
            >
              Start New Advisory Analysis
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
