import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockFarms, formatFullCurrency } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function AdminDashboardPage() {
    return (
        <DashboardLayout userRole="admin">
            <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <input
                                type="date"
                                className="px-3 py-2 border border-border rounded-lg bg-card text-sm"
                                placeholder="Start date"
                            />
                        </div>
                        <span className="text-muted-foreground">→</span>
                        <div>
                            <input
                                type="date"
                                className="px-3 py-2 border border-border rounded-lg bg-card text-sm"
                                placeholder="End date"
                            />
                        </div>
                    </div>

                    <RouterLink to="/admin/farm/new" className="self-end md:self-auto">
                        <Button
                            className="btn-primary-gradient flex items-center px-4 py-2 rounded-lg font-semibold shadow-lg transition-transform hover:scale-[1.04] focus:outline-none"
                            style={{ minWidth: 200, fontSize: "1rem" }}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            <span>Add New Opportunity</span>
                        </Button>
                    </RouterLink>
                </div>

                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="p-5 border-b border-border">
                        <h2 className="text-lg font-semibold">Recent Farms</h2>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Farm Name</TableHead>
                                <TableHead>ROI %</TableHead>
                                <TableHead>Goal</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockFarms.map((farm) => (
                                <TableRow key={farm.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={farm.image}
                                                alt={farm.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <span className="font-medium">{farm.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{farm.roiPercentage}%</TableCell>
                                    <TableCell>{formatFullCurrency(farm.targetAmount)}</TableCell>
                                    <TableCell>{farm.durationMonths} Months</TableCell>
                                    <TableCell>
                                        {farm.status === "active" && (
                                            <Badge className="badge-active">Active</Badge>
                                        )}
                                        {farm.status === "funding" && (
                                            <Badge className="badge-funding">Funding</Badge>
                                        )}
                                        {farm.status === "closed" && (
                                            <Badge className="badge-closed">Closed</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
}
