"use client";

import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryById } from "@/lib/expense-categories";
import { getCategoryIcon } from "@/lib/expense-categories";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ExpenseList({
  expenses,
  showOtherPerson = true,
  isGroupExpense = false,
  otherPersonId = null,
  userLookupMap = {},
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const deleteExpense = useConvexMutation(api.expenses.deleteExpense);

  if (!expenses || !expenses.length) {
    return (
      <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
        <CardContent className="py-8 text-center">
          <p className="text-gray-400">No expenses found</p>
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up from expense
  const getUserDetails = (userId) => {
    // For the group context, we need to look up members from somewhere else
    // This is a simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl: null,
      id: userId,
    };
  };

  // Check if the user can delete an expense (creator or payer)
  const canDeleteExpense = (expense) => {
    if (!currentUser) return false;
    return (
      expense.createdBy === currentUser._id ||
      expense.paidByUserId === currentUser._id
    );
  };

  // Handle delete expense
  const handleDeleteExpense = async (expense) => {
    // Use basic JavaScript confirm
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteExpense.mutate({ expenseId: expense._id });
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {expenses.map((expense) => {
        const payer = getUserDetails(expense.paidByUserId);
        const isCurrentUserPayer = expense.paidByUserId === currentUser?._id;
        const category = getCategoryById(expense.category);
        const CategoryIcon = getCategoryIcon(category.id);
        const showDeleteOption = canDeleteExpense(expense);

        return (
          <Card
            className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
            key={expense._id}
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Category icon */}
                  <div className="bg-sky-500/20 p-2 rounded-full">
                    <CategoryIcon className="h-5 w-5 text-sky-400" />
                  </div>

                  <div>
                    <h3 className="font-medium text-white">{expense.description}</h3>
                    <div className="flex items-center text-sm text-gray-400 gap-2">
                      <span>
                        {format(new Date(expense.date), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-medium text-white">
                      ${expense.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {isCurrentUserPayer ? (
                        <span className="text-green-400 font-medium">You paid</span>
                      ) : (
                        <span className="text-red-400 font-medium">
                          {payer.name} paid
                        </span>
                      )}
                    </div>
                    {isGroupExpense && (
                      <Badge variant="outline" className="mt-1 border-gray-600 text-gray-300 bg-gray-700/50">
                        Group expense
                      </Badge>
                    )}
                  </div>

                  {showDeleteOption && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      onClick={() => handleDeleteExpense(expense)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete expense</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Display splits info */}
              <div className="mt-3 text-sm">
                <div className="flex gap-2 flex-wrap">
                  {expense.splits.map((split, idx) => {
                    const splitUser = getUserDetails(split.userId);
                    const isCurrentUser = split.userId === currentUser?._id;
                    const shouldShow =
                      showOtherPerson ||
                      (!showOtherPerson &&
                        (split.userId === currentUser?._id ||
                          split.userId === otherPersonId));

                    if (!shouldShow) return null;

                    return (
                      <Badge
                        key={idx}
                        variant={split.paid ? "outline" : "secondary"}
                        className={`flex items-center gap-1 ${
                          split.paid 
                            ? "border-gray-600 text-gray-300 bg-gray-700/50" 
                            : "bg-gray-600 text-gray-200"
                        }`}
                      >
                        <Avatar className="h-4 w-4 ring-1 ring-sky-500/20">
                          <AvatarImage src={splitUser.imageUrl} />
                          <AvatarFallback className="bg-gradient-to-br from-sky-500 to-blue-600 text-white text-xs">
                            {splitUser.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span>
                          {isCurrentUser ? "You" : splitUser.name}: $
                          {split.amount.toFixed(2)}
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}