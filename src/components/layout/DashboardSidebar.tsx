
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMobile } from "@/hooks/use-mobile";

import {
  LayoutDashboard,
  LineChart,
  WalletCards,
  History,
  Settings,
  User,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  TrendingUp,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    color: "text-blue-500",
  },
  {
    title: "Investments",
    icon: TrendingUp,
    path: "/dashboard/investments",
    color: "text-green-500",
  },
  {
    title: "Transactions",
    icon: History,
    path: "/dashboard/transactions",
    color: "text-purple-500",
  },
  {
    title: "Analytics",
    icon: LineChart,
    path: "/dashboard/analytics",
    color: "text-yellow-500",
  },
  {
    title: "Wallets",
    icon: WalletCards,
    path: "/dashboard/wallets",
    color: "text-red-500",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
    color: "text-slate-500",
  },
  {
    title: "Profile",
    icon: User,
    path: "/dashboard/profile",
    color: "text-indigo-500",
  },
];

export function DashboardSidebar() {
  const location = useLocation();
  const isMobile = useMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(false);
  
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);
  
  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    
      <div
        className={cn(
          "h-screen bg-background sticky top-0 border-r border-border/40 transition-all duration-300",
          isSidebarOpen ? "flex" : "hidden lg:flex",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <Collapsible
          open={!collapsed}
          onOpenChange={(open) => setCollapsed(!open)}
          className="flex flex-col w-full"
        >
          {/* Logo and collapse button */}
          <div className={cn(
            "h-14 flex items-center sticky top-0 z-20 px-4 border-b border-border/40",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center">
                  <span className="font-semibold text-white text-xs">FS</span>
                </div>
                <span className="font-semibold tracking-tight">FundSmart</span>
              </div>
            )}
            
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          {/* Navigation */}
          <ScrollArea className="flex-1 py-2">
            <CollapsibleContent className="data-[state=closed]:hidden-force" forceMount>
              <nav className="flex flex-col gap-1 px-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        "hover:bg-secondary/80",
                        isActive ? "bg-secondary text-primary" : "text-muted-foreground"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", item.color)} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </CollapsibleContent>
            
            {/* Collapsed menu */}
            {collapsed && (
              <div className="flex flex-col gap-1 px-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center justify-center p-2 rounded-md transition-colors",
                        "hover:bg-secondary/80",
                        isActive ? "bg-secondary text-primary" : "text-muted-foreground"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", item.color)} />
                    </Link>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </Collapsible>
      </div>
    </>
  );
}
