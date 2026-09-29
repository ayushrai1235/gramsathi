import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'GRAMSATHI — ग्रामसाथी | Rural Business & Financial Advisory',
  description: 'Evidence-First Business & Financial Advisory Platform for Rural Micro-Entrepreneurs in India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-100/70 text-stone-900 min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900`}>
        
        {/* Subtle Indian Civic Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-emerald-700 to-emerald-900 print:hidden" />

        {/* Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-30 shadow-xs print:hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Emblem / Badge Icon */}
              <div className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-emerald-700 transition-colors">
                ग
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-stone-900 tracking-tight">
                    GRAM<span className="text-emerald-700">SATHI</span>
                  </span>
                  <span className="text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    ग्रामसाथी
                  </span>
                </div>
                <p className="text-xs text-stone-500 hidden sm:block">
                  Evidence-First Rural Advisory System • ग्रामीण सूक्ष्म-उद्यमी परामर्श प्रणाली
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Official Rules Engine
              </span>

              <Link
                href="/advisory"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Advisory Desk</span>
                <span className="text-xs text-emerald-200">/ सलाह</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-grow w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-300 py-8 px-6 mt-16 text-center text-sm border-t border-stone-800 print:hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="font-bold text-stone-100 text-base">GRAMSATHI (ग्रामसाथी)</p>
              <p className="text-stone-400 text-xs mt-1">
                Evidence-First Hyper-Local Business & Financial Advisory Assistant
              </p>
            </div>
            <div className="text-stone-400 text-xs max-w-md text-center md:text-right">
              <p className="font-semibold text-emerald-400">"Numbers from Rules. Words from AI."</p>
              <p className="mt-1">For public-service evaluation & decision support. Not a bank credit sanction.</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-stone-800 text-xs text-stone-500 flex justify-between items-center">
            <span>© 2026 GRAMSATHI • National Financial Advisory Protocol</span>
            <span>Verified Rules Engine v1.0</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
