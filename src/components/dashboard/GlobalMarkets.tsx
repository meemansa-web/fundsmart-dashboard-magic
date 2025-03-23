
import { useState, useEffect } from "react";
import { ChartCard } from "./ChartCard";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUp, 
  ArrowDown,
  Globe,
  DollarSign,
  Bitcoin,
  Banknote,
  Euro,
  PoundSterling,
  JapaneseYen
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for global markets
const stockMarkets = [
  { id: 1, name: "S&P 500", region: "United States", price: 5328.42, change: 1.25, volume: "4.8B", currency: "USD" },
  { id: 2, name: "FTSE 100", region: "United Kingdom", price: 8245.12, change: -0.42, volume: "1.2B", currency: "GBP" },
  { id: 3, name: "Nikkei 225", region: "Japan", price: 39754.32, change: 2.18, volume: "3.1B", currency: "JPY" },
  { id: 4, name: "DAX", region: "Germany", price: 18325.85, change: 0.67, volume: "2.4B", currency: "EUR" },
  { id: 5, name: "Shanghai Composite", region: "China", price: 3102.45, change: -1.34, volume: "5.7B", currency: "CNY" },
  { id: 6, name: "Hang Seng", region: "Hong Kong", price: 18652.23, change: 0.89, volume: "1.9B", currency: "HKD" },
];

const cryptoMarkets = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 58234.67, change: 3.45, volume: "42.5B", currency: "USD" },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 2932.18, change: 2.87, volume: "28.3B", currency: "USD" },
  { id: 3, name: "Solana", symbol: "SOL", price: 142.56, change: 5.67, volume: "12.8B", currency: "USD" },
  { id: 4, name: "Cardano", symbol: "ADA", price: 0.58, change: -2.34, volume: "4.1B", currency: "USD" },
  { id: 5, name: "Binance Coin", symbol: "BNB", price: 596.32, change: 1.23, volume: "8.7B", currency: "USD" },
  { id: 6, name: "XRP", symbol: "XRP", price: 0.52, change: -1.45, volume: "3.8B", currency: "USD" },
];

const currencyRates = [
  { id: 1, name: "EUR/USD", fromCurrency: "EUR", toCurrency: "USD", rate: 1.082, change: 0.32 },
  { id: 2, name: "USD/JPY", fromCurrency: "USD", toCurrency: "JPY", rate: 149.76, change: -0.45 },
  { id: 3, name: "GBP/USD", fromCurrency: "GBP", toCurrency: "USD", rate: 1.265, change: 0.18 },
  { id: 4, name: "USD/CAD", fromCurrency: "USD", toCurrency: "CAD", rate: 1.358, change: -0.12 },
  { id: 5, name: "USD/CHF", fromCurrency: "USD", toCurrency: "CHF", rate: 0.897, change: 0.22 },
  { id: 6, name: "AUD/USD", fromCurrency: "AUD", toCurrency: "USD", rate: 0.658, change: -0.35 },
];

export function GlobalMarkets() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatCurrency = (value: number, currency: string) => {
    let symbol = "$";
    switch (currency) {
      case "GBP":
        symbol = "£";
        break;
      case "EUR":
        symbol = "€";
        break;
      case "JPY":
        symbol = "¥";
        break;
      case "CNY":
        symbol = "¥";
        break;
      case "HKD":
        symbol = "HK$";
        break;
    }
    
    return value < 10 
      ? `${symbol}${value.toFixed(2)}` 
      : `${symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  const formatRate = (value: number) => {
    return value.toFixed(3);
  };
  
  const formatPercent = (value: number) => {
    return value.toFixed(2) + "%";
  };
  
  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case "EUR":
        return <Euro className="h-4 w-4" />;
      case "GBP":
        return <PoundSterling className="h-4 w-4" />;
      case "JPY":
        return <JapaneseYen className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };
  
  return (
    <ChartCard 
      title="Global Markets" 
      description="Live data from stock, crypto, and currency markets"
      className="h-full"
      menuItems={[
        { label: "Refresh Data", onClick: () => console.log("Refresh") },
        { label: "Add to Watchlist", onClick: () => console.log("Add to watchlist") },
        { label: "Export Data", onClick: () => console.log("Export") },
      ]}
    >
      <Tabs defaultValue="stocks" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="stocks" className="flex items-center gap-1">
            <Banknote className="h-4 w-4" />
            <span>Stock Markets</span>
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex items-center gap-1">
            <Bitcoin className="h-4 w-4" />
            <span>Cryptocurrencies</span>
          </TabsTrigger>
          <TabsTrigger value="forex" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>Forex</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stocks" className="mt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="whitespace-nowrap pb-2 text-left font-medium text-sm">Index</th>
                  <th className="whitespace-nowrap pb-2 text-left font-medium text-sm">Region</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">Price</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">24h Change</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">Volume</th>
                </tr>
              </thead>
              <tbody>
                {stockMarkets.map((market, index) => (
                  <motion.tr
                    key={market.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <p className="font-medium">{market.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-muted-foreground">{market.region}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-medium">{formatCurrency(market.price, market.currency)}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-1 text-sm",
                        market.change >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {market.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span>{Math.abs(market.change)}%</span>
                      </div>
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <p className="text-muted-foreground">{market.volume}</p>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="crypto" className="mt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="whitespace-nowrap pb-2 text-left font-medium text-sm">Currency</th>
                  <th className="whitespace-nowrap pb-2 text-left font-medium text-sm">Symbol</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">Price</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">24h Change</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">Volume</th>
                </tr>
              </thead>
              <tbody>
                {cryptoMarkets.map((market, index) => (
                  <motion.tr
                    key={market.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <p className="font-medium">{market.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-muted-foreground">{market.symbol}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-medium">{formatCurrency(market.price, market.currency)}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-1 text-sm",
                        market.change >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {market.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span>{Math.abs(market.change)}%</span>
                      </div>
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <p className="text-muted-foreground">{market.volume}</p>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="forex" className="mt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="whitespace-nowrap pb-2 text-left font-medium text-sm">Pair</th>
                  <th className="whitespace-nowrap pb-2 text-center font-medium text-sm">Currencies</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">Rate</th>
                  <th className="whitespace-nowrap pb-2 text-right font-medium text-sm">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {currencyRates.map((rate, index) => (
                  <motion.tr
                    key={rate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <p className="font-medium">{rate.name}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center">
                          {getCurrencyIcon(rate.fromCurrency)}
                          <span className="ml-1 text-sm text-muted-foreground">{rate.fromCurrency}</span>
                        </div>
                        <span className="text-muted-foreground">/</span>
                        <div className="flex items-center">
                          {getCurrencyIcon(rate.toCurrency)}
                          <span className="ml-1 text-sm text-muted-foreground">{rate.toCurrency}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-medium">{formatRate(rate.rate)}</p>
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-1 text-sm",
                        rate.change >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {rate.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span>{Math.abs(rate.change)}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </ChartCard>
  );
}
