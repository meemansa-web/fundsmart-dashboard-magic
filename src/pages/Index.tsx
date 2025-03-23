
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, BarChart3, Shield, Zap, PieChart } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-border/30">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <span className="font-semibold text-white">FS</span>
          </div>
          <span className="font-semibold tracking-tight text-lg">FundSmart</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Log In
          </Button>
          <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium inline-block">
                Simplified Investing
              </span>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                Smarter financial decisions at your fingertips
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Experience the clarity and control you need to make informed investment choices. FundSmart brings everything you need into one beautiful dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={() => navigate("/dashboard")}>
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-2 rounded-2xl shadow-2xl"
            >
              <img
                src="https://placehold.co/800x600/22284b/FFFFFF/png?text=Dashboard Preview"
                alt="Dashboard Preview"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">Everything you need in one place</h2>
              <p className="text-muted-foreground">
                Our dashboard gives you the complete picture of your finances with powerful tools and beautiful visuals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl hover-scale"
                >
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-4 mb-12">
              <h2 className="text-3xl font-semibold tracking-tight">Ready to take control of your investments?</h2>
              <p className="text-muted-foreground">
                Launch the dashboard now and experience a new way of managing your financial future.
              </p>
            </div>

            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="px-6 py-8 border-t border-border/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center">
              <span className="font-semibold text-xs text-white">FS</span>
            </div>
            <span className="font-semibold tracking-tight">FundSmart</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FundSmart. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Interactive Charts",
    description: "Visualize your portfolio performance with beautiful, interactive charts.",
    icon: BarChart3,
  },
  {
    title: "Real-time Updates",
    description: "Get real-time market data and portfolio updates at your fingertips.",
    icon: Zap,
  },
  {
    title: "Portfolio Management",
    description: "Easily manage your investments across multiple asset classes.",
    icon: PieChart,
  },
  {
    title: "Secure Platform",
    description: "Bank-level security to keep your financial data safe and private.",
    icon: Shield,
  },
];

export default Index;
