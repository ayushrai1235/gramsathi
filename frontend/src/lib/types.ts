export type DataConfidence = 'VERIFIED' | 'DERIVED' | 'ESTIMATED' | 'DEMO' | 'INSUFFICIENT_DATA';
export type RepayabilityVerdict = 'AFFORDABLE' | 'CAUTION' | 'HIGH_RISK' | 'NOT_VIABLE';

export interface UserInput {
  location: string;
  business_idea: string;
  own_contribution: number;
  project_cost: number;
  expected_monthly_revenue: number;
  monthly_expenses: number;
}

export interface NearbyBusiness {
  name: string;
  type: string;
  distance_km: number;
  source: DataConfidence;
}

export interface WeatherData {
  avg_temp_c: number;
  annual_rainfall_mm: number;
  extreme_heat_days: number;
  flood_risk: string;
  source: DataConfidence;
  note: string;
}

export interface LocationEvidence {
  village: string;
  district: string;
  state: string;
  lat: number;
  lon: number;
  nearby_businesses: NearbyBusiness[];
  total_mapped: number;
  similar_businesses: number;
  search_radius_km: number;
  data_source: DataConfidence;
  data_date: string;
  weather: WeatherData;
  coverage_note: string;
}

export interface FeasibilityIndicator {
  rating: string;
  evidence: string;
  confidence: DataConfidence;
}

export interface RiskFactor {
  factor: string;
  severity: string;
  evidence: string;
}

export interface FeasibilityAnalysis {
  local_fit: FeasibilityIndicator;
  opportunity: FeasibilityIndicator;
  competition: FeasibilityIndicator;
  risks: RiskFactor[];
  limitations: string[];
}

export interface MatchedScheme {
  id: string;
  name: string;
  name_hi: string;
  eligible_loan: number;
  interest_rate_pct: number | null;
  tenure_months: number;
  moratorium_months: number;
  repayment_frequency: string;
  eligibility_notes: string;
  source_url: string;
  verification_date: string;
  confidence: DataConfidence;
}

export interface RepaymentEntry {
  quarter: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface FinancialPlan {
  scheme_name: string;
  scheme_id: string;
  loan_required: number;
  eligible_loan: number;
  own_contribution: number;
  interest_rate_pct: number | null;
  tenure_months: number;
  moratorium_months: number;
  quarterly_emi: number;
  total_repayment: number;
  total_interest: number;
  repayment_schedule: RepaymentEntry[];
}

export interface StressScenario {
  scenario: string;
  monthly_surplus: number;
  quarterly_surplus: number;
  quarterly_emi: number;
  repayment_ratio: number;
  verdict: RepayabilityVerdict;
}

export interface RepayabilityResult {
  monthly_surplus: number;
  quarterly_surplus: number;
  quarterly_emi: number;
  repayment_ratio: number;
  verdict: RepayabilityVerdict;
  stress_scenarios: StressScenario[];
  recommendation: string;
}

export interface AnalysisResponse {
  local_evidence: LocationEvidence;
  feasibility: FeasibilityAnalysis;
  matched_schemes: MatchedScheme[];
  financial_plans: FinancialPlan[];
  repayability: RepayabilityResult;
  ai_explanation: string;
  demo_mode: boolean;
}

export interface DemoScenario {
  id: string;
  title: string;
  title_hi: string;
  location: string;
  business_idea: string;
  own_contribution: number;
  project_cost: number;
  expected_monthly_revenue: number;
  monthly_expenses: number;
}
