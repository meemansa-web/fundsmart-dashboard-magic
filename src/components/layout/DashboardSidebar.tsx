
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ChevronLeft,
  CreditCard,
  Home,
  PieChart,
  Settings,
  User,
  Wallet
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const menuItems = [
  {
    title: "Overview",
    icon: Home,
    path: "/dashboard",
  },
  {
    title: "Investments",
    icon: PieChart,
    path: "/dashboard/investments",
  },
  {
    title: "Transactions",
    icon: CreditCard,
    path: "/dashboard/transactions",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/dashboard/analytics",
  },
  {
    title: "Wallets",
    icon: Wallet,
    path: "/dashboard/wallets",
  },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar
      expanded={!collapsed}
      onExpandedChange={(expanded) => setCollapsed(!expanded)}
      className={cn(
        "border-r border-border/40 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <SidebarHeader className="px-3 py-5 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <span className="font-semibold text-white">FS</span>
            </div>
            <span className="font-semibold tracking-tight text-lg">
              FundSmart
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-full shrink-0",
            collapsed ? "rotate-180 mx-auto" : "ml-auto"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    className={cn(
                      "flex transition-colors",
                      location.pathname === item.path
                        ? "text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className={cn("h-5 w-5 mr-3", collapsed ? "mr-0 mx-auto" : "")} />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <Settings className={cn("h-5 w-5 mr-3", collapsed ? "mr-0 mx-auto" : "")} />
                  {!collapsed && <span>Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  <User className={cn("h-5 w-5 mr-3", collapsed ? "mr-0 mx-auto" : "")} />
                  {!collapsed && <span>Profile</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn("p-3", collapsed ? "flex justify-center" : "")}>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
