from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum

class DataConfidence(str, Enum):
    VERIFIED = 'VERIFIED'
    DERIVED = 'DERIVED'
    ESTIMATED = 'ESTIMATED'
    DEMO = 'DEMO'
    INSUFFICIENT_DATA = 'INSUFFICIENT_DATA'

class RepayabilityVerdict(str, Enum):
    AFFORDABLE = 'AFFORDABLE'
    CAUTION = 'CAUTION'
    HIGH_RISK = 'HIGH_RISK'
    NOT_VIABLE = 'NOT_VIABLE'

class UserInput(BaseModel):
    location: str
    business_idea: str
    own_contribution: float = Field(gt=0)
    project_cost: float = Field(gt=0)
    expected_monthly_revenue: float = Field(gt=0)
    monthly_expenses: float = Field(ge=0)

class NearbyBusiness(BaseModel):
    name: str
    type: str
    distance_km: float
    source: DataConfidence = DataConfidence.DEMO

class WeatherData(BaseModel):
    avg_temp_c: float
    annual_rainfall_mm: float
    extreme_heat_days: int = 0
    flood_risk: str = 'UNKNOWN'
    source: DataConfidence = DataConfidence.DEMO
    note: str = ''

class LocationEvidence(BaseModel):
    village: str
    district: str
    state: str
    lat: float
    lon: float
    nearby_businesses: List[NearbyBusiness]
    total_mapped: int
    similar_businesses: int
    search_radius_km: int
    data_source: DataConfidence
    data_date: str
    weather: WeatherData
    coverage_note: str

class FeasibilityIndicator(BaseModel):
    rating: str  # LOW, MEDIUM, HIGH
    evidence: str
    confidence: DataConfidence

class RiskFactor(BaseModel):
    factor: str
    severity: str  # LOW, MEDIUM, HIGH
    evidence: str

class FeasibilityAnalysis(BaseModel):
    local_fit: FeasibilityIndicator
    opportunity: FeasibilityIndicator
    competition: FeasibilityIndicator
    risks: List[RiskFactor]
    limitations: List[str]

class MatchedScheme(BaseModel):
    id: str
    name: str
    name_hi: str
    eligible_loan: float
    interest_rate_pct: Optional[float]
    tenure_months: int
    moratorium_months: int
    repayment_frequency: str
    eligibility_notes: str
    source_url: str
    verification_date: str
    confidence: DataConfidence

class RepaymentEntry(BaseModel):
    quarter: int
    emi: float
    principal: float
    interest: float
    balance: float

class FinancialPlan(BaseModel):
    scheme_name: str
    scheme_id: str
    loan_required: float
    eligible_loan: float
    own_contribution: float
    interest_rate_pct: Optional[float]
    tenure_months: int
    moratorium_months: int
    quarterly_emi: float
    total_repayment: float
    total_interest: float
    repayment_schedule: List[RepaymentEntry]

class StressScenario(BaseModel):
    scenario: str
    monthly_surplus: float
    quarterly_surplus: float
    quarterly_emi: float
    repayment_ratio: float
    verdict: RepayabilityVerdict

class RepayabilityResult(BaseModel):
    monthly_surplus: float
    quarterly_surplus: float
    quarterly_emi: float
    repayment_ratio: float
    verdict: RepayabilityVerdict
    stress_scenarios: List[StressScenario]
    recommendation: str

class AnalysisResponse(BaseModel):
    local_evidence: LocationEvidence
    feasibility: FeasibilityAnalysis
    matched_schemes: List[MatchedScheme]
    financial_plans: List[FinancialPlan]
    repayability: RepayabilityResult
    ai_explanation: str
    demo_mode: bool

class DemoScenario(BaseModel):
    id: str
    title: str
    title_hi: str
    location: str
    business_idea: str
    own_contribution: float
    project_cost: float
    expected_monthly_revenue: float
    monthly_expenses: float
