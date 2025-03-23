
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Clock, CreditCard } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";

const Dashboard = () => {
  // Simulate page load animation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Assets"
          value="$128,432.28"
          icon={Wallet}
          delta={{ value: 3.2, isPositive: true }}
          description="Updated just now"
        />
        <StatCard
          title="Monthly Return"
          value="$2,845.36"
          icon={TrendingUp}
          delta={{ value: 4.7, isPositive: true }}
          description="Compared to last month"
        />
        <StatCard
          title="Annual Return"
          value="12.4%"
          icon={TrendingUp}
          delta={{ value: 2.3, isPositive: true }}
          description="Compared to market average"
        />
        <StatCard
          title="Next Dividend"
          value="$345.92"
          icon={Clock}
          description="Expected on Dec 15"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <PortfolioSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketOverview />
        <RecentTransactions />
      </div>

      <div>
        <AssetAllocation />
      </div>
    </div>
  );
};

export default Dashboard;
