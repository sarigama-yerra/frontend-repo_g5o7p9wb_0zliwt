import Summary from './components/Summary';
import TopGenres from './components/TopGenres';
import CountryDistribution from './components/CountryDistribution';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/60 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Netflix Analytics</h1>
          <a
            href="https://www.kaggle.com/datasets/shivamb/netflix-shows"
            target="_blank"
            className="text-xs text-blue-600 hover:underline"
            rel="noreferrer"
          >Dataset</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Summary />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Search />
          </div>
          <div className="space-y-6">
            <TopGenres />
            <CountryDistribution />
          </div>
        </div>

        <footer className="text-center text-xs text-gray-500 pt-6">
          Built with FastAPI + React. Data from the public Netflix titles dataset.
        </footer>
      </main>
    </div>
  );
}

export default App;
