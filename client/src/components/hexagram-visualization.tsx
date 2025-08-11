interface HexagramVisualizationProps {
  lines: boolean[]; // true = yang (solid), false = yin (broken)
  size?: "sm" | "md" | "lg";
  className?: string;
  showLineNumbers?: boolean; // Show traditional I Ching line numbers
}

export default function HexagramVisualization({ 
  lines, 
  size = "md", 
  className = "",
  showLineNumbers = false 
}: HexagramVisualizationProps) {
  const sizeClasses = {
    sm: "w-8 h-1",
    md: "w-12 h-1.5",
    lg: "w-16 h-2"
  };

  const containerClasses = {
    sm: "space-y-1",
    md: "space-y-1.5",
    lg: "space-y-2"
  };

  const lineNumberClasses = {
    sm: "text-xs w-4",
    md: "text-sm w-5",
    lg: "text-base w-6"
  };

  return (
    <div className={`flex ${showLineNumbers ? 'flex-row items-center space-x-2' : 'flex-col'} ${showLineNumbers ? '' : containerClasses[size]} ${className}`}>
      {showLineNumbers && (
        <div className={`flex flex-col justify-between h-full ${containerClasses[size]}`}>
          {lines.map((_, index) => (
            <div key={index} className={`${lineNumberClasses[size]} text-slate-500 font-mono text-right`}>
              {6 - index}
            </div>
          ))}
        </div>
      )}
      <div className={`flex flex-col ${containerClasses[size]}`}>
        {lines.map((isYang, index) => (
          <div
            key={index}
            className={`${sizeClasses[size]} rounded transition-colors duration-200 ${
              isYang 
                ? "bg-slate-800 dark:bg-slate-200" // Solid line (Yang)
                : "bg-slate-300 dark:bg-slate-600" // Broken line (Yin) 
            }`}
            style={!isYang ? {
              background: `linear-gradient(to right, currentColor 40%, transparent 40%, transparent 60%, currentColor 60%)`
            } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
