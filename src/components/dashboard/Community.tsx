
import { useState, useEffect } from "react";
import { ChartCard } from "./ChartCard";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  Share2, 
  ThumbsUp, 
  TrendingUp, 
  Award,
  Lightbulb,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock data for community discussions
const discussions = [
  {
    id: 1,
    user: {
      name: "Morgan Wilson",
      avatar: "",
      badge: "Top Investor",
    },
    title: "Thoughts on emerging AI stocks for long-term growth?",
    content: "I'm looking to diversify my tech portfolio with some AI-focused companies. What are people's thoughts on mid-cap AI stocks for 5+ year holds?",
    posted: "2 hours ago",
    likes: 24,
    comments: 18,
    shares: 5,
    tags: ["AI", "Growth", "Tech"],
  },
  {
    id: 2,
    user: {
      name: "Alex Jameson",
      avatar: "",
      badge: "Financial Advisor",
    },
    title: "Bond market outlook for rest of 2023",
    content: "With recent interest rate changes, I've been rebalancing my bond allocations. Here's my analysis on where I see opportunities in the current environment...",
    posted: "5 hours ago",
    likes: 42,
    comments: 31,
    shares: 12,
    tags: ["Bonds", "Analysis", "Rates"],
  },
  {
    id: 3,
    user: {
      name: "Riley Parker",
      avatar: "",
      badge: "Crypto Expert",
    },
    title: "Ethereum's shift to proof-of-stake - implications?",
    content: "Now that we're over a year into Ethereum's PoS model, what are people seeing in terms of yields and overall network stability?",
    posted: "1 day ago",
    likes: 67,
    comments: 52,
    shares: 23,
    tags: ["Crypto", "Ethereum", "DeFi"],
  },
];

// Mock data for investment ideas
const investmentIdeas = [
  {
    id: 1,
    user: {
      name: "Sam Taylor",
      avatar: "",
      badge: "Investment Analyst",
    },
    title: "Clean Energy ETFs for Long-Term Growth",
    content: "With global focus on sustainability, I've been researching clean energy ETFs. Here are my top 3 picks with strong fundamentals and growth potential...",
    posted: "3 hours ago",
    likes: 56,
    comments: 27,
    shares: 19,
    performance: "+12.5% (6 months)",
    isPositive: true,
    tags: ["ETFs", "Clean Energy", "Growth"],
  },
  {
    id: 2,
    user: {
      name: "Jamie Rodriguez",
      avatar: "",
      badge: "Value Investor",
    },
    title: "Undervalued Consumer Staples Worth Watching",
    content: "I've identified several consumer staples companies trading below their intrinsic value with strong dividends and stable cash flows.",
    posted: "12 hours ago",
    likes: 38,
    comments: 15,
    shares: 8,
    performance: "+8.3% (3 months)",
    isPositive: true,
    tags: ["Value", "Dividends", "Consumer"],
  },
  {
    id: 3,
    user: {
      name: "Casey Williams",
      avatar: "",
      badge: "Technical Analyst",
    },
    title: "Semiconductor Sector Technical Analysis",
    content: "Based on current chart patterns and momentum indicators, here's my technical outlook for the semiconductor industry in the coming months...",
    posted: "1 day ago",
    likes: 45,
    comments: 32,
    shares: 14,
    performance: "-3.2% (1 month)",
    isPositive: false,
    tags: ["Technical", "Semiconductors", "Analysis"],
  },
];

export function Community() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  // Function to randomly assign colors to avatars
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    
    // Simple hash function to get consistent color for same name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  return (
    <ChartCard 
      title="Community & Social Investing" 
      description="Connect with investors, share insights, and discover new opportunities"
      className="h-full"
      menuItems={[
        { label: "View All Posts", onClick: () => console.log("View all") },
        { label: "My Network", onClick: () => console.log("My network") },
        { label: "Create New Post", onClick: () => console.log("Create post") },
      ]}
    >
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search discussions, investors, or topics..." className="pl-9" />
        </div>
        
        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="discussions" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Discussions</span>
            </TabsTrigger>
            <TabsTrigger value="ideas" className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              <span>Investment Ideas</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions" className="mt-3">
            <div className="space-y-4">
              {discussions.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: loaded ? 1 : 0, 
                    y: loaded ? 0 : 20 
                  }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:bg-accent/5 transition-colors">
                    <div className="flex gap-3">
                      <Avatar className={cn("h-10 w-10", getAvatarColor(post.user.name))}>
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{post.user.name}</p>
                            <Badge variant="secondary" className="text-xs font-normal">
                              {post.user.badge}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{post.posted}</span>
                        </div>
                        
                        <h3 className="font-semibold mt-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-2">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-2">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-2">
                            <Share2 className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ideas" className="mt-3">
            <div className="space-y-4">
              {investmentIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: loaded ? 1 : 0, 
                    y: loaded ? 0 : 20 
                  }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:bg-accent/5 transition-colors">
                    <div className="flex gap-3">
                      <Avatar className={cn("h-10 w-10", getAvatarColor(idea.user.name))}>
                        <AvatarImage src={idea.user.avatar} alt={idea.user.name} />
                        <AvatarFallback>{getInitials(idea.user.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{idea.user.name}</p>
                            <Badge variant="secondary" className="text-xs font-normal">
                              {idea.user.badge}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{idea.posted}</span>
                        </div>
                        
                        <h3 className="font-semibold mt-2 flex items-center justify-between">
                          <span>{idea.title}</span>
                          <Badge className={cn(
                            idea.isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          )}>
                            <TrendingUp className={cn("h-3.5 w-3.5 mr-1", !idea.isPositive && "rotate-180")} />
                            {idea.performance}
                          </Badge>
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{idea.content}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {idea.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-2">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{idea.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-2">
                            <MessageSquare className="h-4 w-4" />
                            <span>{idea.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-2">
                            <Share2 className="h-4 w-4" />
                            <span>{idea.shares}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ChartCard>
  );
}
