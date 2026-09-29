from decimal import Decimal, ROUND_HALF_UP
from typing import List, Dict, Optional, Tuple

def calculate_loan_required(project_cost: float, own_contribution: float) -> Decimal:
    """Calculate loan amount needed."""
    return Decimal(str(project_cost)) - Decimal(str(own_contribution))

def calculate_eligible_loan(loan_required: Decimal, scheme: dict) -> Decimal:
    """Calculate eligible loan based on scheme limits."""
    max_by_pct = (Decimal(str(scheme['project_cost_max'])) * Decimal(str(scheme['max_loan_pct'])) / Decimal('100')).quantize(Decimal('1'), ROUND_HALF_UP)
    max_loan = Decimal(str(scheme['max_loan_amount']))
    eligible = min(loan_required, max_loan, max_by_pct)
    return max(eligible, Decimal('0'))

def calculate_quarterly_emi(principal: Decimal, annual_rate_pct: Decimal, tenure_months: int, moratorium_months: int) -> Decimal:
    """Calculate quarterly EMI using standard EMI formula.
    EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    where r = quarterly interest rate, n = number of quarterly payments
    """
    if principal <= 0 or annual_rate_pct <= 0 or tenure_months <= 0:
        return Decimal('0')
    
    # Quarterly rate
    r = annual_rate_pct / Decimal('400')  # annual_rate / 4 / 100
    
    # Number of repayment quarters (exclude moratorium)
    repayment_months = tenure_months - moratorium_months
    n = max(repayment_months // 3, 1)  # number of quarters
    
    # During moratorium, interest accrues on principal
    moratorium_quarters = moratorium_months // 3
    # Principal grows during moratorium (simple interest added to principal)
    accrued_interest = principal * r * Decimal(str(moratorium_quarters))
    effective_principal = principal + accrued_interest
    
    # EMI formula
    if r == 0:
        emi = effective_principal / Decimal(str(n))
    else:
        r_plus_1_pow_n = (Decimal('1') + r) ** n
        emi = effective_principal * r * r_plus_1_pow_n / (r_plus_1_pow_n - Decimal('1'))
    
    return emi.quantize(Decimal('1'), ROUND_HALF_UP)

def generate_repayment_schedule(
    principal: Decimal, 
    annual_rate_pct: Decimal, 
    tenure_months: int, 
    moratorium_months: int
) -> Tuple[List[Dict], Decimal, Decimal]:
    """Generate full quarterly repayment schedule.
    Returns: (schedule, total_repayment, total_interest)
    """
    if principal <= 0 or annual_rate_pct is None or annual_rate_pct <= 0:
        return [], Decimal('0'), Decimal('0')
    
    r = annual_rate_pct / Decimal('400')
    repayment_months = tenure_months - moratorium_months
    n = max(repayment_months // 3, 1)
    moratorium_quarters = moratorium_months // 3
    
    # Accrued interest during moratorium
    accrued_interest = principal * r * Decimal(str(moratorium_quarters))
    effective_principal = principal + accrued_interest
    
    emi = calculate_quarterly_emi(principal, annual_rate_pct, tenure_months, moratorium_months)
    
    schedule = []
    balance = effective_principal
    total_interest = accrued_interest  # Start with moratorium interest
    total_repayment = Decimal('0')
    
    for q in range(1, n + 1):
        interest_component = (balance * r).quantize(Decimal('1'), ROUND_HALF_UP)
        
        if q == n:  # Last quarter - pay remaining balance
            principal_component = balance
            actual_emi = balance + interest_component
        else:
            principal_component = emi - interest_component
            actual_emi = emi
        
        balance = balance - principal_component
        total_interest += interest_component
        total_repayment += actual_emi
        
        schedule.append({
            'quarter': q,
            'emi': float(actual_emi),
            'principal': float(principal_component.quantize(Decimal('1'), ROUND_HALF_UP)),
            'interest': float(interest_component),
            'balance': float(max(balance, Decimal('0')).quantize(Decimal('1'), ROUND_HALF_UP))
        })
    
    return schedule, total_repayment, total_interest

def build_financial_plan(project_cost: float, own_contribution: float, scheme: dict) -> Optional[Dict]:
    """Build complete financial plan for a scheme."""
    if scheme.get('interest_rate_pct') is None:
        # Cannot calculate without verified interest rate
        return {
            'scheme_name': scheme['name'],
            'scheme_id': scheme['id'],
            'loan_required': float(calculate_loan_required(project_cost, own_contribution)),
            'eligible_loan': 0,
            'own_contribution': own_contribution,
            'interest_rate_pct': None,
            'tenure_months': scheme['tenure_months'],
            'moratorium_months': scheme['moratorium_months'],
            'quarterly_emi': 0,
            'total_repayment': 0,
            'total_interest': 0,
            'repayment_schedule': [],
            'note': 'Interest rate not verified — cannot calculate repayment schedule'
        }
    
    loan_required = calculate_loan_required(project_cost, own_contribution)
    eligible_loan = calculate_eligible_loan(loan_required, scheme)
    
    if eligible_loan <= 0:
        return None
    
    rate = Decimal(str(scheme['interest_rate_pct']))
    schedule, total_repayment, total_interest = generate_repayment_schedule(
        eligible_loan, rate, scheme['tenure_months'], scheme['moratorium_months']
    )
    
    emi = calculate_quarterly_emi(eligible_loan, rate, scheme['tenure_months'], scheme['moratorium_months'])
    
    return {
        'scheme_name': scheme['name'],
        'scheme_id': scheme['id'],
        'loan_required': float(loan_required),
        'eligible_loan': float(eligible_loan),
        'own_contribution': own_contribution,
        'interest_rate_pct': scheme['interest_rate_pct'],
        'tenure_months': scheme['tenure_months'],
        'moratorium_months': scheme['moratorium_months'],
        'quarterly_emi': float(emi),
        'total_repayment': float(total_repayment),
        'total_interest': float(total_interest),
        'repayment_schedule': schedule
    }
