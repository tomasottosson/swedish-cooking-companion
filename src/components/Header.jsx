export default function Header({ apiKey, onManageApiKey }) {
  return (
    <header className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-forest">
        <div className="absolute top-0 right-0 w-64 h-64 bg-forest-light rounded-full opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-warm-yellow rounded-full opacity-20 translate-y-1/2"></div>
      </div>

      <div className="relative container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          {/* Logo and title */}
          <div className="flex items-center gap-4">
            {/* Decorative icon */}
            <div className="w-14 h-14 bg-warm-yellow rounded-2xl flex items-center justify-center shadow-warm rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="text-2xl">🍳</span>
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-cream tracking-tight">
                Swedish Cooking Companion<span className="text-warm-yellow">.</span>
              </h1>
              <p className="text-forest-light text-sm mt-0.5 font-medium tracking-wide">
                Svenskifierar internationella recept
              </p>
            </div>
          </div>

          {/* API status and nav */}
          <div className="flex items-center gap-4">
            {apiKey && (
              <div className="flex items-center gap-3 bg-forest-light/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-forest-light/30">
                <span className="w-2 h-2 bg-warm-yellow rounded-full animate-pulse"></span>
                <span className="text-sm text-cream/90 font-medium">API aktiv</span>
                <button
                  onClick={onManageApiKey}
                  className="text-xs text-warm-yellow hover:text-warm-yellow-light transition-colors font-semibold"
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
