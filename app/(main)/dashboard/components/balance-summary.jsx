import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export function BalanceSummary({ balances }) {
  if (!balances) return null;

  const { oweDetails } = balances;
  const hasOwedDetails = oweDetails?.youAreOwedBy?.length > 0;
  const hasOwingDetails = oweDetails?.youOwe?.length > 0;
  const hasPositiveBalance = balances.youAreOwed > 0;
  const hasNegativeBalance = balances.youOwe > 0;

  return (
    <div className="space-y-4">
      {!hasPositiveBalance && !hasNegativeBalance && (
        <div className="text-center py-6">
          <p className="text-gray-400">You're all settled up!</p>
        </div>
      )}

      {hasPositiveBalance && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3 text-white">
            <ArrowUpCircle className="h-4 w-4 text-green-400 mr-2" />
            Owed to you
          </h3>
          <div className="space-y-3">
            {hasOwedDetails ? (
              oweDetails.youAreOwedBy.map((item) => (
                <Link
                  href={`/person/${item.userId}`}
                  key={item.userId}
                  className="flex items-center justify-between hover:bg-gray-800 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 bg-gray-900/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-green-500/20">
                      <AvatarImage src={item.imageUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold">
                        {item.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-green-400">
                    ${item.amount.toFixed(2)}
                  </span>
                </Link>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400">Total amount owed to you: ${balances.youAreOwed.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {hasNegativeBalance && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3 text-white">
            <ArrowDownCircle className="h-4 w-4 text-red-400 mr-2" />
            You owe
          </h3>
          <div className="space-y-3">
            {hasOwingDetails ? (
              oweDetails.youOwe.map((item) => (
                <Link
                  href={`/person/${item.userId}`}
                  key={item.userId}
                  className="flex items-center justify-between hover:bg-gray-800 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 bg-gray-900/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-red-500/20">
                      <AvatarImage src={item.imageUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white font-bold">
                        {item.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-red-400">
                    ${item.amount.toFixed(2)}
                  </span>
                </Link>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400">Total amount you owe: ${balances.youOwe.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}