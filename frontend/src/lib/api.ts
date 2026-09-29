import { UserInput, AnalysisResponse, DemoScenario } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function analyzeProject(input: UserInput): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`);
  return res.json();
}

export async function recalculateProject(input: UserInput): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/api/recalculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Recalculation failed: ${res.statusText}`);
  return res.json();
}

export async function getDemoScenarios(): Promise<Record<string, DemoScenario>> {
  const res = await fetch(`${API_BASE}/api/demo-scenarios`);
  if (!res.ok) throw new Error(`Failed to fetch demos: ${res.statusText}`);
  return res.json();
}
