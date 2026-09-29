# GRAMSATHI (ग्रामसाथी)
### An Evidence-First Hyper-Local Business & Financial Advisory Assistant for Rural Micro-Entrepreneurs

> **Core Philosophy:** *"NUMBERS FROM RULES. WORDS FROM AI."*

GRAMSATHI is a public-service oriented, evidence-backed advisory platform designed for rural micro-entrepreneurs in India. Instead of relying on generic AI chatbots that invent numbers or halluncinate financial terms, GRAMSATHI enforces strict separation between **rule-based financial calculation engines** and **AI-powered natural language explanations in Hindi/Hinglish**.

---

## 🚀 Key Features & Architectural Modules

### 1. Location & Local Evidence Panel
- **Spatial Infrastructure Mapping:** Queries OpenStreetMap (Overpass API) within a 5–10 km radius to identify existing commercial units (dairies, general stores, banks, health centers, veterinary clinics).
- **Climate Indicators:** Integrates with Open-Meteo API for historical and localized climate metrics (annual rainfall, extreme heat days, flood risk).
- **Honest Evidence Labeling:** Every data element is explicitly tagged as `VERIFIED`, `DERIVED`, `ESTIMATED`, `DEMO`, or `INSUFFICIENT DATA`.
- **Demo Fallback Engine:** Gracefully serves pre-mapped illustrative data when external mapping APIs are offline or unmapped.

### 2. Business Feasibility Analysis
- **Qualitative Assessment:** Evaluates **Local Fit**, **Market Opportunity**, **Local Competition**, and **Environmental Risks**.
- **Zero Fake Precision:** Completely avoids arbitrary or unsupported percentages; provides clear, evidence-cited qualitative ratings (`HIGH`, `MEDIUM`, `LOW`).
- **Dataset Limitation Transparency:** Discloses mapping limitations in rural areas openly to loan officers and entrepreneurs.

### 3. Versioned Government Scheme Engine
- **Structured Database Rules:** Stores versioned scheme parameters in PostgreSQL / Supabase, backed by Python definitions.
- **Verified NSFDC Scheme Rules:**
  - **NSFDC Micro Finance Scheme:** Projects $\le$ ₹1.40 Lakh, Loan $\le$ ₹1.25 Lakh (up to 90%), **6.5% p.a. interest**, quarterly repayment, up to 3 years tenure, 3-month moratorium.
  - **NSFDC SUVIDHA Loan:** Projects $\le$ ₹10.00 Lakh, Loan $\le$ ₹9.00 Lakh (up to 90%), **8.0% p.a. interest**, quarterly repayment, up to 5 years tenure, 6-month moratorium.
  - **NSFDC UTKARSH Loan:** Projects ₹10.00 Lakh – ₹50.00 Lakh, Loan $\le$ ₹45.00 Lakh (up to 90%), unverified rate/tenure clearly flagged as `ESTIMATED` / unverified.
- **Traceability:** Every rule records its official source URL (`nsfdc.nic.in`) and verification date (`2024-12-01`).

### 4. Deterministic Financial Rules Engine
- **Exact Decimal Arithmetic:** Built using Python's `Decimal` module to prevent floating-point rounding errors.
- **Quarterly EMI Calculation:** Evaluates compound moratorium interest and computes precise quarterly repayment schedules.
- **No AI Arithmetic:** Strictly isolates financial calculations from LLMs.

### 5. Repayability Stress Test (Core Module)
- **Surplus vs. Burden Analysis:** Compares quarterly business surplus against quarterly EMI commitments.
- **Dynamic Risk Verdicts:**
  - `AFFORDABLE` ($\le 40\%$ burden ratio)
  - `CAUTION` ($40\% - 60\%$ burden ratio)
  - `HIGH_RISK` ($> 60\%$ burden ratio) — Triggers warning: *"Reduce loan or modify business plan / ऋण कम करें या व्यवसाय योजना में बदलाव करें"*
  - `NOT_VIABLE` (Surplus $\le 0$)
- **Stress Scenarios:** Tests resilience against a $20\%$ drop in revenue and a $20\%$ increase in monthly expenses.
- **Interactive Recalculate Loop:** Real-time form allowing users to modify project cost, own contribution, revenue, or expenses and instantly re-run the pipeline.

### 6. AI Explanation Module (Hindi / Hinglish)
- **Controlled LLM Role:** Uses Gemini AI strictly to summarize and explain the already-calculated results in accessible Hindi/Hinglish.
- **Strict Guardrails:** AI cannot invent scheme terms, alter financial figures, or claim loan approval.
- **Disclaimers Included:** Disclaims AI generation on output views.

