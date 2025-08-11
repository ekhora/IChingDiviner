interface HexagramVisualizationProps {
  lines: boolean[]; // true = yang (solid), false = yin (broken)
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function HexagramVisualization({ 
  lines, 
  size = "md", 
  className = "" 
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

  return (
    <div className={`flex flex-col ${containerClasses[size]} ${className}`}>
      {lines.map((isYang, index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} rounded transition-colors duration-200 ${
            isYang 
              ? "bg-slate-800 dark:bg-slate-200" // Solid line (Yang)
              : "bg-slate-300 dark:bg-slate-600" // Broken line (Yin) - simplified as lighter color
          }`}
          style={!isYang ? {
            background: `linear-gradient(to right, currentColor 40%, transparent 40%, transparent 60%, currentColor 60%)`
          } : undefined}
        />
      ))}
    </div>
  );
}
