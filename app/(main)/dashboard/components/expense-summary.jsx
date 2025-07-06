"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ExpenseSummary({ monthlySpending, totalSpent }) {
  // Format monthly data for chart
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData =
    monthlySpending?.map((item) => {
      const date = new Date(item.month);
      return {
        name: monthNames[date.getMonth()],
        amount: item.total,
      };
    }) || [];

  // Get current year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return (
    <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl text-white">
      <CardHeader>
        <CardTitle className="text-white text-xl">Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Total this month</p>
            <h3 className="text-2xl font-bold mt-1 text-sky-400">
              ${monthlySpending?.[currentMonth]?.total.toFixed(2) || "0.00"}
            </h3>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Total this year</p>
            <h3 className="text-2xl font-bold mt-1 text-purple-400">
              ${totalSpent?.toFixed(2) || "0.00"}
            </h3>
          </div>
        </div>

        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]}
                labelFormatter={() => "Spending"}
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)'
                }}
                labelStyle={{
                  color: '#9CA3AF',
                  fontWeight: '500'
                }}
                itemStyle={{
                  color: '#0EA5E9',
                  fontWeight: '600'
                }}
                cursor={{
                  fill: 'rgba(14, 165, 233, 0.1)'
                }}
              />
              <Bar dataKey="amount" fill="url(#skyGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-gray-400 text-center mt-2">
          Monthly spending for {currentYear}
        </p>
      </CardContent>
    </Card>
  );
}