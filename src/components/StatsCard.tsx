import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendValue: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ title, value, trend, trendValue, icon: Icon, iconColor = "text-primary" }: StatsCardProps) {
  const isPositiveTrend = !trendValue.includes("redução");
  const trendColor = isPositiveTrend ? "text-success" : "text-destructive";

  return (
    <div className="bg-card rounded-xl shadow-soft p-6 flex flex-col items-start">
      <div className="flex items-center justify-between w-full">
        <div className="text-muted-foreground text-sm mb-2">{title}</div>
        <Icon className={`${iconColor} w-5 h-5`} />
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className={`text-xs ${trendColor} font-semibold`}>{trendValue}</div>
    </div>
  );
}