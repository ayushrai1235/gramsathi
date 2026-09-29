from schemas import RepayabilityResult, StressScenario, RepayabilityVerdict

def evaluate_verdict(monthly_surplus: float, quarterly_surplus: float, quarterly_emi: float) -> tuple[RepayabilityVerdict, str]:
    if monthly_surplus <= 0:
        return RepayabilityVerdict.NOT_VIABLE, 'Monthly expenses exceed or equal revenue. The business plan needs fundamental revision.'
    
    if quarterly_surplus == 0:
        return RepayabilityVerdict.NOT_VIABLE, 'Quarterly surplus is zero.'

    ratio = quarterly_emi / quarterly_surplus
    
    if ratio <= 0.40:
        return RepayabilityVerdict.AFFORDABLE, 'Repayment is well within projected business surplus.'
    elif 0.40 < ratio <= 0.60:
        return RepayabilityVerdict.CAUTION, 'Repayment is manageable but leaves limited buffer. Consider reducing loan amount or increasing revenue projections.'
    else:
        return RepayabilityVerdict.HIGH_RISK, 'Reduce project cost, increase own contribution, or review business plan to lower repayment burden.'

def run_stress_test(revenue: float, expenses: float, quarterly_emi: float) -> RepayabilityResult:
    scenarios = []
    
    # Base Case
    ms_base = revenue - expenses
    qs_base = ms_base * 3
    ratio_base = quarterly_emi / qs_base if qs_base > 0 else float('inf')
    verdict_base, rec_base = evaluate_verdict(ms_base, qs_base, quarterly_emi)
    scenarios.append(StressScenario(
        scenario='Base Case',
        monthly_surplus=ms_base,
        quarterly_surplus=qs_base,
        quarterly_emi=quarterly_emi,
        repayment_ratio=ratio_base,
        verdict=verdict_base
    ))
    
    # Revenue drops 20%
    ms_rev_drop = (revenue * 0.8) - expenses
    qs_rev_drop = ms_rev_drop * 3
    ratio_rev_drop = quarterly_emi / qs_rev_drop if qs_rev_drop > 0 else float('inf')
    verdict_rev_drop, _ = evaluate_verdict(ms_rev_drop, qs_rev_drop, quarterly_emi)
    scenarios.append(StressScenario(
        scenario='Revenue drops 20%',
        monthly_surplus=ms_rev_drop,
        quarterly_surplus=qs_rev_drop,
        quarterly_emi=quarterly_emi,
        repayment_ratio=ratio_rev_drop,
        verdict=verdict_rev_drop
    ))
    
    # Expenses increase 20%
    ms_exp_inc = revenue - (expenses * 1.2)
    qs_exp_inc = ms_exp_inc * 3
    ratio_exp_inc = quarterly_emi / qs_exp_inc if qs_exp_inc > 0 else float('inf')
    verdict_exp_inc, _ = evaluate_verdict(ms_exp_inc, qs_exp_inc, quarterly_emi)
    scenarios.append(StressScenario(
        scenario='Expenses increase 20%',
        monthly_surplus=ms_exp_inc,
        quarterly_surplus=qs_exp_inc,
        quarterly_emi=quarterly_emi,
        repayment_ratio=ratio_exp_inc,
        verdict=verdict_exp_inc
    ))
    
    return RepayabilityResult(
        monthly_surplus=ms_base,
        quarterly_surplus=qs_base,
        quarterly_emi=quarterly_emi,
        repayment_ratio=ratio_base,
        verdict=verdict_base,
        stress_scenarios=scenarios,
        recommendation=rec_base
    )
