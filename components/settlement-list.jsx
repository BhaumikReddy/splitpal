"use client";

import { useState } from "react";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";

export function SettlementList({
  settlements,
  isGroupSettlement = false,
  userLookupMap,
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  console.log("settlements", settlements);

  if (!settlements || !settlements.length) {
    return (
      <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
        <CardContent className="py-8 text-center">
          <p className="text-gray-400">No settlements found</p>
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up
  const getUserDetails = (userId) => {
    // Simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl: null,
      id: userId,
    };
  };

  return (
    <div className="flex flex-col gap-4">
      {settlements.map((settlement) => {
        const payer = getUserDetails(settlement.paidByUserId);
        const receiver = getUserDetails(settlement.receivedByUserId);
        const isCurrentUserPayer = settlement.paidByUserId === currentUser?._id;
        const isCurrentUserReceiver =
          settlement.receivedByUserId === currentUser?._id;

        return (
          <Card
            className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
            key={settlement._id}
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Settlement icon */}
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <ArrowLeftRight className="h-5 w-5 text-green-400" />
                  </div>

                  <div>
                    <h3 className="font-medium text-white">
                      Settlement
                    </h3>
                    <div className="flex items-center text-sm text-gray-400 gap-2">
                      <span>
                        {format(new Date(settlement.date), "MMM d, yyyy")}
                      </span>
                      {settlement.note && (
                        <>
                          <span>•</span>
                          <span>{settlement.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium text-green-400">
                    ${settlement.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {isCurrentUserPayer ? (
                      <span className="text-amber-400">You paid</span>
                    ) : isCurrentUserReceiver ? (
                      <span className="text-green-400">You received</span>
                    ) : (
                      <span>Payment</span>
                    )}
                  </div>
                  {isGroupSettlement && (
                    <Badge variant="outline" className="mt-1 border-gray-600 text-gray-300 bg-gray-700/50">
                      Group settlement
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}