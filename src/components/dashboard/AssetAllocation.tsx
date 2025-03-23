
import { useEffect, useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { ChartCard } from "./ChartCard";

const data = [
  { name: "Jan", Stocks: 4000, Bonds: 2400, Cash: 1400, Crypto: 800 },
  { name: "Feb", Stocks: 4200, Bonds: 2200, Cash: 1300, Crypto: 900 },
  { name: "Mar", Stocks: 4100, Bonds: 2300, Cash: 1200, Crypto: 1000 },
  { name: "Apr", Stocks: 4600, Bonds: 2100, Cash: 1400, Crypto: 1200 },
  { name: "May", Stocks: 4800, Bonds: 2000, Cash: 1500, Crypto: 1100 },
  { name: "Jun", Stocks: 5000, Bonds: 1900, Cash: 1600, Crypto: 1300 },
];

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b"];

export function AssetAllocation() {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);
  
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-3 py-2 bg-background/90 backdrop-blur border border-border rounded-lg shadow-lg">
          <p className="text-sm font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={`tooltip-${index}`} 
              className="text-xs"
              style={{ color: entry.color }}
            >
              {`${entry.name}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard 
      title="Asset Allocation History" 
      description="6-month allocation trend"
      className="h-full"
      menuItems={[
        { label: "Download Chart", onClick: () => console.log("Download chart") },
        { label: "View Custom Range", onClick: () => console.log("View range") },
      ]}
    >
      <div className="h-[300px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            className={animate ? "animate-fade-in" : "opacity-0"}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="hsl(var(--border))" 
            />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={renderTooltip} />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ paddingTop: 20 }} 
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
            <Bar 
              dataKey="Stocks" 
              fill={COLORS[0]} 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationBegin={300}
            />
            <Bar 
              dataKey="Bonds" 
              fill={COLORS[1]} 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationBegin={600}
            />
            <Bar 
              dataKey="Cash" 
              fill={COLORS[2]} 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationBegin={900}
            />
            <Bar 
              dataKey="Crypto" 
              fill={COLORS[3]} 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationBegin={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
