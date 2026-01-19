export default function Header({ apiKey, onManageApiKey }) {
  return (
    <header className="bg-gradient-to-r from-terracotta-500 via-saffron-500 to-terracotta-500 text-white shadow-2xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight leading-tight">
              Swedish Cooking
              <span className="block text-4xl md:text-5xl italic font-light mt-1">
                Companion
              </span>
            </h1>
            <p className="text-cream-50 text-base md:text-lg font-medium tracking-wide flex items-center gap-2">
              <span className="inline-block w-12 h-0.5 bg-cream-50 rounded"></span>
              Gör internationella recept svenska
            </p>
          </div>
          <div className="flex items-center gap-4">
            {apiKey && (
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 shadow-lg">
                <span className="text-2xl">✓</span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">API-nyckel sparad</span>
                  <button
                    onClick={onManageApiKey}
                    className="text-xs text-cream-100 hover:text-white underline text-left transition-colors"
                  >
                    Ändra nyckel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
