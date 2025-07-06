"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

/**
 * Expected `balances` shape (one object per member):
 * {
 *   id:           string;           // user id
 *   name:         string;
 *   imageUrl?:    string;
 *   totalBalance: number;           // + ve ⇒ they are owed, – ve ⇒ they owe
 *   owes:   { to: string;   amount: number }[];  // this member → others
 *   owedBy: { from: string; amount: number }[];  // others → this member
 * }
 */
export function GroupBalances({ balances }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  /* ───── guards ────────────────────────────────────────────────────────── */
  if (!balances?.length || !currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No balance information available</p>
      </div>
    );
  }

  /* ───── helpers ───────────────────────────────────────────────────────── */
  const me = balances.find((b) => b.id === currentUser._id);
  if (!me) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        You’re not part of this group
      </div>
    );
  }

  const userMap = Object.fromEntries(balances.map((b) => [b.id, b]));

  // Who owes me?
  const owedByMembers = me.owedBy
    .map(({ from, amount }) => ({ ...userMap[from], amount }))
    .sort((a, b) => b.amount - a.amount);

  // Whom do I owe?
  const owingToMembers = me.owes
    .map(({ to, amount }) => ({ ...userMap[to], amount }))
    .sort((a, b) => b.amount - a.amount);

  const isAllSettledUp =
    me.totalBalance === 0 &&
    owedByMembers.length === 0 &&
    owingToMembers.length === 0;

  /* ───── UI ────────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-4">
      {/* Current user's total balance */}
      <div className="text-center pb-4 border-b border-gray-700">
        <p className="text-sm text-gray-400 mb-1">Your balance</p>
        <p
          className={`text-2xl font-bold ${
            me.totalBalance > 0
              ? "text-green-400"
              : me.totalBalance < 0
                ? "text-red-400"
                : "text-white"
          }`}
        >
          {me.totalBalance > 0
            ? `+$${me.totalBalance.toFixed(2)}`
            : me.totalBalance < 0
              ? `-$${Math.abs(me.totalBalance).toFixed(2)}`
              : "$0.00"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {me.totalBalance > 0
            ? "You are owed money"
            : me.totalBalance < 0
              ? "You owe money"
              : "You are all settled up"}
        </p>
      </div>

      {isAllSettledUp ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Everyone is settled up!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* People who owe the current user */}
          {owedByMembers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium flex items-center mb-3 text-white">
                <ArrowUpCircle className="h-4 w-4 text-green-400 mr-2" />
                Owed to you
              </h3>
              <div className="space-y-3">
                {owedByMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 ring-2 ring-green-500/20">
                        <AvatarImage src={member.imageUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-sm">
                          {member.name?.charAt(0) ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-white">{member.name}</span>
                    </div>
                    <span className="font-medium text-green-400">
                      ${member.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* People the current user owes */}
          {owingToMembers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium flex items-center mb-3 text-white">
                <ArrowDownCircle className="h-4 w-4 text-red-400 mr-2" />
                You owe
              </h3>
              <div className="space-y-3">
                {owingToMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 ring-2 ring-red-500/20">
                        <AvatarImage src={member.imageUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white text-sm">
                          {member.name?.charAt(0) ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-white">{member.name}</span>
                    </div>
                    <span className="font-medium text-red-400">
                      ${member.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}