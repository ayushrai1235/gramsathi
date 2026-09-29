'use client';

import { useState } from 'react';
import { UserInput } from '@/lib/types';

interface InputFormProps {
  onSubmit: (input: UserInput) => void;
  onLoadDemo: (scenario: 'dairy_affordable' | 'dairy_high_risk') => void;
  isLoading: boolean;
}

const dairy_affordable: UserInput = {
  location: 'Chandauli, Uttar Pradesh',
  business_idea: 'Dairy Farming',
  own_contribution: 100000,
  project_cost: 500000,
  expected_monthly_revenue: 80000,
  monthly_expenses: 48000
};

const dairy_high_risk: UserInput = {
  location: 'Chandauli, Uttar Pradesh',
  business_idea: 'Dairy Farming',
  own_contribution: 50000,
  project_cost: 500000,
  expected_monthly_revenue: 40000,
  monthly_expenses: 35000
};

export default function InputForm({ onSubmit, onLoadDemo, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<UserInput>({
    location: '',
    business_idea: '',
    own_contribution: 0,
    project_cost: 0,
    expected_monthly_revenue: 0,
    monthly_expenses: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumberField = ['own_contribution', 'project_cost', 'expected_monthly_revenue', 'monthly_expenses'].includes(name);
    
    setFormData(prev => ({
      ...prev,
      [name]: isNumberField ? (Number(value) || 0) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDemoClick = (type: 'dairy_affordable' | 'dairy_high_risk') => {
    const data = type === 'dairy_affordable' ? dairy_affordable : dairy_high_risk;
    setFormData(data);
    onLoadDemo(type);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 overflow-hidden">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 px-6 sm:px-8 py-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <span>📝 Business Advisory Form</span>
            <span className="text-emerald-300 text-sm font-semibold">/ सलाह प्रपत्र</span>
          </h2>
          <p className="text-xs text-stone-300 mt-0.5">
            Enter enterprise details below for evidence analysis and financial stress testing.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700 text-xs font-semibold text-emerald-200 self-start sm:self-auto">
          <span>Official Evaluation Module</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        
        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-800">
              Location / Village <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">स्थान/गाँव</span>
            </label>
            <input 
              required
              type="text" 
              name="location" 
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Chandauli, Uttar Pradesh"
              className="w-full px-3.5 py-2.5 bg-stone-50/50 border border-stone-300 rounded-lg text-sm text-stone-900 shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all placeholder:text-stone-400"
            />
          </div>

          {/* Business Idea */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-800">
              Business Idea <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">व्यवसाय का प्रकार</span>
            </label>
            <input 
              required
              type="text" 
              name="business_idea"
              value={formData.business_idea}
              onChange={handleChange}
              placeholder="e.g. Dairy Farming, Grocery Store"
              className="w-full px-3.5 py-2.5 bg-stone-50/50 border border-stone-300 rounded-lg text-sm text-stone-900 shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all placeholder:text-stone-400"
              list="business-ideas"
            />
            <datalist id="business-ideas">
              <option value="Dairy Farming" />
              <option value="Grocery Store" />
              <option value="Tailoring" />
            </datalist>
          </div>

          {/* Own Contribution */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-800">
              Own Contribution (₹) <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">अपना योगदान</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-stone-400 font-medium text-sm">₹</span>
              <input 
                required
                type="number" 
                name="own_contribution"
                value={formData.own_contribution || ''}
                onChange={handleChange}
                min="0"
                placeholder="1,00,000"
                className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-300 rounded-lg text-sm font-semibold text-stone-900 shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all"
              />
            </div>
          </div>

          {/* Total Project Cost */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-800">
              Total Project Cost (₹) <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">कुल लागत</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-stone-400 font-medium text-sm">₹</span>
              <input 
                required
                type="number" 
                name="project_cost"
                value={formData.project_cost || ''}
                onChange={handleChange}
                min="0"
                placeholder="5,00,000"
                className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-300 rounded-lg text-sm font-semibold text-stone-900 shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all"
              />
            </div>
          </div>

          {/* Expected Revenue */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-800">
              Expected Monthly Revenue (₹) <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">अपेक्षित आय</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-stone-400 font-medium text-sm">₹</span>
              <input 
                required
                type="number" 
                name="expected_monthly_revenue"
                value={formData.expected_monthly_revenue || ''}
                onChange={handleChange}
                min="0"
                placeholder="80,000"
                className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-300 rounded-lg text-sm font-semibold text-stone-900 shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all"
              />
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-800">
              Monthly Expenses (₹) <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">मासिक खर्च</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-stone-400 font-medium text-sm">₹</span>
              <input 
                required
                type="number" 
                name="monthly_expenses"
                value={formData.monthly_expenses || ''}
                onChange={handleChange}
                min="0"
                placeholder="48,000"
                className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-300 rounded-lg text-sm font-semibold text-stone-900 shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all"
              />
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-70 transition-all flex items-center justify-center gap-2 min-w-[220px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Evaluating Evidence...</span>
              </span>
            ) : (
              <>
                <span>Analyze Advisory Request</span>
                <span className="text-xs text-emerald-200">/ विश्लेषण करें</span>
              </>
            )}
          </button>
        </div>

        {/* Demo Quick-Load Cards */}
        <div className="pt-6 border-t border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Quick Test Scenarios / त्वरित परीक्षण परिदृश्य:
            </span>
            <span className="text-xs text-stone-400">Pre-configured demo data</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleDemoClick('dairy_affordable')}
              className="p-4 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-emerald-950 group-hover:text-emerald-800">
                  📊 Dairy Farming (Affordable)
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900">
                  Affordable Case
                </span>
              </div>
              <p className="text-xs text-emerald-900/80">
                ₹5L Cost • ₹1L Own • ₹80k Rev / ₹48k Exp • Low burden ratio
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleDemoClick('dairy_high_risk')}
              className="p-4 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/80 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-amber-950 group-hover:text-amber-800">
                  ⚠️ Dairy Farming (High Risk)
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200/80 text-amber-950">
                  High Risk Case
                </span>
              </div>
              <p className="text-xs text-amber-900/80">
                ₹5L Cost • ₹50k Own • ₹40k Rev / ₹35k Exp • High burden ratio
              </p>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
