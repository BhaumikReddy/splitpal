"use client";

import { useRouter } from "next/navigation";
import { ExpenseForm } from "./components/expense-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function NewExpensePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container max-w-3xl mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent">Add a new expense</h1>
          <p className="text-gray-400 mt-2">
            Record a new expense to split with others
          </p>
        </div>

        <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
          <CardContent className="p-6">
            <Tabs className="pb-3" defaultValue="individual">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
                <TabsTrigger 
                  value="individual"
                  className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
                >
                  Individual Expense
                </TabsTrigger>
                <TabsTrigger 
                  value="group"
                  className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
                >
                  Group Expense
                </TabsTrigger>
              </TabsList>
              <TabsContent value="individual" className="mt-6">
                <ExpenseForm
                  type="individual"
                  onSuccess={(id) => router.push(`/person/${id}`)}
                />
              </TabsContent>
              <TabsContent value="group" className="mt-6">
                <ExpenseForm
                  type="group"
                  onSuccess={(id) => router.push(`/groups/${id}`)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}