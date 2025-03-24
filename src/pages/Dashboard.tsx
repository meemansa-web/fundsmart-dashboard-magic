
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Wallet, TrendingUp, Clock, CreditCard } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { RiskAnalysis } from "@/components/dashboard/RiskAnalysis";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { GlobalMarkets } from "@/components/dashboard/GlobalMarkets";
import { Community } from "@/components/dashboard/Community";

const Dashboard = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "dashboard";
  
  // Simulate page load animation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Render different content based on the route
  const renderContent = () => {
    switch (path) {
      case "ai-recommendations":
        return <AIRecommendations />;
      case "risk-analysis":
        return <RiskAnalysis />;
      case "goals":
        return <GoalTracker />;
      case "community":
        return <Community />;
      case "global":
        return <GlobalMarkets />;
      case "dashboard":
        return (
          <>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <PerformanceChart />
              </div>
              <div>
                <PortfolioSummary />
              </div>
            </div>

            <div className="mt-6">
              <AIRecommendations />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <MarketOverview />
              <RecentTransactions />
            </div>

            <div className="mt-6">
              <AssetAllocation />
            </div>
          </>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <p className="text-muted-foreground">Content for {path} coming soon..</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
};

export default Dashboard;
