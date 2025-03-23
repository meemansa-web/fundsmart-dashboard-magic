
import { useState, useEffect } from "react";
import { ChartCard } from "./ChartCard";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  PlusCircle,
  Clock
} from "lucide-react";

const financialGoals = [
  { 
    id: 1,
    name: "Retirement Fund", 
    target: 500000,
    current: 175000,
    deadline: "2045-01-01",
    monthlyContribution: 800,
    progress: 35,
    onTrack: true,
    estimatedCompletion: "2044-05-12"
  },
  { 
    id: 2,
    name: "Home Down Payment", 
    target: 80000,
    current: 52000,
    deadline: "2025-06-01",
    monthlyContribution: 1500,
    progress: 65,
    onTrack: true,
    estimatedCompletion: "2025-02-15"
  },
  { 
    id: 3,
    name: "Children's Education", 
    target: 120000,
    current: 28000,
    deadline: "2032-09-01",
    monthlyContribution: 600,
    progress: 23,
    onTrack: false,
    estimatedCompletion: "2034-06-22"
  },
  { 
    id: 4,
    name: "World Travel", 
    target: 30000,
    current: 12500,
    deadline: "2026-12-01",
    monthlyContribution: 400,
    progress: 42,
    onTrack: true,
    estimatedCompletion: "2026-09-03"
  },
];

export function GoalTracker() {
  const [goals, setGoals] = useState(financialGoals);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getTimeLeft = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    
    // Calculate difference in years and months
    let years = targetDate.getFullYear() - today.getFullYear();
    let months = targetDate.getMonth() - today.getMonth();
    
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    // Format the result
    if (years > 0) {
      return `${years}y ${months}m left`;
    } else if (months > 0) {
      return `${months} months left`;
    } else {
      // Calculate days
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? `${diffDays} days left` : 'Due today';
    }
  };
  
  const getProgressColor = (progress: number, onTrack: boolean) => {
    if (!onTrack) return "bg-yellow-500";
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-yellow-500";
    if (progress < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <ChartCard 
      title="Financial Goal Tracker" 
      description="Monitor progress and stay on track with your investment goals"
      className="h-full"
      footer={
        <Button className="w-full justify-center gap-2" variant="outline">
          <PlusCircle className="h-4 w-4" />
          <span>Add New Financial Goal</span>
        </Button>
      }
      menuItems={[
        { label: "Refresh Goals", onClick: () => console.log("Refresh") },
        { label: "Goal Recommendations", onClick: () => console.log("Recommendations") },
        { label: "Archive Completed Goals", onClick: () => console.log("Archive") },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: loaded ? 1 : 0, 
              y: loaded ? 0 : 20 
            }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-4 hover:bg-accent/5 transition-colors border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <h3 className="font-semibold">{goal.name}</h3>
                  </div>
                  <p className="text-xl font-semibold mt-1">
                    {formatCurrency(goal.current)} 
                    <span className="text-sm text-muted-foreground font-normal ml-1">
                      of {formatCurrency(goal.target)}
                    </span>
                  </p>
                </div>
                <Badge className={goal.onTrack ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}>
                  {goal.onTrack ? "On Track" : "Needs Attention"}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className={getProgressColor(goal.progress, goal.onTrack)} />
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Target date:</span>
                    <span className="font-medium">{formatDate(goal.deadline)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{getTimeLeft(goal.deadline)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Monthly:</span>
                    <span className="font-medium">{formatCurrency(goal.monthlyContribution)}</span>
                  </div>
                  {!goal.onTrack && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Increase contributions</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}
