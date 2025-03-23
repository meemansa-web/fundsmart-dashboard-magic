
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import { cn } from "@/lib/utils";

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];

const initialData = [
  { name: "Stocks", value: 37, labelPosition: 0 },
  { name: "Bonds", value: 23, labelPosition: 1 },
  { name: "Cash", value: 15, labelPosition: 2 },
  { name: "Real Estate", value: 15, labelPosition: 3 },
  { name: "Crypto", value: 10, labelPosition: 4 },
];

export function PortfolioSummary() {
  const [data, setData] = useState(initialData);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animateComplete, setAnimateComplete] = useState(false);
  
  // Simulate data loading with animation
  useEffect(() => {
    // Start with zero values
    setData(initialData.map(item => ({ ...item, value: 0 })));
    
    // Animate to actual values
    const timeout = setTimeout(() => {
      setData(initialData);
      setAnimateComplete(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-3 py-2 bg-background/90 backdrop-blur border border-border rounded-lg shadow-lg">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard 
      title="Portfolio Allocation" 
      description="Current asset distribution"
      className="h-full"
      menuItems={[
        { label: "View Details", onClick: () => console.log("View details") },
        { label: "Download Report", onClick: () => console.log("Download report") },
      ]}
    >
      <div className="flex h-[250px] items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={1}
              dataKey="value"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animationDuration={1500}
              animationBegin={300}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.6}
                  className="transition-opacity duration-300"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:justify-center">
        {data.map((entry, index) => (
          <div 
            key={`legend-${index}`} 
            className={cn(
              "flex items-center gap-2 px-2 py-1 rounded transition-all",
              hoveredIndex === index && "bg-background/60"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex items-center text-sm">
              <span className="font-medium">{entry.name}:</span>
              <span className="ml-1 text-muted-foreground">
                {animateComplete ? `${entry.value}%` : "-%"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
