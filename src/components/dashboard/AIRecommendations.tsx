
import { useState, useEffect } from "react";
import { ChartCard } from "./ChartCard";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, TrendingDown, BrainCircuit, Sparkles } from "lucide-react";

const recommendationsData = [
  {
    id: 1,
    asset: "NVDA (NVIDIA)",
    type: "Stock",
    recommendation: "Buy",
    reason: "Strong AI market growth and consistent performance indicators",
    confidence: 92,
    potentialReturn: "+18.5%",
    risk: "Medium",
  },
  {
    id: 2,
    asset: "VGIT (Vanguard IT Bond ETF)",
    type: "ETF",
    recommendation: "Hold",
    reason: "Current market volatility suggests maintaining position in stable bonds",
    confidence: 87,
    potentialReturn: "+4.2%",
    risk: "Low",
  },
  {
    id: 3,
    asset: "AMZN (Amazon)",
    type: "Stock",
    recommendation: "Increase Position",
    reason: "Strong Q2 earnings and expansion in AI services",
    confidence: 89,
    potentialReturn: "+12.7%",
    risk: "Medium",
  },
  {
    id: 4,
    asset: "BTC (Bitcoin)",
    type: "Crypto",
    recommendation: "Consider Entry",
    reason: "Technical indicators point to potential uptrend after consolidation",
    confidence: 78,
    potentialReturn: "+22.4%",
    risk: "High",
  },
];

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState(recommendationsData);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Buy":
      case "Increase Position":
      case "Consider Entry":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Hold":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Sell":
      case "Decrease Position":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <ChartCard 
      title="AI-Powered Investment Recommendations" 
      description="Personalized suggestions based on your portfolio and market trends"
      className="h-full"
      footer={
        <Button variant="ghost" className="w-full justify-between">
          <span>View all recommendations</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      }
      menuItems={[
        { label: "Refresh Recommendations", onClick: () => console.log("Refresh") },
        { label: "Adjust AI Parameters", onClick: () => console.log("Adjust AI") },
        { label: "Export Recommendations", onClick: () => console.log("Export") },
      ]}
    >
      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: loaded ? 1 : 0, 
              y: loaded ? 0 : 20 
            }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-4 hover:bg-accent/10 transition-colors border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.asset}</h3>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{item.confidence}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <Badge className={cn("font-medium", getRecommendationColor(item.recommendation))}>
                  {item.recommendation}
                </Badge>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <Badge variant="outline" className={getRiskColor(item.risk)}>
                      {item.risk} Risk
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.potentialReturn.startsWith("+") ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      item.potentialReturn.startsWith("+") 
                        ? "text-green-500" 
                        : "text-red-500"
                    )}>
                      {item.potentialReturn}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}
