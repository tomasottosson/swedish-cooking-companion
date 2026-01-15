export default function Header({ apiKey, onManageApiKey }) {
  return (
    <header className="bg-swedish-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Swedish Cooking Companion</h1>
            <p className="text-blue-100 text-sm mt-1">
              Konvertera internationella recept till svenska
            </p>
          </div>
          <div className="flex items-center gap-4">
            {apiKey && (
              <div className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-lg">
                <span className="text-sm">✓ API Key sparad</span>
                <button
                  onClick={onManageApiKey}
                  className="text-xs text-blue-200 hover:text-white underline"
                >
                  Ändra
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
