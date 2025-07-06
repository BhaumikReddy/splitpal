"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, User } from "lucide-react";
import { CreateGroupModal } from "./components/create-group-modal";

function ContactsContent() {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  // Ensure we're mounted before accessing search params
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for the createGroup parameter when the component mounts
  useEffect(() => {
    if (!mounted) return;
    
    const createGroupParam = searchParams.get("createGroup");

    if (createGroupParam === "true") {
      // Open the modal
      setIsCreateGroupModalOpen(true);

      // Remove the parameter from the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("createGroup");

      // Replace the current URL without the parameter
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router, mounted]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <ClipLoader size={50} color="#0ea5e9" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent animate-pulse-glow">
            Contacts
          </h1>
          <Button 
            onClick={() => setIsCreateGroupModalOpen(true)}
            className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Individual Contacts */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
              <User className="mr-3 h-6 w-6 text-sky-400" />
              People
            </h2>
            {users.length === 0 ? (
              <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
                <CardContent className="py-8 text-center text-gray-400">
                  No contacts yet. Add an expense with someone to see them here.
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {users.map((user) => (
                  <Link key={user.id} href={`/person/${user.id}`}>
                    <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-sky-500/20 rounded-xl">
                      <CardContent className="py-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 ring-2 ring-sky-500/20">
                              <AvatarImage src={user.imageUrl} />
                              <AvatarFallback className="bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-white text-lg">{user.name}</p>
                              <p className="text-sm text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Groups */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
              <Users className="mr-3 h-6 w-6 text-purple-400" />
              Groups
            </h2>
            {groups.length === 0 ? (
              <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
                <CardContent className="py-8 text-center text-gray-400">
                  No groups yet. Create a group to start tracking shared expenses.
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {groups.map((group) => (
                  <Link key={group.id} href={`/groups/${group.id}`}>
                    <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-purple-500/20 rounded-xl">
                      <CardContent className="py-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-white text-lg">{group.name}</p>
                              <p className="text-sm text-gray-400">
                                {group.memberCount} members
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <CreateGroupModal
          isOpen={isCreateGroupModalOpen}
          onClose={() => setIsCreateGroupModalOpen(false)}
          onSuccess={(groupId) => {
            router.push(`/groups/${groupId}`);
          }}
        />
      </div>
    </div>
  );
}

export default function ContactsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <ClipLoader size={50} color="#0ea5e9" />
      </div>
    }>
      <ContactsContent />
    </Suspense>
  );
}