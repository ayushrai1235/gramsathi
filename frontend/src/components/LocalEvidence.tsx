'use client';

import { LocationEvidence } from '@/lib/types';
import { getConfidenceBadge } from '@/lib/format';

export default function LocalEvidence({ evidence }: { evidence: LocationEvidence }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">📍 Local Evidence / स्थानीय साक्ष्य</h2>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border mt-2 md:mt-0 ${getConfidenceBadge(evidence.data_source)}`}>
          {evidence.data_source} CONFIDENCE
        </span>
      </div>

      {evidence.data_source === 'DEMO' && (
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r">
          <p className="text-purple-800 font-medium">DEMO DATA — यह प्रदर्शन डेटा है / This is illustrative data</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Location Details</h3>
          <div className="bg-slate-50 rounded p-4 border border-slate-100">
            <p className="font-medium text-slate-900">{evidence.village}</p>
            <p className="text-slate-600">{evidence.district}, {evidence.state}</p>
            <p className="text-slate-500 text-sm mt-2">Coordinates: {evidence.lat.toFixed(4)}, {evidence.lon.toFixed(4)}</p>
            <p className="text-slate-500 text-sm mt-1">{evidence.coverage_note} (Radius: {evidence.search_radius_km}km)</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Weather Context</h3>
          <div className="bg-slate-50 rounded p-4 border border-slate-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500 text-xs">Avg Temp</p>
                <p className="font-medium">{evidence.weather.avg_temp_c}°C</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Rainfall</p>
                <p className="font-medium">{evidence.weather.annual_rainfall_mm} mm/yr</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Extreme Heat</p>
                <p className="font-medium">{evidence.weather.extreme_heat_days} days/yr</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Flood Risk</p>
                <p className="font-medium capitalize">{evidence.weather.flood_risk.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Nearby Businesses</h3>
      {evidence.nearby_businesses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-md">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Distance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Source</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[...evidence.nearby_businesses]
                .sort((a, b) => a.distance_km - b.distance_km)
                .map((biz, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-sm text-slate-900">{biz.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{biz.type}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{biz.distance_km.toFixed(2)} km</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-0.5 text-[10px] rounded border ${getConfidenceBadge(biz.source)}`}>
                        {biz.source}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-500 text-sm italic">No mapped businesses found within {evidence.search_radius_km}km radius.</p>
      )}
    </div>
  );
}
