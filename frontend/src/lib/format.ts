export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatRatio(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function getVerdictColor(verdict: string): string {
  switch (verdict) {
    case 'AFFORDABLE': return 'text-green-700 bg-green-50 border-green-200';
    case 'CAUTION': return 'text-amber-700 bg-amber-50 border-amber-200';
    case 'HIGH_RISK': return 'text-red-700 bg-red-50 border-red-200';
    case 'NOT_VIABLE': return 'text-red-900 bg-red-100 border-red-300';
    default: return 'text-slate-700 bg-slate-50 border-slate-200';
  }
}

export function getVerdictLabel(verdict: string): string {
  switch (verdict) {
    case 'AFFORDABLE': return '✅ Affordable / किफायती';
    case 'CAUTION': return '⚠️ Caution / सावधानी';
    case 'HIGH_RISK': return '❌ High Risk / उच्च जोखिम';
    case 'NOT_VIABLE': return '🚫 Not Viable / व्यवहार्य नहीं';
    default: return verdict;
  }
}

export function getConfidenceBadge(confidence: string): string {
  switch (confidence) {
    case 'VERIFIED': return 'bg-green-100 text-green-800 border-green-200';
    case 'DERIVED': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ESTIMATED': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'DEMO': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'INSUFFICIENT_DATA': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
}

export function getRatingColor(rating: string): string {
  switch (rating) {
    case 'HIGH': return 'text-green-700 font-medium';
    case 'MEDIUM': return 'text-amber-700 font-medium';
    case 'LOW': return 'text-red-700 font-medium';
    default: return 'text-slate-700 font-medium';
  }
}
