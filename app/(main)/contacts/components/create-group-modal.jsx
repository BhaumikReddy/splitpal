"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const groupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
});

export function CreateGroupModal({ isOpen, onClose, onSuccess }) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const createGroup = useConvexMutation(api.contacts.createGroup);
  const { data: searchResults, isLoading: isSearching } = useConvexQuery(
    api.users.searchUsers,
    { query: searchQuery }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const addMember = (user) => {
    if (!selectedMembers.some((m) => m.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
    setCommandOpen(false);
  };

  const removeMember = (userId) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId));
  };

  const onSubmit = async (data) => {
    try {
      // Extract member IDs
      const memberIds = selectedMembers.map((member) => member.id);

      console.log("Creating group with data:", {
        name: data.name,
        description: data.description,
        members: memberIds,
      });

      // Create the group
      const groupId = await createGroup.mutate({
        name: data.name,
        description: data.description,
        members: memberIds,
      });

      console.log("Group created successfully with ID:", groupId);

      // Success
      toast.success("Group created successfully!");
      reset();
      setSelectedMembers([]);
      onClose();

      // Redirect to the new group page
      if (onSuccess) {
        onSuccess(groupId);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group: " + error.message);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedMembers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Group</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Group Name</Label>
            <Input
              id="name"
              placeholder="Enter group name"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-sky-500"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter group description"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-sky-500"
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Members</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {/* Current user (always included) */}
              {currentUser && (
                <Badge variant="secondary" className="px-3 py-1 bg-gray-700 text-white border-gray-600">
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={currentUser.imageUrl} />
                    <AvatarFallback className="bg-sky-500 text-white">
                      {currentUser.name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{currentUser.name} (You)</span>
                </Badge>
              )}

              {/* Selected members */}
              {selectedMembers.map((member) => (
                <Badge
                  key={member.id}
                  variant="secondary"
                  className="px-3 py-1 bg-gray-700 text-white border-gray-600"
                >
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={member.imageUrl} />
                    <AvatarFallback className="bg-purple-500 text-white">
                      {member.name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {/* Add member button with dropdown */}
              <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-xs bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-sky-500"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Add member
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-gray-800 border-gray-600" align="start" side="bottom">
                  <Command className="bg-gray-800 border-gray-600">
                    <CommandInput
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      className="bg-gray-800 text-white placeholder-gray-400 border-none focus:ring-0"
                    />
                    <CommandList className="bg-gray-800 text-white">
                      <CommandEmpty className="bg-gray-800">
                        {searchQuery.length < 2 ? (
                          <p className="py-3 px-4 text-sm text-center text-gray-400">
                            Type at least 2 characters to search
                          </p>
                        ) : isSearching ? (
                          <p className="py-3 px-4 text-sm text-center text-gray-400">
                            Searching...
                          </p>
                        ) : (
                          <p className="py-3 px-4 text-sm text-center text-gray-400">
                            No users found
                          </p>
                        )}
                      </CommandEmpty>
                      <CommandGroup className="bg-gray-800">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-300 uppercase tracking-wider bg-gray-800">
                          Users
                        </div>
                        {searchResults?.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={user.name + user.email}
                            onSelect={() => addMember(user)}
                            className="hover:bg-gray-700 text-white bg-gray-800 cursor-pointer px-3 py-2 data-[selected=true]:bg-gray-700"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback className="bg-blue-500 text-white">
                                  {user.name?.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm text-white">{user.name}</span>
                                <span className="text-xs text-gray-400">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {selectedMembers.length === 0 && (
              <p className="text-sm text-amber-400">
                Add at least one other person to the group
              </p>
            )}
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || selectedMembers.length === 0}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-none"
            >
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}