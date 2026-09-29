import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'GRAMSATHI — ग्रामसाथी',
  description: 'Evidence-First Business & Financial Advisory for Rural Micro-Entrepreneurs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 print:hidden">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-900">
              GRAMSATHI <span className="text-slate-500 font-normal">| ग्रामसाथी</span>
            </h1>
          </div>
        </header>
        <main className="flex-grow w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="bg-slate-800 text-slate-300 py-6 px-6 mt-12 text-center text-sm print:hidden">
          <p>Disclaimer: This tool is for advisory purposes only. It does not constitute loan approval.</p>
          <p className="mt-2 text-slate-500">© 2026 GRAMSATHI</p>
        </footer>
      </body>
    </html>
  );
}
