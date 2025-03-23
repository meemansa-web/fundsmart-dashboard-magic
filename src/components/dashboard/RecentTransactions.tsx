
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChartCard } from "./ChartCard";
import { Button } from "@/components/ui/button";
import { ChevronsUp, ChevronsDown, ArrowUpRight, ArrowDownLeft, Wallet, Gift, ShoppingCart, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: "tx1",
    type: "deposit",
    title: "Deposit",
    description: "Deposit from Bank Account",
    amount: 2000,
    date: "2023-11-21T14:32:00Z",
    status: "completed",
    icon: ChevronsUp,
  },
  {
    id: "tx2",
    type: "withdrawal",
    title: "Withdrawal",
    description: "Transfer to External Wallet",
    amount: -550,
    date: "2023-11-20T09:15:00Z",
    status: "completed",
    icon: ChevronsDown,
  },
  {
    id: "tx3",
    type: "investment",
    title: "Stock Purchase",
    description: "AAPL - 5 shares",
    amount: -975.50,
    date: "2023-11-18T11:45:00Z",
    status: "completed",
    icon: ShoppingCart,
  },
  {
    id: "tx4",
    type: "dividend",
    title: "Dividend Payment",
    description: "MSFT Quarterly Dividend",
    amount: 32.75,
    date: "2023-11-15T08:20:00Z",
    status: "completed",
    icon: Gift,
  },
  {
    id: "tx5",
    type: "fee",
    title: "Management Fee",
    description: "Monthly Service Fee",
    amount: -12.99,
    date: "2023-11-01T00:00:00Z",
    status: "completed",
    icon: BadgeDollarSign,
  },
];

const typeIcons: Record<string, any> = {
  deposit: { icon: ArrowDownLeft, class: "bg-green-500/10 text-green-500" },
  withdrawal: { icon: ArrowUpRight, class: "bg-red-500/10 text-red-500" },
  investment: { icon: ShoppingCart, class: "bg-purple-500/10 text-purple-500" },
  dividend: { icon: Gift, class: "bg-blue-500/10 text-blue-500" },
  fee: { icon: BadgeDollarSign, class: "bg-orange-500/10 text-orange-500" },
};

export function RecentTransactions() {
  const [visibleTransactions, setVisibleTransactions] = useState(3);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'never',
    }).format(Math.abs(amount));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };
  
  const handleShowMore = () => {
    setVisibleTransactions(transactions.length);
  };
  
  const handleShowLess = () => {
    setVisibleTransactions(3);
  };

  return (
    <ChartCard 
      title="Recent Transactions" 
      className="h-full"
      menuItems={[
        { label: "View All Transactions", onClick: () => console.log("View all") },
        { label: "Export", onClick: () => console.log("Export") },
      ]}
    >
      <div className="space-y-4">
        <AnimatePresence>
          {transactions.slice(0, visibleTransactions).map((transaction, index) => {
            const { icon: Icon, class: colorClass } = 
              typeIcons[transaction.type] || { icon: Wallet, class: "bg-gray-500/10 text-gray-500" };
              
            return (
              <motion.div 
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", colorClass)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    transaction.amount > 0 ? "text-green-500" : ""
                  )}>
                    {transaction.amount > 0 ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        <div className="flex justify-center">
          {visibleTransactions < transactions.length ? (
            <Button variant="ghost" size="sm" onClick={handleShowMore}>
              Show More
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleShowLess}>
              Show Less
            </Button>
          )}
        </div>
      </div>
    </ChartCard>
  );
}
