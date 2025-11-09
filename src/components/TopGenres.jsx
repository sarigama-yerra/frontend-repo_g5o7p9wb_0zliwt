import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function TopGenres() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${API}/api/netflix/by-genre?top=12`);
        if (!res.ok) throw new Error('Failed to load genres');
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

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading genres…</div>;
  if (error) return <div className="p-4 text-sm text-red-600">{error}</div>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Top Genres</h3>
      <div className="space-y-2">
        {data.map((g) => (
          <div key={g.genre} className="flex items-center gap-3">
            <div className="w-full">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{g.genre}</span>
                <span>{g.count}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded">
                <div className="h-2 rounded bg-gradient-to-r from-red-500 to-rose-500" style={{ width: `${(g.count / data[0].count) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
