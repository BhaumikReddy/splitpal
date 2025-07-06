"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function GroupMembers({ members }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No members in this group</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const isCurrentUser = member.id === currentUser?._id;
        const isAdmin = member.role === "admin";

        return (
          <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 ring-2 ring-sky-500/20">
                <AvatarImage src={member.imageUrl} />
                <AvatarFallback className="bg-gradient-to-br from-sky-500 to-blue-600 text-white text-sm">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {isCurrentUser ? "You" : member.name}
                  </span>
                  {isCurrentUser && (
                    <Badge variant="outline" className="text-xs py-0 h-5 border-sky-500 text-sky-400 bg-sky-500/10">
                      You
                    </Badge>
                  )}
                </div>
                {isAdmin && (
                  <span className="text-xs text-gray-400">Admin</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}