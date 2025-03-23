
import { useState, useEffect } from "react";
import { ChartCard } from "./ChartCard";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const marketData = [
  { id: 1, name: "S&P 500", ticker: "SPY", price: 456.78, change: 1.45, volume: "5.2M" },
  { id: 2, name: "Bitcoin", ticker: "BTC", price: 38456.32, change: 2.78, volume: "1.8B" },
  { id: 3, name: "Gold", ticker: "GLD", price: 1832.45, change: -0.32, volume: "3.1M" },
  { id: 4, name: "Tesla", ticker: "TSLA", price: 234.56, change: -1.23, volume: "12.5M" },
  { id: 5, name: "Apple", ticker: "AAPL", price: 178.90, change: 0.84, volume: "18.7M" },
];

export function MarketOverview() {
  const [data, setData] = useState(marketData);
  const [loaded, setLoaded] = useState(false);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price >= 1000 ? 0 : 2,
      maximumFractionDigits: price >= 1000 ? 0 : 2,
    }).format(price);
  };
  
  return (
    <ChartCard 
      title="Market Overview" 
      className="h-full"
      menuItems={[
        { label: "Refresh Data", onClick: () => console.log("Refresh") },
        { label: "View Detailed Market Data", onClick: () => console.log("View details") },
      ]}
    >
      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="whitespace-nowrap pb-2 text-left font-medium text-sm">Asset</th>
              <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">Price</th>
              <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">24h Change</th>
              <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">Volume</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {data.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.ticker}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <p className="font-medium">{formatPrice(item.price)}</p>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className={cn(
                      "flex items-center justify-end gap-1 text-sm",
                      item.change >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {item.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <p className="text-muted-foreground">{item.volume}</p>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
