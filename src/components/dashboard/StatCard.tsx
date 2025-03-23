
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const statCardVariants = cva(
  "relative rounded-xl p-5 overflow-hidden transition-all duration-300 hover-scale",
  {
    variants: {
      variant: {
        default: "glass-card",
        solid: "bg-card shadow-md",
        outline: "border border-border bg-background/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  delta?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  variant?: "default" | "solid" | "outline";
}

export function StatCard({
  title,
  value,
  icon: Icon,
  delta,
  description,
  className,
  variant = "default",
}: StatCardProps) {
  const isIncreasing = delta?.isPositive;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(statCardVariants({ variant }), className)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && (
          <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-accent" />
          </div>
        )}
      </div>

      <div className="flex items-end gap-2 mb-1">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {delta && (
          <span
            className={cn(
              "text-xs font-medium flex items-center",
              isIncreasing ? "text-green-500" : "text-red-500"
            )}
          >
            {isIncreasing ? "+" : ""}
            {delta.value}%
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
