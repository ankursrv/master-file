export const RocksportLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark overflow-hidden">
    <style>{`
      @keyframes rs-spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes rs-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(0.85); }
      }
      @keyframes rs-trail {
        0%   { stroke-dashoffset: 280; opacity: 0; }
        20%  { opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes rs-bar {
        0%   { width: 0%; }
        80%  { width: 85%; }
        100% { width: 100%; }
      }
      @keyframes rs-dot {
        0%, 80%, 100% { transform: scale(0); opacity: 0; }
        40%            { transform: scale(1); opacity: 1; }
      }
      @keyframes rs-fade-in {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .rs-spin  { animation: rs-spin 1.4s linear infinite; }
      .rs-pulse { animation: rs-pulse 1.8s ease-in-out infinite; }
      .rs-trail { animation: rs-trail 1.6s ease-out forwards; }
      .rs-bar   { animation: rs-bar 2.4s cubic-bezier(.4,0,.2,1) forwards; }
      .rs-dot-1 { animation: rs-dot 1.2s ease-in-out 0s   infinite; }
      .rs-dot-2 { animation: rs-dot 1.2s ease-in-out 0.2s infinite; }
      .rs-dot-3 { animation: rs-dot 1.2s ease-in-out 0.4s infinite; }
      .rs-fade  { animation: rs-fade-in 0.6s ease-out forwards; }
    `}</style>

    {/* Background accent rings */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="rounded-full border border-primary/10"
        style={{ width: 340, height: 340 }}
      />
      <div
        className="absolute rounded-full border border-primary/5"
        style={{ width: 480, height: 480 }}
      />
    </div>

    {/* Spinning SVG ring */}
    <div
      className="relative flex items-center justify-center"
      style={{ width: 120, height: 120 }}
    >
      {/* Outer spin ring */}
      <svg
        className="rs-spin absolute"
        width={120}
        height={120}
        viewBox="0 0 120 120"
        fill="none"
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="url(#grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="80 260"
        />
        <defs>
          <linearGradient
            id="grad"
            x1="0"
            y1="0"
            x2="120"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner counter-spin ring */}
      <svg
        className="absolute"
        style={{ animation: "rs-spin 2.1s linear infinite reverse" }}
        width={88}
        height={88}
        viewBox="0 0 88 88"
        fill="none"
      >
        <circle
          cx="44"
          cy="44"
          r="38"
          stroke="#FF6B35"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeDasharray="12 20"
          strokeLinecap="round"
        />
      </svg>

      {/* Center logo / icon pulse */}
      <div
        className="rs-pulse relative z-10 flex items-center justify-center rounded-full bg-primary/15 border border-primary/30"
        style={{ width: 56, height: 56 }}
      >
        {/* Mountain / adventure icon */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M2 24L10 10L15 17L19 12L26 24H2Z"
            fill="#FF6B35"
            fillOpacity="0.9"
          />
          <circle cx="20" cy="7" r="3" fill="#FF6B35" fillOpacity="0.6" />
        </svg>
      </div>
    </div>

    {/* Brand name */}
    <div
      className="rs-fade mt-8 flex flex-col items-center gap-1"
      style={{ animationDelay: "0.2s", opacity: 0 }}
    >
      <p className="text-white font-bold text-xl tracking-widest uppercase">
        Rock<span className="text-primary">Sport</span>
      </p>
      <p className="text-white/40 text-xs tracking-wider uppercase">
        Loading your adventure
      </p>
    </div>

    {/* Animated dots */}
    <div className="flex items-center gap-2 mt-5">
      <span className="rs-dot-1 block w-2 h-2 rounded-full bg-primary" />
      <span className="rs-dot-2 block w-2 h-2 rounded-full bg-primary" />
      <span className="rs-dot-3 block w-2 h-2 rounded-full bg-primary" />
    </div>

    {/* Progress bar */}
    <div
      className="rs-fade mt-6 overflow-hidden rounded-full bg-white/10"
      style={{ width: 180, height: 3, animationDelay: "0.4s", opacity: 0 }}
    >
      <div
        className="rs-bar h-full rounded-full bg-primary"
        style={{ width: 0 }}
      />
    </div>
  </div>
);
