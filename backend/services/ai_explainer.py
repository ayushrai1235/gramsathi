import httpx
from config import settings

async def generate_explanation(analysis_results: dict) -> str:
    # Prepare template variables safely
    loc = analysis_results.get('local_evidence', {})
    business = analysis_results.get('feasibility', {}) # Just an example structure access
    repay = analysis_results.get('repayability', {})
    fin_plans = analysis_results.get('financial_plans', [])
    
    project_cost = '0'
    own_cont = '0'
    scheme_name = 'Unknown Scheme'
    eligible_loan = '0'
    rate = '0'
    emi = '0'
    
    if fin_plans:
        plan = fin_plans[0]
        project_cost = str(plan.get('loan_required', 0) + plan.get('own_contribution', 0))
        own_cont = str(plan.get('own_contribution', 0))
        scheme_name = plan.get('scheme_name', '')
        eligible_loan = str(plan.get('eligible_loan', 0))
        rate = str(plan.get('interest_rate_pct') or 0)
        emi = str(plan.get('quarterly_emi', 0))
        
    surplus = str(repay.get('monthly_surplus', 0))
    verdict_text = repay.get('verdict', '')
    
    demo_explanation = f'आपकी योजना के लिए: कुल परियोजना लागत ₹{project_cost} है। आपका अपना योगदान ₹{own_cont} है। {scheme_name} के तहत ₹{eligible_loan} का ऋण {rate}% ब्याज दर पर उपलब्ध है। हर तिमाही ₹{emi} की किस्त भरनी होगी। आपका मासिक अधिशेष ₹{surplus} है, जो {verdict_text} श्रेणी में आता है।\n\n⚠️ यह AI द्वारा तैयार व्याख्या है। सभी आंकड़े नियम-आधारित गणना से हैं। यह ऋण स्वीकृति नहीं है।'

    if settings.DEMO_MODE or not settings.GEMINI_API_KEY:
        return demo_explanation
        
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            payload = {
                "contents": [{"parts": [{"text": f"You are a rural financial advisor. Explain the following pre-calculated financial results in simple Hindi/Hinglish. Do NOT calculate any numbers. Do NOT change any figures. Do NOT claim loan approval. Simply explain what these numbers mean for the entrepreneur in simple language.\n\nResults: {analysis_results}"}]}]
            }
            res = await client.post(
                f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={settings.GEMINI_API_KEY}',
                json=payload
            )
            if res.status_code == 200:
                data = res.json()
                text = data['candidates'][0]['content']['parts'][0]['text']
                return text + '\n\n⚠️ यह AI द्वारा तैयार व्याख्या है। सभी आंकड़े नियम-आधारित गणना से हैं। यह ऋण स्वीकृति नहीं है।'
    except Exception:
        pass
        
    return demo_explanation
