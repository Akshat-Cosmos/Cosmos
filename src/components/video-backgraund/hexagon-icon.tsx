export function HexagonIcon({ className = "", size = 48 }: { className?: string; size?: number }) {
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon
            points="50,3 100,28 100,72 50,97 0,72 0,28"
            fill="none"
            stroke="rgba(147, 51, 234, 0.7)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <polygon
            points="50,15 85,33 85,67 50,85 15,67 15,33"
            fill="none"
            stroke="rgba(147, 51, 234, 0.8)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <polygon
            points="50,30 70,40 70,60 50,70 30,60 30,40"
            fill="none"
            stroke="rgba(147, 51, 234, 0.9)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <polygon
            points="50,40 60,45 60,55 50,60 40,55 40,45"
            fill="rgba(147, 51, 234, 1)"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>
    )
  }
  