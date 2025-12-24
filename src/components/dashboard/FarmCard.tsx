// Install dependencies for this file with:
// npm install @tanstack/react-router lucide-react

import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {  calculateFundingProgress, type Farm } from "@/lib/mock-data";
// import { cn } from "@/lib/utils";

interface FarmCardProps {
    farm: Farm;
    variant?: "default" | "compact";
}

export function FarmCard({ farm, variant = "default" }: FarmCardProps) {
    const progress = calculateFundingProgress(farm.currentAmount, farm.targetAmount);

    const statusBadge = {
        funding: <Badge className="badge-funding">Funding</Badge>,
        active: <Badge className="badge-active">Active</Badge>,
        closed: <Badge className="badge-closed">Closed</Badge>,
    };

    if (variant === "compact") {
        return (
            <div className="card-elevated rounded-xl overflow-hidden border border-border">
                <div className="flex items-center gap-4 p-4">
                    <img
                        src={farm.image}
                        alt={farm.name}
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            {statusBadge[farm.status as keyof typeof statusBadge]}
                        </div>
                        <h3 className="font-semibold text-foreground truncate">{farm.name}</h3>
                        <p className="text-sm text-muted-foreground">{farm.location}</p>
                    </div>
                </div>
                <div className="px-4 pb-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>{farm.roiPercentage}% ROI</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{farm.investorCount} Investors</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card-elevated rounded-xl overflow-hidden border border-border group">
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={farm.image}
                    alt={farm.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                    {statusBadge[farm.status as keyof typeof statusBadge]}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-foreground text-lg mb-1">{farm.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{farm.location}</p>

                <div className="flex items-center justify-between text-sm mb-3">
                    <Badge variant="secondary" className="text-primary font-semibold">
                        {farm.roiPercentage}% ROI
                    </Badge>
                    <span className="text-muted-foreground">{farm.durationMonths} Months</span>
                </div>

                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground">Funding Progress</span>
                        <span className="font-medium text-primary">{progress}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Use 'to' prop instead of 'href' as required by @tanstack/react-router */}
                <Link to={`/farm/${farm.id}`}>
                    <Button className="w-full btn-primary-gradient">
                        Invest Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
