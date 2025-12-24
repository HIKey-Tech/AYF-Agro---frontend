import type { Investment } from "@/lib/mock-data";

interface InvestmentCardProps {
    investment: Investment;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
    return (
        <div className="card-elevated rounded-xl overflow-hidden border border-border">
            <div className="aspect-[16/10] overflow-hidden">
                <img
                    src={investment.farm.image}
                    alt={investment.farm.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{investment.farm.name}</h3>
                    <span className="text-sm text-primary font-medium">
                        {investment.daysRemaining} Days Remaining
                    </span>
                </div>

                <div className="space-y-1 mb-3">
                    <p className="text-sm">
                        <span className="text-muted-foreground">Amount Invested: </span>
                        <span className="font-semibold">${investment.amount.toLocaleString()}</span>
                    </p>
                    <p className="text-sm">
                        <span className="text-muted-foreground">Projected ROI: </span>
                        <span className="font-semibold">{investment.farm.roiPercentage}%</span>
                    </p>
                </div>

                <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground">Investment Cycle</span>
                        <span className="font-medium text-primary">{investment.progress}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill bg-accent"
                            style={{ width: `${investment.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
