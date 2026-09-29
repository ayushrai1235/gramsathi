from schemas import FeasibilityAnalysis, FeasibilityIndicator, RiskFactor, LocationEvidence, DataConfidence
from data.schemes import BUSINESS_TYPES

def analyze_feasibility(business_idea: str, evidence: LocationEvidence) -> FeasibilityAnalysis:
    similar_count = 0
    # simple substring match for demo purposes
    business_key = business_idea.lower()
    
    # check for similar businesses
    for b in evidence.nearby_businesses:
        if business_key in b.type.lower() or business_key in b.name.lower():
            similar_count += 1
            
    evidence.similar_businesses = similar_count
    
    # Opportunity
    if similar_count <= 1:
        opp_rating = 'HIGH'
        opp_ev = '0-1 similar businesses found.'
    elif 2 <= similar_count <= 3:
        opp_rating = 'MEDIUM'
        opp_ev = '2-3 similar businesses found.'
    else:
        opp_rating = 'LOW'
        opp_ev = 'Market may be saturated with 4+ similar businesses.'

    # Competition
    if similar_count <= 1:
        comp_rating = 'LOW'
        comp_ev = 'Low local competition.'
    elif 2 <= similar_count <= 3:
        comp_rating = 'MEDIUM'
        comp_ev = 'Moderate local competition.'
    else:
        comp_rating = 'HIGH'
        comp_ev = 'High local competition.'

    # Local Fit
    # Check for banks or basic infrastructure
    infra = sum(1 for b in evidence.nearby_businesses if b.type in ['bank', 'health', 'veterinary', 'agriculture'])
    if infra > 0:
        fit_rating = 'HIGH'
        fit_ev = 'Supporting infrastructure found.'
    else:
        fit_rating = 'MEDIUM'
        fit_ev = 'Limited supporting infrastructure found.'
        
    risks = []
    if evidence.weather.flood_risk == 'MODERATE' or evidence.weather.flood_risk == 'HIGH':
        risks.append(RiskFactor(factor='Flood Risk', severity=evidence.weather.flood_risk, evidence=f'Region has {evidence.weather.flood_risk.lower()} flood risk.'))
    if evidence.weather.extreme_heat_days > 30:
        risks.append(RiskFactor(factor='Extreme Heat', severity='MEDIUM', evidence=f'{evidence.weather.extreme_heat_days} extreme heat days annually.'))

    limitations = [
        'OSM coverage in rural India may be incomplete',
        'Business counts may not reflect unregistered enterprises'
    ]

    return FeasibilityAnalysis(
        local_fit=FeasibilityIndicator(rating=fit_rating, evidence=fit_ev, confidence=evidence.data_source),
        opportunity=FeasibilityIndicator(rating=opp_rating, evidence=opp_ev, confidence=evidence.data_source),
        competition=FeasibilityIndicator(rating=comp_rating, evidence=comp_ev, confidence=evidence.data_source),
        risks=risks,
        limitations=limitations
    )
