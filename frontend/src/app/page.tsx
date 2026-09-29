import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-emerald-800">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <span>🏛️ National Advisory Framework</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Public Service Innovation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            GRAM<span className="text-amber-400">SATHI</span>
            <span className="block text-2xl sm:text-3xl text-emerald-200 font-bold mt-2">
              ग्रामसाथी — साक्ष्य-आधारित वित्तीय सलाहकार
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-300 leading-relaxed font-normal">
            Evidence-First Business & Financial Advisory Assistant engineered for rural micro-entrepreneurs, self-help groups, and micro-finance facilitators across India.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link 
              href="/advisory" 
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-base font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              <span>Launch Advisory Desk</span>
              <span className="text-xs opacity-75">/ सलाह डेस्क शुरू करें</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <a 
              href="#philosophy"
              className="px-5 py-3.5 bg-stone-800/80 hover:bg-stone-800 text-stone-200 text-sm font-semibold rounded-lg border border-stone-700 transition-colors"
            >
              Explore Architecture
            </a>
          </div>
        </div>
      </section>

      {/* Core Philosophy Banner */}
      <section id="philosophy" className="bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-6 sm:p-8 text-center relative">
        <div className="inline-block bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-xs">
          Guiding Principle / मुख्य सिद्धांत
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          "NUMBERS FROM RULES. WORDS FROM AI."
        </h2>
        <p className="text-base text-stone-700 mt-2 font-medium max-w-2xl mx-auto">
          नंबर नियमों से, शब्द AI से — Financial figures, scheme limits, quarterly schedules & repayability stress tests are calculated by deterministic Python code. AI is used solely to explain results in simple Hindi.
        </p>
      </section>

      {/* 3 Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold">
            📍
          </div>
          <h3 className="text-xl font-bold text-stone-900">Hyper-Local Evidence</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Real spatial infrastructure mapping via OpenStreetMap (Overpass API) and localized climate parameters via Open-Meteo. Every data item is tagged as VERIFIED, DERIVED, or ESTIMATED.
          </p>
          <div className="text-xs font-semibold text-emerald-700 pt-2 flex items-center gap-1">
            <span>✓ Verified OSM Data</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-bold">
            🏛️
          </div>
          <h3 className="text-xl font-bold text-stone-900">Verified Scheme Rules</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Database-backed scheme rules for NSFDC Micro Finance, SUVIDHA, and UTKARSH loans with explicit source URLs (`nsfdc.nic.in`) and verification timestamps.
          </p>
          <div className="text-xs font-semibold text-amber-700 pt-2 flex items-center gap-1">
            <span>✓ NSFDC & Ministry Guidelines</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center text-2xl font-bold">
            🛡️
          </div>
          <h3 className="text-xl font-bold text-stone-900">Repayability Stress Test</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Determines affordability against quarterly business surplus. Prompts risk warnings for high-burden plans with an interactive modify-and-recalculate loop.
          </p>
          <div className="text-xs font-semibold text-indigo-700 pt-2 flex items-center gap-1">
            <span>✓ Base & Sensitivity Scenarios</span>
          </div>
        </div>

      </section>

      {/* Pre-Built Demo Showcase */}
      <section className="bg-stone-900 text-white rounded-2xl p-8 border border-stone-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-100">Ready Demo Scenarios</h2>
            <p className="text-sm text-stone-400 mt-1">
              Pre-configured test cases ready for instant evaluation without API keys.
            </p>
          </div>
          <Link 
            href="/advisory"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors self-start sm:self-auto"
          >
            Launch All Demos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-stone-800/80 rounded-xl p-6 border border-stone-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-900 text-emerald-200 border border-emerald-700">
                AFFORDABLE / किफायती
              </span>
              <span className="text-xs text-stone-400">Chandauli, UP</span>
            </div>
            <h3 className="text-lg font-bold text-stone-100">Dairy Farming — Affordable</h3>
            <ul className="text-xs text-stone-300 space-y-1.5 font-mono">
              <li>• Project Cost: ₹5,00,000</li>
              <li>• Own Contribution: ₹1,00,000</li>
              <li>• Monthly Revenue: ₹80,000 | Expenses: ₹48,000</li>
              <li>• Quarterly EMI: ₹27,748 vs Surplus: ₹96,000 (28.9% Burden)</li>
            </ul>
          </div>

          <div className="bg-stone-800/80 rounded-xl p-6 border border-stone-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-rose-900 text-rose-200 border border-rose-700">
                HIGH RISK / उच्च जोखिम
              </span>
              <span className="text-xs text-stone-400">Chandauli, UP</span>
            </div>
            <h3 className="text-lg font-bold text-stone-100">Dairy Farming — High Risk</h3>
            <ul className="text-xs text-stone-300 space-y-1.5 font-mono">
              <li>• Project Cost: ₹5,00,000</li>
              <li>• Own Contribution: ₹50,000</li>
              <li>• Monthly Revenue: ₹40,000 | Expenses: ₹35,000</li>
              <li>• Quarterly EMI: ₹31,217 vs Surplus: ₹15,000 (208% Burden)</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
