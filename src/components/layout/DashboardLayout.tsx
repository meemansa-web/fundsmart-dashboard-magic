
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  
  // Update page title based on current route
  useEffect(() => {
    const path = location.pathname.split("/").pop() || "dashboard";
    
    const titles: Record<string, string> = {
      "dashboard": "Overview",
      "investments": "Investments",
      "transactions": "Transactions",
      "analytics": "Analytics",
      "wallets": "Wallets",
      "settings": "Settings",
      "profile": "Profile"
    };
    
    setPageTitle(titles[path] || "Dashboard");
  }, [location]);

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        <DashboardHeader title={pageTitle} />
        
        <main className={cn(
          "flex-1 overflow-y-auto py-6 px-6",
          "transition-all duration-300 ease-in-out"
        )}>
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
