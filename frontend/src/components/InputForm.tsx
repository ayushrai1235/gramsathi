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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-800">Business Advisory Form / व्यवसाय सलाहकार फॉर्म</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Location/Village <br/><span className="text-xs text-slate-500 font-normal">स्थान/गाँव</span></label>
            <input 
              required
              type="text" 
              name="location" 
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Chandauli, Uttar Pradesh"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Business Idea <br/><span className="text-xs text-slate-500 font-normal">व्यवसाय का प्रकार</span></label>
            <input 
              required
              type="text" 
              name="business_idea"
              value={formData.business_idea}
              onChange={handleChange}
              placeholder="e.g. Dairy Farming, Grocery Store"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              list="business-ideas"
            />
            <datalist id="business-ideas">
              <option value="Dairy Farming" />
              <option value="Grocery Store" />
              <option value="Tailoring" />
            </datalist>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Own Contribution (₹) <br/><span className="text-xs text-slate-500 font-normal">अपना योगदान (₹)</span></label>
            <input 
              required
              type="number" 
              name="own_contribution"
              value={formData.own_contribution || ''}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Total Project Cost (₹) <br/><span className="text-xs text-slate-500 font-normal">कुल परियोजना लागत (₹)</span></label>
            <input 
              required
              type="number" 
              name="project_cost"
              value={formData.project_cost || ''}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Expected Monthly Revenue (₹) <br/><span className="text-xs text-slate-500 font-normal">अपेक्षित मासिक आय (₹)</span></label>
            <input 
              required
              type="number" 
              name="expected_monthly_revenue"
              value={formData.expected_monthly_revenue || ''}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Monthly Expenses (₹) <br/><span className="text-xs text-slate-500 font-normal">मासिक खर्च (₹)</span></label>
            <input 
              required
              type="number" 
              name="monthly_expenses"
              value={formData.monthly_expenses || ''}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center min-w-[200px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              "Analyze / विश्लेषण करें"
            )}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Or load a demo scenario to see how it works:</p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => handleDemoClick('dairy_affordable')}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded border border-slate-300 hover:bg-slate-200"
            >
              📊 Load Dairy Demo (Affordable)
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('dairy_high_risk')}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded border border-slate-300 hover:bg-slate-200"
            >
              ⚠️ Load High-Risk Demo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
