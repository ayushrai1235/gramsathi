export function formatINR(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return `${value.toFixed(1)}%`;
}

export function formatRatio(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return `${(value * 100).toFixed(1)}%`;
}

export function getVerdictColor(verdict: string): string {
  switch (verdict) {
    case 'AFFORDABLE': 
      return 'text-emerald-900 bg-emerald-50/90 border-emerald-300 shadow-sm';
    case 'CAUTION': 
      return 'text-amber-900 bg-amber-50/90 border-amber-300 shadow-sm';
    case 'HIGH_RISK': 
      return 'text-red-900 bg-rose-50/90 border-rose-300 shadow-sm';
    case 'NOT_VIABLE': 
      return 'text-red-950 bg-red-100 border-red-400 shadow-sm';
    default: 
      return 'text-stone-800 bg-stone-100 border-stone-300';
  }
}

export function getVerdictLabel(verdict: string): string {
  switch (verdict) {
    case 'AFFORDABLE': return '✓ AFFORDABLE / किफायती';
    case 'CAUTION': return '⚠ CAUTION / सावधानी';
    case 'HIGH_RISK': return '✕ HIGH RISK / उच्च जोखिम';
    case 'NOT_VIABLE': return '🚫 NOT VIABLE / व्यवहार्य नहीं';
    default: return verdict;
  }
}

export function getConfidenceBadge(confidence: string): string {
  switch (confidence) {
    case 'VERIFIED': 
      return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold';
    case 'DERIVED': 
      return 'bg-sky-100 text-sky-800 border-sky-300 font-semibold';
    case 'ESTIMATED': 
      return 'bg-amber-100 text-amber-800 border-amber-300 font-semibold';
    case 'DEMO': 
      return 'bg-indigo-100 text-indigo-800 border-indigo-300 font-semibold';
    case 'INSUFFICIENT_DATA': 
      return 'bg-rose-100 text-rose-800 border-rose-300 font-semibold';
    default: 
      return 'bg-stone-100 text-stone-700 border-stone-300';
  }
}

export function getRatingPill(rating: string): string {
  switch (rating) {
    case 'HIGH': return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold';
    case 'MEDIUM': return 'bg-amber-100 text-amber-800 border-amber-200 font-semibold';
    case 'LOW': return 'bg-rose-100 text-rose-800 border-rose-200 font-semibold';
    default: return 'bg-stone-100 text-stone-700 border-stone-200';
  }
}

export function getRatingColor(rating: string): string {
  switch (rating) {
    case 'HIGH': return 'text-emerald-700 font-semibold';
    case 'MEDIUM': return 'text-amber-700 font-semibold';
    case 'LOW': return 'text-rose-700 font-semibold';
    default: return 'text-stone-700 font-semibold';
  }
}
