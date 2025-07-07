"use client";

import { useState, useEffect } from "react";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { BarLoader } from "react-spinners";
import { Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GroupSelector({ onChange }) {
  const [selectedGroupId, setSelectedGroupId] = useState("");

  // Single query to get all data we need
  const { data, isLoading } = useConvexQuery(
    api.groups.getGroupOrMembers,
    selectedGroupId ? { groupId: selectedGroupId } : {}
  );

  // When group data changes, notify parent
  useEffect(() => {
    if (data?.selectedGroup && onChange) {
      onChange(data.selectedGroup);
    }
  }, [data, onChange]);

  const handleGroupChange = (groupId) => {
    setSelectedGroupId(groupId);
  };

  if (isLoading) {
    return <BarLoader width={"100%"} color="#0ea5e9" />;
  }

  if (!data?.groups || data.groups.length === 0) {
    return (
      <div className="text-sm text-amber-400 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        You need to create a group first before adding a group expense.
      </div>
    );
  }

  return (
    <div>
      <Select value={selectedGroupId} onValueChange={handleGroupChange}>
        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-sky-500">
          <SelectValue placeholder="Select a group" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-600">
          {data.groups.map((group) => (
            <SelectItem 
              key={group.id} 
              value={group.id}
              className="text-white hover:bg-gray-700 focus:bg-gray-700"
            >
              <div className="flex items-center gap-2">
                <div className="bg-sky-500/20 p-1 rounded-full">
                  <Users className="h-3 w-3 text-sky-400" />
                </div>
                <span>{group.name}</span>
                <span className="text-xs text-gray-400">
                  ({group.memberCount} members)
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading && selectedGroupId && (
        <div className="mt-2">
          <BarLoader width={"100%"} color="#0ea5e9" />
        </div>
      )}
    </div>
  );
}