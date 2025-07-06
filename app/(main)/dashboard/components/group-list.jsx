import Link from "next/link";
import { Users } from "lucide-react";

export function GroupList({ groups }) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400">No groups yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Create a group to start tracking shared expenses
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        // Calculate total balance in the group
        const balance = group.balance || 0;
        const hasBalance = balance !== 0;

        return (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className="flex items-center justify-between hover:bg-gray-800 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 bg-gray-900/50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-xl shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">{group.name}</p>
                <p className="text-xs text-gray-400">
                  {group.members.length} members
                </p>
              </div>
            </div>

            {hasBalance && (
              <span
                className={`text-sm font-semibold ${
                  balance > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {balance > 0 ? "+" : ""}${balance.toFixed(2)}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}