"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ArrowLeftRight, ArrowLeft, Users } from "lucide-react";
import { ExpenseList } from "@/components/expense-list";
import { SettlementList } from "@/components/settlement-list";
import { GroupBalances } from "@/components/group-balances";
import { GroupMembers } from "@/components/group-members";

export default function GroupExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(api.groups.getGroupExpenses, {
    groupId: params.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <BarLoader width={"100%"} color="#0ea5e9" />
      </div>
    );
  }

  const group = data?.group;
  const members = data?.members || [];
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balances = data?.balances || [];
  const userLookupMap = data?.userLookupMap || {};

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-sky-500"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent">{group?.name}</h1>
              <p className="text-gray-400">{group?.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                {members.length} members
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              asChild 
              variant="outline"
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-purple-500"
            >
              <Link href={`/settlements/group/${params.id}`}>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Settle up
              </Link>
            </Button>
            <Button 
              asChild
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-none shadow-lg hover:shadow-sky-500/25 transition-all duration-300"
            >
              <Link href={`/expenses/new`}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add expense
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Grid layout for group details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white">Group Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupBalances balances={balances} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white">Members</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupMembers members={members} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for expenses and settlements */}
      <Tabs
        defaultValue="expenses"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
          <TabsTrigger 
            value="expenses"
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            Expenses ({expenses.length})
          </TabsTrigger>
          <TabsTrigger 
            value="settlements"
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            Settlements ({settlements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseList
            expenses={expenses}
            showOtherPerson={true}
            isGroupExpense={true}
            userLookupMap={userLookupMap}
          />
        </TabsContent>

        <TabsContent value="settlements" className="space-y-4">
          <SettlementList
            settlements={settlements}
            isGroupSettlement={true}
            userLookupMap={userLookupMap}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}