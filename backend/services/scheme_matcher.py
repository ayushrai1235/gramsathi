from data.schemes import SCHEMES
from services.financial_engine import calculate_loan_required, calculate_eligible_loan
from schemas import MatchedScheme, DataConfidence

def match_schemes(project_cost: float, own_contribution: float) -> list[MatchedScheme]:
    matched = []
    
    for scheme in SCHEMES:
        if scheme['project_cost_min'] <= project_cost <= scheme['project_cost_max']:
            loan_required = float(calculate_loan_required(project_cost, own_contribution))
            eligible = float(calculate_eligible_loan(calculate_loan_required(project_cost, own_contribution), scheme))
            
            matched.append(MatchedScheme(
                id=scheme['id'],
                name=scheme['name'],
                name_hi=scheme['name_hi'],
                eligible_loan=eligible,
                interest_rate_pct=scheme.get('interest_rate_pct'),
                tenure_months=scheme['tenure_months'],
                moratorium_months=scheme['moratorium_months'],
                repayment_frequency=scheme['repayment_frequency'],
                eligibility_notes=scheme['eligibility_notes'],
                source_url=scheme['source_url'],
                verification_date=scheme['verification_date'],
                confidence=DataConfidence(scheme['confidence'])
            ))
            
    # Sort by eligible loan descending
    matched.sort(key=lambda x: x.eligible_loan, reverse=True)
    return matched
