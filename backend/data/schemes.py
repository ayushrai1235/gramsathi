SCHEMES = [
    {
        'id': 'nsfdc_micro_finance',
        'name': 'NSFDC Micro Finance Scheme',
        'name_hi': 'NSFDC माइक्रो फाइनेंस योजना',
        'project_cost_min': 0,
        'project_cost_max': 140000,  # ₹1.40 Lakh
        'max_loan_amount': 125000,   # ₹1.25 Lakh
        'max_loan_pct': 90,
        'interest_rate_pct': 6.5,    # VERIFIED
        'tenure_months': 36,         # Up to 3 years
        'moratorium_months': 3,
        'repayment_frequency': 'quarterly',
        'eligibility_notes': 'SC community, family income ≤ ₹5 lakh p.a., age ≥ 18',
        'source_url': 'https://nsfdc.nic.in/en/micro-credit-finance',
        'verification_date': '2024-12-01',
        'confidence': 'VERIFIED',
        'version': 1
    },
    {
        'id': 'nsfdc_suvidha',
        'name': 'NSFDC SUVIDHA Loan',
        'name_hi': 'NSFDC सुविधा ऋण',
        'project_cost_min': 0,
        'project_cost_max': 1000000,  # ₹10 Lakh
        'max_loan_amount': 900000,    # ₹9 Lakh
        'max_loan_pct': 90,
        'interest_rate_pct': 8.0,     # VERIFIED
        'tenure_months': 60,          # Up to 5 years
        'moratorium_months': 6,
        'repayment_frequency': 'quarterly',
        'eligibility_notes': 'SC community, family income ≤ ₹5 lakh p.a., viable business proposal',
        'source_url': 'https://nsfdc.nic.in/en/term-loan',
        'verification_date': '2024-12-01',
        'confidence': 'VERIFIED',
        'version': 1
    },
    {
        'id': 'nsfdc_utkarsh',
        'name': 'NSFDC UTKARSH Loan',
        'name_hi': 'NSFDC उत्कर्ष ऋण',
        'project_cost_min': 1000000,  # ₹10 Lakh
        'project_cost_max': 5000000,  # ₹50 Lakh
        'max_loan_amount': 4500000,   # ₹45 Lakh
        'max_loan_pct': 90,
        'interest_rate_pct': None,     # UNVERIFIED - do NOT invent
        'tenure_months': 84,           # Up to 7 years
        'moratorium_months': 6,
        'repayment_frequency': 'quarterly',
        'eligibility_notes': 'SC community, family income ≤ ₹5 lakh p.a., DPR required',
        'source_url': 'https://nsfdc.nic.in/en/term-loan',
        'verification_date': '2024-12-01',
        'confidence': 'ESTIMATED',
        'version': 1
    }
]

DEMO_LOCATIONS = {
    'chandauli': {
        'village': 'Chandauli',
        'district': 'Chandauli',
        'state': 'Uttar Pradesh',
        'lat': 25.2581,
        'lon': 83.2690,
        'nearby_businesses': [
            {'name': 'Sharma Dairy', 'type': 'dairy', 'distance_km': 2.3, 'source': 'DEMO'},
            {'name': 'Kisan Milk Collection Centre', 'type': 'dairy', 'distance_km': 3.7, 'source': 'DEMO'},
            {'name': 'Village General Store', 'type': 'general', 'distance_km': 0.5, 'source': 'DEMO'},
            {'name': 'SBI Branch', 'type': 'bank', 'distance_km': 1.8, 'source': 'DEMO'},
            {'name': 'Primary Health Centre', 'type': 'health', 'distance_km': 2.1, 'source': 'DEMO'},
            {'name': 'Veterinary Hospital', 'type': 'veterinary', 'distance_km': 4.2, 'source': 'DEMO'},
            {'name': 'Krishi Seva Kendra', 'type': 'agriculture', 'distance_km': 3.0, 'source': 'DEMO'},
            {'name': 'Patel Kirana Store', 'type': 'general', 'distance_km': 1.2, 'source': 'DEMO'},
        ],
        'weather': {
            'avg_temp_c': 26.5,
            'annual_rainfall_mm': 1050,
            'extreme_heat_days': 45,
            'flood_risk': 'MODERATE',
            'source': 'DEMO',
            'note': 'Gangetic plain, subtropical climate'
        }
    }
}

BUSINESS_TYPES = {
    'dairy': {
        'name_en': 'Dairy Farming',
        'name_hi': 'डेयरी फार्मिंग',
        'osm_tags': ['shop=dairy', 'craft=dairy', 'shop=cheese'],
        'typical_revenue_range': [30000, 120000],
        'typical_expense_pct': [50, 70],
        'seasonal_notes': 'Milk yield varies seasonally. Summer: lower yield. Monsoon: fodder availability varies.'
    },
    'grocery': {
        'name_en': 'Grocery / Kirana Store',
        'name_hi': 'किराना स्टोर',
        'osm_tags': ['shop=general', 'shop=convenience'],
        'typical_revenue_range': [20000, 80000],
        'typical_expense_pct': [60, 80],
        'seasonal_notes': 'Relatively stable demand year-round.'
    },
    'tailoring': {
        'name_en': 'Tailoring / Garment Shop',
        'name_hi': 'सिलाई / कपड़े की दुकान',
        'osm_tags': ['shop=clothes', 'craft=tailor'],
        'typical_revenue_range': [15000, 60000],
        'typical_expense_pct': [40, 60],
        'seasonal_notes': 'Peak demand during festival and wedding seasons.'
    }
}

DEMO_SCENARIOS = {
    'dairy_affordable': {
        'title': 'Dairy Farming — Affordable Scenario',
        'title_hi': 'डेयरी फार्मिंग — किफायती परिदृश्य',
        'location': 'Chandauli, Uttar Pradesh',
        'business_idea': 'Dairy Farming',
        'own_contribution': 100000,
        'project_cost': 500000,
        'expected_monthly_revenue': 80000,
        'monthly_expenses': 48000
    },
    'dairy_high_risk': {
        'title': 'Dairy Farming — High Risk Scenario',
        'title_hi': 'डेयरी फार्मिंग — उच्च जोखिम परिदृश्य',
        'location': 'Chandauli, Uttar Pradesh',
        'business_idea': 'Dairy Farming',
        'own_contribution': 50000,
        'project_cost': 500000,
        'expected_monthly_revenue': 40000,
        'monthly_expenses': 35000
    }
}
