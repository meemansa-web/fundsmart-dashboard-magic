
import { useState, useEffect } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ChartCard } from "./ChartCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Generate data for charts
const generateData = (days: number) => {
  const now = new Date();
  const data = [];
  let value = 10000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random daily fluctuation between -2% and +2.5%
    const change = (Math.random() * 4.5 - 2) / 100;
    value = value * (1 + change);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value * 100) / 100,
    });
  }
  
  return data;
};

// Data periods
const dataPeriods = {
  "1W": generateData(7),
  "1M": generateData(30),
  "3M": generateData(90),
  "1Y": generateData(365),
  "All": generateData(1825), // 5 years
};

export function PerformanceChart() {
  const [period, setPeriod] = useState<keyof typeof dataPeriods>("3M");
  const [data, setData] = useState(dataPeriods["3M"]);
  const [animate, setAnimate] = useState(false);
  
  // Update data when period changes
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setData(dataPeriods[period]);
      setAnimate(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [period]);
  
  // Calculate performance metrics
  const startValue = data[0]?.value || 0;
  const endValue = data[data.length - 1]?.value || 0;
  const percentChange = ((endValue - startValue) / startValue) * 100;
  const isPositive = percentChange >= 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-3 py-2 bg-background/90 backdrop-blur border border-border rounded-lg shadow-lg">
          <p className="text-sm font-semibold mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            Value: <span className="font-medium text-foreground">{formatCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard 
      title="Portfolio Performance" 
      className="h-full"
      menuItems={[
        { label: "Download Data", onClick: () => console.log("Download data") },
        { label: "View Full Analytics", onClick: () => console.log("View analytics") },
      ]}
    >
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-3xl font-semibold mb-1">{formatCurrency(endValue)}</p>
          <div className="flex items-center gap-2">
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
            </span>
            <span className="text-muted-foreground text-sm">
              {period} change
            </span>
          </div>
        </div>
        
        <Select 
          defaultValue={period} 
          onValueChange={(value) => setPeriod(value as keyof typeof dataPeriods)}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1W">1W</SelectItem>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="3M">3M</SelectItem>
            <SelectItem value="1Y">1Y</SelectItem>
            <SelectItem value="All">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            className={animate ? "animate-fade-in" : "opacity-0"}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="hsl(var(--border))" 
            />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickMargin={10}
              minTickGap={20}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={['dataMin - 1000', 'dataMax + 1000']}
            />
            <Tooltip content={renderTooltip} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
