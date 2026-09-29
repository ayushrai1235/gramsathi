import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          GRAM<span className="text-blue-700">SATHI</span>
          <span className="block text-3xl md:text-4xl text-slate-600 mt-2 font-medium">ग्रामसाथी</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 mb-2 font-medium">
          Evidence-First Business & Financial Advisory for Rural Micro-Entrepreneurs
        </p>
        <p className="text-lg text-slate-500 mb-12">
          ग्रामीण सूक्ष्म उद्यमियों के लिए साक्ष्य-आधारित व्यवसाय और वित्तीय सलाह
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-left">
            <h3 className="text-lg font-bold text-slate-800 mb-2">📍 Local Evidence</h3>
            <p className="text-slate-600">Real data from OpenStreetMap + Weather.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-left">
            <h3 className="text-lg font-bold text-slate-800 mb-2">💰 Financial Rules Engine</h3>
            <p className="text-slate-600">Deterministic calculations, never AI-generated.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-left">
            <h3 className="text-lg font-bold text-slate-800 mb-2">🛡️ Repayability Test</h3>
            <p className="text-slate-600">Stress-tested affordability analysis.</p>
          </div>
        </div>
        
        <Link 
          href="/advisory" 
          className="inline-block px-8 py-4 bg-blue-700 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-800 transition-colors"
        >
          Start New Advisory
        </Link>
        
        <div className="mt-16 inline-block bg-slate-100 border border-slate-300 px-6 py-3 rounded-full text-slate-700 text-sm font-medium">
          नंबर नियमों से, शब्द AI से — Numbers from Rules, Words from AI
        </div>
      </div>
    </div>
  );
}
