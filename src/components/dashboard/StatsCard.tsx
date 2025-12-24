import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    label: string;
    value: string;
    trend?: string;
    trendLabel?: string;
    icon?: React.ReactNode;
    className?: string;
}

export function StatsCard({ label, value, trend, trendLabel, icon, className }: StatsCardProps) {
    const isPositive = trend?.startsWith("+");

    return (
        <div className={cn("stat-card", className)}>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                {icon || <TrendingUp className="w-4 h-4 text-primary" />}
                <span className="text-sm">{label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
                <p className={cn(
                    "text-sm mt-1",
                    isPositive ? "text-primary" : "text-muted-foreground"
                )}>
                    {trend} {trendLabel}
                </p>
            )}
        </div>
    );
}
