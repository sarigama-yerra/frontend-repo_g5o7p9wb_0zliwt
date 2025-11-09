import { useEffect, useMemo, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Search() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (type) params.set('type', type);
        const res = await fetch(`${API}/api/netflix/search?${params.toString()}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error('Failed to search');
        const json = await res.json();
        setData(json);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [q, type]);

  const badge = useMemo(() => (
    <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{data.length}</span>
  ), [data.length]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, cast, director, genre…"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          <option value="Movie">Movies</option>
          <option value="TV Show">TV Shows</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-sm font-semibold text-gray-800 mb-2">
          Results {badge}
        </div>
        {loading && <div className="text-xs text-gray-500">Searching…</div>}
        {error && <div className="text-xs text-red-600">{error}</div>}
        <ul className="divide-y divide-gray-200">
          {data.map((item) => (
            <li key={item.show_id} className="py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-600">{item.type} • {item.release_year} • {item.rating || 'NR'}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</div>
                  {item.listed_in && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.listed_in.split(',').slice(0,3).map((g) => (
                        <span key={g} className="text-[10px] rounded bg-gray-100 px-2 py-0.5 text-gray-700">{g.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
                {item.country && (
                  <div className="text-[10px] text-gray-500 whitespace-nowrap">{item.country}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
