import datetime

def generate_report(analysis_results: dict) -> dict:
    return {
        'beneficiary_info': {
            'location': analysis_results.get('local_evidence', {}).get('village'),
            'business': analysis_results.get('demo_mode') # Add more details if necessary based on real request
        },
        'local_evidence_summary': {
            'total_mapped': analysis_results.get('local_evidence', {}).get('total_mapped', 0),
            'coverage': analysis_results.get('local_evidence', {}).get('coverage_note', '')
        },
        'feasibility_summary': {
            'local_fit': analysis_results.get('feasibility', {}).get('local_fit', {}).get('rating'),
            'opportunity': analysis_results.get('feasibility', {}).get('opportunity', {}).get('rating'),
            'competition': analysis_results.get('feasibility', {}).get('competition', {}).get('rating')
        },
        'scheme_details': [s.get('name') for s in analysis_results.get('matched_schemes', [])] if isinstance(analysis_results.get('matched_schemes'), list) else [],
        'financial_plan': analysis_results.get('financial_plans', [])[0] if analysis_results.get('financial_plans') else None,
        'repayability': {
            'verdict': analysis_results.get('repayability', {}).get('verdict'),
            'stress_test_results': analysis_results.get('repayability', {}).get('stress_scenarios', [])
        },
        'risks': analysis_results.get('feasibility', {}).get('risks', []),
        'recommendation': analysis_results.get('repayability', {}).get('recommendation'),
        'sources': [
            {'source_name': 'NSFDC', 'url': 'https://nsfdc.nic.in', 'verification_date': '2024-12-01'}
        ],
        'generated_at': datetime.datetime.now().isoformat(),
        'disclaimer': 'This report is generated for advisory purposes only. It does not constitute loan approval or financial guarantee.'
    }
