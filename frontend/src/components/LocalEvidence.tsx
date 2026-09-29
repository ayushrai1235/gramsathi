'use client';

import { LocationEvidence } from '@/lib/types';
import { getConfidenceBadge } from '@/lib/format';

interface Props {
  evidence: LocationEvidence;
}

export default function LocalEvidence({ evidence }: Props) {
  const isDemo = evidence.data_source === 'DEMO';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              📍 Local Evidence & Infrastructure
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs border ${getConfidenceBadge(evidence.data_source)}`}>
              {evidence.data_source} DATA
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            OpenStreetMap (Overpass API) spatial survey + Open-Meteo regional weather parameters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-600">
          <span className="px-3 py-1 bg-stone-100 rounded-full border border-stone-200">
            Radius: {evidence.search_radius_km} km
          </span>
          <span className="px-3 py-1 bg-stone-100 rounded-full border border-stone-200">
            Mapped: {evidence.total_mapped} units
          </span>
        </div>
      </div>

      {/* Demo Warning Banner */}
      {isDemo && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-950 text-xs flex items-start gap-3">
          <span className="text-base">ℹ️</span>
          <div>
            <p className="font-bold">DEMO / ILLUSTRATIVE DATA ACTIVE</p>
            <p className="mt-0.5 opacity-90">
              This advisory is using verified benchmark village data for Chandauli, UP. All POIs and weather metrics are illustrative demo defaults.
            </p>
          </div>
        </div>
      )}

      {/* Location Details Strip */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-stone-400 block font-medium uppercase">Village / स्थान</span>
          <span className="text-stone-900 font-bold text-sm">{evidence.village || 'Chandauli'}</span>
        </div>
        <div>
          <span className="text-stone-400 block font-medium uppercase">District / जिला</span>
          <span className="text-stone-900 font-bold text-sm">{evidence.district || 'Chandauli'}</span>
        </div>
        <div>
          <span className="text-stone-400 block font-medium uppercase">State / राज्य</span>
          <span className="text-stone-900 font-bold text-sm">{evidence.state || 'Uttar Pradesh'}</span>
        </div>
        <div>
          <span className="text-stone-400 block font-medium uppercase">Coordinates / निर्देशांक</span>
          <span className="text-stone-900 font-bold text-sm">{evidence.lat?.toFixed(4)}, {evidence.lon?.toFixed(4)}</span>
        </div>
      </div>

      {/* Main Content Grid: POIs + Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* POI Table (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Nearby Commercial Establishments & Facilities ({evidence.nearby_businesses.length})
          </h3>

          <div className="overflow-hidden rounded-xl border border-stone-200 max-h-72 overflow-y-auto">
            <table className="min-w-full divide-y divide-stone-200 text-xs">
              <thead className="bg-stone-50 sticky top-0 font-bold text-stone-600">
                <tr>
                  <th className="px-4 py-2.5 text-left">Establishment Name</th>
                  <th className="px-4 py-2.5 text-left">Category</th>
                  <th className="px-4 py-2.5 text-right">Distance</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-100">
                {evidence.nearby_businesses.map((b, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-stone-900">{b.name}</td>
                    <td className="px-4 py-2.5 text-stone-600">
                      <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 font-medium">
                        {b.type}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-stone-700">
                      {b.distance_km} km
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getConfidenceBadge(b.source)}`}>
                        {b.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Climate & Weather Card (1 col) */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                🌤️ Regional Climate Indicators
              </h3>
              <span className={`px-2 py-0.5 rounded text-[10px] border ${getConfidenceBadge(evidence.weather.source)}`}>
                {evidence.weather.source}
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-stone-200/80 flex items-center justify-between">
                <span className="text-xs text-stone-600">Average Temp</span>
                <span className="font-bold text-stone-900 text-sm">{evidence.weather.avg_temp_c}°C</span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200/80 flex items-center justify-between">
                <span className="text-xs text-stone-600">Annual Rainfall</span>
                <span className="font-bold text-stone-900 text-sm">{evidence.weather.annual_rainfall_mm} mm</span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200/80 flex items-center justify-between">
                <span className="text-xs text-stone-600">Extreme Heat Days</span>
                <span className="font-bold text-amber-700 text-sm">{evidence.weather.extreme_heat_days} days/yr</span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200/80 flex items-center justify-between">
                <span className="text-xs text-stone-600">Flood Risk Factor</span>
                <span className={`font-bold text-xs px-2 py-0.5 rounded ${evidence.weather.flood_risk === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                  {evidence.weather.flood_risk}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 italic border-t border-stone-200 pt-3">
            {evidence.coverage_note}
          </p>
        </div>

      </div>

    </div>
  );
}
