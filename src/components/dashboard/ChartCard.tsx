
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface ChartCardProps {
  title: string;
  description?: string;
  className?: string;
  footer?: ReactNode;
  children: ReactNode;
  menuItems?: Array<{ label: string; onClick: () => void }>;
}

export function ChartCard({
  title,
  description,
  className,
  footer,
  children,
  menuItems,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("overflow-hidden glass-card", className)}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          
          {menuItems && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="h-full w-full">{children}</div>
        </CardContent>
        
        {footer && (
          <div className="px-6 py-3 border-t border-border/40">{footer}</div>
        )}
      </Card>
    </motion.div>
  );
}
