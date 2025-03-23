
import { useState, useEffect } from "react";
import { ChartCard } from "./ChartCard";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";

const riskData = [
  { name: "Jan", risk: 32 },
  { name: "Feb", risk: 28 },
  { name: "Mar", risk: 35 },
  { name: "Apr", risk: 42 },
  { name: "May", risk: 38 },
  { name: "Jun", risk: 30 },
  { name: "Jul", risk: 25 },
  { name: "Aug", risk: 28 },
];

const riskFactors = [
  { 
    name: "Market Volatility", 
    value: 42, 
    impact: "Medium", 
    description: "Recent market fluctuations increase short-term risk" 
  },
  { 
    name: "Asset Concentration", 
    value: 65, 
    impact: "High", 
    description: "Portfolio overly concentrated in technology sector" 
  },
  { 
    name: "Economic Indicators", 
    value: 32, 
    impact: "Low", 
    description: "Economic metrics indicate stable conditions" 
  },
  { 
    name: "Liquidity Risk", 
    value: 28, 
    impact: "Low", 
    description: "Strong liquidity position across your assets" 
  },
];

export function RiskAnalysis() {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "High":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };
  
  const getRiskLevel = (value: number) => {
    if (value < 30) return "Low";
    if (value < 60) return "Medium";
    return "High";
  };
  
  const getProgressColor = (value: number) => {
    if (value < 30) return "bg-green-500";
    if (value < 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const riskLevel = getRiskLevel(payload[0].value);
      const color = 
        riskLevel === "Low" 
          ? "text-green-500" 
          : riskLevel === "Medium" 
            ? "text-yellow-500" 
            : "text-red-500";
            
      return (
        <div className="px-3 py-2 bg-background/90 backdrop-blur border border-border rounded-lg shadow-lg">
          <p className="text-sm font-semibold mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Risk Score: <span className="font-medium text-foreground">{payload[0].value}</span>
            </p>
            <p className={cn("text-sm font-medium", color)}>
              ({riskLevel})
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  const currentRisk = riskData[riskData.length - 1].risk;
  const riskLevel = getRiskLevel(currentRisk);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard 
        title="Portfolio Risk Over Time" 
        description="AI-powered risk analysis based on your investments"
        className="h-full"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent/20 p-2 rounded-full">
            <ShieldAlert className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Risk Level</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold">{currentRisk}</p>
              <p className={cn(
                "text-sm font-medium",
                riskLevel === "Low" ? "text-green-500" : 
                riskLevel === "Medium" ? "text-yellow-500" : "text-red-500"
              )}>
                {riskLevel}
              </p>
            </div>
          </div>
        </div>
        
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={riskData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              className={animate ? "animate-fade-in" : "opacity-0"}
            >
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={renderTooltip} />
              <Area 
                type="monotone" 
                dataKey="risk" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#riskGradient)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      
      <ChartCard 
        title="Risk Factor Analysis" 
        description="Breakdown of factors contributing to portfolio risk"
        className="h-full"
      >
        <div className="space-y-6">
          {riskFactors.map((factor, index) => (
            <motion.div 
              key={factor.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{factor.name}</h3>
                  <span className={cn("text-sm font-medium", getImpactColor(factor.impact))}>
                    ({factor.impact} Impact)
                  </span>
                </div>
                <span className="text-sm font-semibold">{factor.value}%</span>
              </div>
              <Progress value={factor.value} className={getProgressColor(factor.value)} />
              <p className="text-sm text-muted-foreground">{factor.description}</p>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
