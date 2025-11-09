import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function CountryDistribution() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${API}/api/netflix/by-country?top=10`);
        if (!res.ok) throw new Error('Failed to load countries');
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading countries…</div>;
  if (error) return <div className="p-4 text-sm text-red-600">{error}</div>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Top Countries</h3>
      <ul className="space-y-2">
        {data.map((c) => (
          <li key={c.country} className="flex items-center justify-between text-sm">
            <span className="text-gray-700">{c.country}</span>
            <span className="font-semibold text-gray-900">{c.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
