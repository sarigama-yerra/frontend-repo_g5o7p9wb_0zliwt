import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Summary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${API}/api/netflix/summary`);
        if (!res.ok) throw new Error('Failed to load summary');
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

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading summary…</div>;
  if (error) return <div className="p-4 text-sm text-red-600">{error}</div>;
  if (!data) return null;

  const cards = [
    { label: 'Total Titles', value: data.total_titles },
    { label: 'Movies', value: data.movies },
    { label: 'TV Shows', value: data.tv_shows },
    { label: 'Release Range', value: `${data.earliest_release_year ?? '—'} – ${data.latest_release_year ?? '—'}` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur p-4 shadow-sm">
          <div className="text-xs uppercase tracking-wide text-gray-500">{c.label}</div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">{c.value}</div>
        </div>
      ))}
    </div>
  );
}
