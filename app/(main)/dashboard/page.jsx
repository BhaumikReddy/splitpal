"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ExpenseSummary } from "./components/expense-summary";
import { BalanceSummary } from "./components/balance-summary";
import { GroupList } from "./components/group-list";

export default function Dashboard() {
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );

  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );

  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );

  const { data: monthlySpending, isLoading: monthlySpendingLoading } =
    useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading =
    balancesLoading ||
    groupsLoading ||
    totalSpentLoading ||
    monthlySpendingLoading;

  return (
    <div className="container mx-auto py-6 space-y-6">
      {isLoading ? (
        <div className="w-full py-12 flex justify-center">
          <BarLoader width={"100%"} color="#0ea5e9" />
        </div>
      ) : (
        <>
          <div className="flex  justify-between flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent">Dashboard</h1>
            <Button 
              asChild
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/expenses/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add expense
              </Link>
            </Button>
          </div>

          {/* Balance overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {balances?.totalBalance > 0 ? (
                    <span className="text-green-400">
                      +${balances?.totalBalance.toFixed(2)}
                    </span>
                  ) : balances?.totalBalance < 0 ? (
                    <span className="text-red-400">
                      -${Math.abs(balances?.totalBalance).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-white">$0.00</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {balances?.totalBalance > 0
                    ? "You are owed money"
                    : balances?.totalBalance < 0
                      ? "You owe money"
                      : "All settled up!"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  You are owed
                </CardTitle>
              </CardHeader>
              <CardContent>
                {balances?.youAreOwed > 0 ? (
                  <>
                    <div className="text-2xl font-bold text-green-400">
                      ${balances?.youAreOwed?.toFixed(2) || "0.00"}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {balances?.oweDetails?.youAreOwedBy?.length > 0 
                        ? `From ${balances?.oweDetails?.youAreOwedBy?.length} people`
                        : "Total amount owed to you"
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-white">$0.00</div>
                    <p className="text-xs text-gray-400 mt-1">
                      No one owes you money
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  You owe
                </CardTitle>
              </CardHeader>
              <CardContent>
                {balances?.youOwe > 0 ? (
                  <>
                    <div className="text-2xl font-bold text-red-400">
                      ${balances?.youOwe?.toFixed(2) || "0.00"}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {balances?.oweDetails?.youOwe?.length > 0 
                        ? `To ${balances?.oweDetails?.youOwe?.length} people`
                        : "Total amount you owe"
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-white">$0.00</div>
                    <p className="text-xs text-gray-400 mt-1">
                      You don't owe anyone
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Expense summary */}
              <ExpenseSummary
                monthlySpending={monthlySpending}
                totalSpent={totalSpent}
              />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Balance details */}
              <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Balance Details</CardTitle>
                    <Button variant="link" asChild className="p-0 text-sky-400 hover:text-sky-300">
                      <Link href="/contacts">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <BalanceSummary balances={balances} />
                </CardContent>
              </Card>

              {/* Groups */}
              <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Your Groups</CardTitle>
                    <Button variant="link" asChild className="p-0 text-sky-400 hover:text-sky-300">
                      <Link href="/contacts">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <GroupList groups={groups} />
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-sky-500"
                  >
                    <Link href="/contacts?createGroup=true">
                      <Users className="mr-2 h-4 w-4" />
                      Create new group
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}