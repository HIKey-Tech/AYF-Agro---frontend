import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    mockFarms,
    formatFullCurrency,
    calculateFundingProgress,
    // calculateExpectedReturn
} from "@/lib/mock-data";
import { ArrowRight, Plus, Shield, MapPin, Clock, TrendingUp, Target } from "lucide-react";
import { toast } from "sonner";

export default function FarmDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [investmentAmount, setInvestmentAmount] = useState("1000");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [showInvestment, setShowInvestment] = useState(false);

    const farm = mockFarms.find(f => f.id === id);

    if (!farm) {
        return (
            <DashboardLayout userRole="investor">
                <div className="flex items-center justify-center h-96">
                    <p className="text-muted-foreground">Farm not found</p>
                </div>
            </DashboardLayout>
        );
    }

    const progress = calculateFundingProgress(farm.currentAmount, farm.targetAmount);
    const amount = parseFloat(investmentAmount) || 0;
    // const expectedReturn = calculateExpectedReturn(amount, farm.roiPercentage);

    const expectedPayoutDate = new Date();
    expectedPayoutDate.setMonth(expectedPayoutDate.getMonth() + farm.durationMonths);

    const handleInvest = () => {
        if (amount < farm.minInvestment) {
            toast.error(`Minimum investment is ${formatFullCurrency(farm.minInvestment)}`);
            return;
        }

        toast.success("Investment Successful!", {
            description: `Your investment in '${farm.name}' is confirmed.`,
        });

        setTimeout(() => {
            navigate("/my-investments");
        }, 1500);
    };

    if (showInvestment) {
        return (
            <DashboardLayout userRole="investor">
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{farm.name}</h1>
                    <p className="text-muted-foreground mb-8">Enter your investment details below to proceed.</p>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1" />

                        <div className="w-full lg:w-96">
                            <div className="bg-card rounded-xl border border-border p-6">
                                <div className="mb-6">
                                    <Label htmlFor="amount">Enter Amount (USD)</Label>
                                    <div className="relative mt-1.5">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            id="amount"
                                            type="number"
                                            value={investmentAmount}
                                            onChange={(e) => setInvestmentAmount(e.target.value)}
                                            className="pl-7 text-lg"
                                            min={farm.minInvestment}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-sm text-primary mb-1">Projected ROI</p>
                                        <p className="text-xl font-bold">{farm.roiPercentage}% APY</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-primary mb-1">Expected Payout</p>
                                        <p className="text-xl font-bold">
                                            {expectedPayoutDate.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <Label className="mb-3 block">Payment Method</Label>
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                        <div className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === "card" ? "border-primary bg-secondary" : "border-border"}`}>
                                            <Label htmlFor="card" className="flex flex-col cursor-pointer">
                                                <span className="font-medium">Pay with Card</span>
                                                <span className="text-sm text-muted-foreground">Stripe</span>
                                            </Label>
                                            <RadioGroupItem value="card" id="card" />
                                        </div>
                                        <div className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors mt-2 ${paymentMethod === "wallet" ? "border-primary bg-secondary" : "border-border"}`}>
                                            <Label htmlFor="wallet" className="flex flex-col cursor-pointer">
                                                <span className="font-medium">Pay with Wallet</span>
                                                <span className="text-sm text-muted-foreground">Use your AYF balance</span>
                                            </Label>
                                            <RadioGroupItem value="wallet" id="wallet" />
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Button
                                    className="w-full btn-primary-gradient h-12"
                                    onClick={handleInvest}
                                >
                                    Proceed to Payment
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-primary">
                                    <Shield className="w-4 h-4" />
                                    <span>Secure SSL Encryption Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <a href="#" className="text-primary text-sm hover:underline flex items-center justify-center gap-2">
                            <Shield className="w-4 h-4" />
                            Need help? Read our investment FAQs or Contact Support
                        </a>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="investor">
            <div className="max-w-6xl mx-auto animate-fade-in">
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                    <img
                        src={farm.image}
                        alt={farm.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                        <Badge variant="secondary" className="mb-2">Verified Project</Badge>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">{farm.name}</h1>
                        <p className="text-primary-foreground/80">Cultivating Prosperity in Rural Liberia</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        <Tabs defaultValue="overview">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="updates">Updates (2)</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-6">
                                <div className="prose prose-neutral max-w-none">
                                    <h2 className="text-xl font-bold mb-4">About the Project</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {farm.description}
                                    </p>
                                </div>

                                {/* ROI Calculator */}
                                <div className="mt-8 bg-muted rounded-xl p-6">
                                    <h3 className="font-semibold mb-4">ROI Example</h3>
                                    <div className="flex items-center gap-4 md:gap-8">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Your Investment</p>
                                            <p className="text-3xl md:text-4xl font-bold">$100</p>
                                        </div>
                                        <div className="text-primary">
                                            <ArrowRight className="w-6 h-6" />
                                            <p className="text-sm mt-1">{farm.durationMonths} Months</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Estimated Return</p>
                                            <p className="text-3xl md:text-4xl font-bold text-primary">
                                                ${Math.round(100 * (1 + farm.roiPercentage / 100))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="updates" className="mt-6">
                                <div className="space-y-4">
                                    <div className="bg-card border border-border rounded-lg p-4">
                                        <p className="text-sm text-muted-foreground mb-1">Dec 10, 2024</p>
                                        <h4 className="font-semibold mb-2">Planting Phase Complete</h4>
                                        <p className="text-muted-foreground">Successfully completed the initial planting phase. Crops are showing excellent early growth.</p>
                                    </div>
                                    <div className="bg-card border border-border rounded-lg p-4">
                                        <p className="text-sm text-muted-foreground mb-1">Nov 25, 2024</p>
                                        <h4 className="font-semibold mb-2">Land Preparation Finished</h4>
                                        <p className="text-muted-foreground">Completed soil preparation and irrigation system installation.</p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80">
                        <div className="bg-card border border-border rounded-xl p-5 sticky top-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-primary mb-1 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> Location
                                    </p>
                                    <p className="font-medium">{farm.location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-primary mb-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Duration
                                    </p>
                                    <p className="font-medium">{farm.durationMonths} Months</p>
                                </div>
                                <div>
                                    <p className="text-sm text-primary mb-1 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> Projected ROI
                                    </p>
                                    <p className="font-medium">{farm.roiPercentage}% APY</p>
                                </div>
                                <div>
                                    <p className="text-sm text-primary mb-1 flex items-center gap-1">
                                        <Target className="w-3 h-3" /> Funding Goal
                                    </p>
                                    <p className="font-medium">{formatFullCurrency(farm.targetAmount)}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between text-sm mb-1.5">
                                    <span className="text-primary">Funding Progress</span>
                                    <span className="font-medium">{progress}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground mt-1.5">
                                    {formatFullCurrency(farm.currentAmount)} of {formatFullCurrency(farm.targetAmount)}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1">
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add to Watchlist
                                </Button>
                                <Button
                                    className="flex-1 btn-primary-gradient"
                                    onClick={() => setShowInvestment(true)}
                                >
                                    Invest Now
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
