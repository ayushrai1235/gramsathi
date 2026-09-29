from fastapi import APIRouter
from schemas import UserInput, AnalysisResponse, DemoScenario, MatchedScheme
from services.geo_service import get_location_evidence
from services.feasibility_engine import analyze_feasibility
from services.scheme_matcher import match_schemes
from services.financial_engine import build_financial_plan
from services.stress_test import run_stress_test
from services.ai_explainer import generate_explanation
from services.report_generator import generate_report
from data.schemes import SCHEMES, DEMO_SCENARIOS
from config import settings

router = APIRouter(prefix='/api', tags=['analysis'])

@router.post('/analyze', response_model=AnalysisResponse)
async def analyze(input: UserInput):
    evidence = await get_location_evidence(input.location)
    feasibility = analyze_feasibility(input.business_idea, evidence)
    
    schemes = match_schemes(input.project_cost, input.own_contribution)
    
    financial_plans = []
    for s in SCHEMES:
        for ms in schemes:
            if s['id'] == ms.id:
                plan = build_financial_plan(input.project_cost, input.own_contribution, s)
                if plan:
                    financial_plans.append(plan)

    best_plan = None
    if financial_plans:
        # sorted by eligible loan desc in match_schemes, keep same logic
        best_plan = financial_plans[0]
        
    quarterly_emi = best_plan['quarterly_emi'] if best_plan else 0
    repayability = run_stress_test(input.expected_monthly_revenue, input.monthly_expenses, quarterly_emi)
    
    analysis_dict = {
        'local_evidence': evidence.model_dump(),
        'feasibility': feasibility.model_dump(),
        'matched_schemes': [s.model_dump() for s in schemes],
        'financial_plans': financial_plans,
        'repayability': repayability.model_dump(),
        'demo_mode': settings.DEMO_MODE
    }
    
    explanation = await generate_explanation(analysis_dict)
    
    return AnalysisResponse(
        local_evidence=evidence,
        feasibility=feasibility,
        matched_schemes=schemes,
        financial_plans=financial_plans,
        repayability=repayability,
        ai_explanation=explanation,
        demo_mode=settings.DEMO_MODE
    )

@router.post('/recalculate', response_model=AnalysisResponse)
async def recalculate(input: UserInput):
    return await analyze(input)

@router.get('/schemes')
async def list_schemes():
    return SCHEMES

@router.get('/demo-scenarios')
async def get_demo_scenarios():
    return DEMO_SCENARIOS
