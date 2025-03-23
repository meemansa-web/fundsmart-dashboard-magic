import { useState, useEffect } from "react";
import { ChartCard } from "./ChartCard";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const recommendations = [
  {
    id: 1,
    title: "Diversify Tech Holdings",
    description: "Reduce exposure to the tech sector by allocating funds to healthcare and consumer staples.",
    urgency: "Medium",
    potential: "High",
    rationale: "Tech sector is currently overvalued; diversification can mitigate risk.",
    actions: ["Reallocate 15% of tech funds", "Research healthcare stocks", "Invest in consumer staples ETF"],
  },
  {
    id: 2,
    title: "Increase Bond Allocation",
    description: "Increase bond holdings to stabilize portfolio during potential market corrections.",
    urgency: "Low",
    potential: "Medium",
    rationale: "Bonds provide a hedge against equity downturns.",
    actions: ["Purchase government bonds", "Invest in corporate bond fund"],
  },
  {
    id: 3,
    title: "Explore Emerging Markets",
    description: "Invest a small portion of your portfolio in emerging market equities for high growth potential.",
    urgency: "High",
    potential: "High",
    rationale: "Emerging markets offer significant growth opportunities but come with higher risk.",
    actions: ["Allocate 5% to emerging markets", "Research emerging market ETFs"],
  },
  {
    id: 4,
    title: "Rebalance Portfolio",
    description: "Rebalance your portfolio to align with your target asset allocation.",
    urgency: "Medium",
    potential: "Medium",
    rationale: "Maintain desired risk level and capture gains from overperforming assets.",
    actions: ["Sell overperforming assets", "Buy underperforming assets"],
  },
  {
    id: 5,
    title: "Consider Value Stocks",
    description: "Shift some investments to value stocks, which are currently undervalued compared to growth stocks.",
    urgency: "Low",
    potential: "Medium",
    rationale: "Value stocks may outperform growth stocks in the current economic environment.",
    actions: ["Research value stocks", "Invest in value stock ETF"],
  },
];

export function AIRecommendations() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getPotentialIcon = (potential: string) => {
    switch (potential) {
      case "Low":
        return TrendingDown;
      case "Medium":
        return TrendingUp;
      case "High":
        return TrendingUp;
      default:
        return TrendingUp;
    }
  };

  return (
    <ChartCard
      title="AI Recommendations"
      description="Personalized investment recommendations powered by AI"
      className="h-full"
    >
      <ScrollArea className="h-[460px] w-full">
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-md border bg-secondary/50 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">{recommendation.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <span className={cn("text-xs font-medium uppercase", getUrgencyColor(recommendation.urgency))}>
                        {recommendation.urgency} Urgency
                      </span>
                    </Badge>
                    <div className="flex items-center gap-1 text-xs">
                      <getPotentialIcon potential={recommendation.potential} className="h-3 w-3" />
                      <span>{recommendation.potential} Potential</span>
                    </div>
                  </div>
                </div>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <details className="mt-3">
                <summary className="text-sm font-medium text-primary hover:underline cursor-pointer">
                  Why this recommendation?
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{recommendation.rationale}</p>
              </details>
              <div className="mt-3 space-y-2">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground">Actions</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {recommendation.actions.map((action, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="sm" className="mt-4">
                Take Action <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </ChartCard>
  );
}