### 7. Officer-Ready Printable Report
- Standardized advisory report view summarizing: Beneficiary $\rightarrow$ Location $\rightarrow$ Business $\rightarrow$ Evidence $\rightarrow$ Feasibility $\rightarrow$ Scheme $\rightarrow$ Financial Plan $\rightarrow$ Repayment Schedule $\rightarrow$ Repayability $\rightarrow$ Risks $\rightarrow$ Official Sources & Verification Dates.
- Includes clean CSS print styling via browser `window.print()`.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router + Turbopack), TypeScript, Tailwind CSS
- **Backend:** FastAPI, Python 3.14, Pydantic v2, `Decimal` engine
- **Database:** Supabase PostgreSQL (Schema + Migration + Seed data)
- **Spatial & Weather APIs:** OpenStreetMap / Overpass API, Open-Meteo API, Nominatim Geocoding
- **AI Integration:** Google Gemini API (`gemini-2.0-flash`) with Demo Mode fallback

---

## 📁 Repository Structure

```
gramsathi/
├── backend/
│   ├── main.py               # FastAPI entrypoint with CORS & route registration
│   ├── config.py             # Configuration & environment loader
│   ├── schemas.py            # Pydantic request/response models
│   ├── data/
│   │   └── schemes.py        # Verified NSFDC schemes, business metadata & demo data
│   ├── routers/
│   │   └── analysis.py       # API endpoints (/api/analyze, /api/recalculate, etc.)
│   └── services/
│       ├── financial_engine.py # Deterministic Decimal EMI & schedule engine
│       ├── stress_test.py      # Repayability stress tester & scenario evaluator
│       ├── scheme_matcher.py   # Rule-based scheme filtering engine
│       ├── geo_service.py      # OSM Overpass, Open-Meteo & Nominatim service
│       ├── feasibility_engine.py # Qualitative indicator scoring
│       ├── ai_explainer.py     # Gemini Hindi/Hinglish explainer & demo fallback
│       └── report_generator.py # Structured officer report builder
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Landing page with core philosophy
│   │   │   └── advisory/
│   │   │       └── page.tsx  # Main advisory flow & state coordinator
│   │   ├── components/
│   │   │   ├── InputForm.tsx         # Advisory input & pre-loaded demo buttons
│   │   │   ├── LocalEvidence.tsx     # Map POI table & climate indicators
│   │   │   ├── FeasibilityPanel.tsx   # Fit, opportunity, competition & risk cards
│   │   │   ├── SchemeCard.tsx        # Matched scheme details & verification source
│   │   │   ├── FinancialPlan.tsx     # Financial summary & quarterly EMI schedule
│   │   │   ├── RepayabilityTest.tsx  # Stress test, verdict & modify/recalculate form
│   │   │   ├── HindiExplanation.tsx  # AI Hindi explanation card
│   │   │   └── OfficerReport.tsx     # Printable officer advisory report
│   │   └── lib/
│   │       ├── api.ts        # API client for FastAPI endpoints
│   │       ├── types.ts      # TypeScript interfaces
│   │       └── format.ts     # Indian Rupee (INR) formatting & badge utility
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js** v18+ 
- **Python** v3.10+

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```
Backend will be live at `http://localhost:8000`.

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Frontend will be live at `http://localhost:3000`.

---

## 🎮 Pre-Built Demo Scenarios

The prototype features one-click demo buttons in the UI for rapid appraisal testing:

1. **Dairy Farming (Affordable Scenario)**
   - **Location:** Chandauli, Uttar Pradesh
   - **Project Cost:** ₹5,00,000 | **Own Contribution:** ₹1,00,000
   - **Monthly Revenue:** ₹80,000 | **Monthly Expenses:** ₹48,000
   - **Outcome:** Matched with NSFDC SUVIDHA Loan; Quarterly EMI ₹27,748 against Quarterly Surplus ₹96,000 ($28.9\%$ ratio). Verdict: **`AFFORDABLE`** ✅.

2. **Dairy Farming (High Risk Scenario)**
   - **Location:** Chandauli, Uttar Pradesh
   - **Project Cost:** ₹5,00,000 | **Own Contribution:** ₹50,000
   - **Monthly Revenue:** ₹40,000 | **Monthly Expenses:** ₹35,000
   - **Outcome:** Quarterly EMI ₹31,217 against Quarterly Surplus ₹15,000 ($208.1\%$ ratio). Verdict: **`HIGH_RISK`** ❌.
   - Triggers the **Modify & Recalculate** loop enabling real-time adjustments.

---

## 📜 Disclaimer

*GRAMSATHI is an advisory demonstration prototype developed for public-service evaluation. All generated reports and financial calculations are provided for decision-support purposes only and do not constitute formal bank sanction or credit guarantee.*
