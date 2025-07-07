"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import SettlementForm from "./components/settlement-form";

export default function SettlementPage() {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;

  const { data, isLoading } = useConvexQuery(
    api.settlements.getSettlementData,
    {
      entityType: type,
      entityId: id,
    }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#0ea5e9" />
      </div>
    );
  }

  // Function to handle after successful settlement creation
  const handleSuccess = () => {
    // Redirect based on type
    if (type === "user") {
      router.push(`/person/${id}`);
    } else if (type === "group") {
      router.push(`/groups/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto py-6 max-w-lg">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-sky-500"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Record a settlement
          </h1>
          <p className="text-gray-400 mt-1">
            {type === "user"
              ? `Settling up with ${data?.counterpart?.name}`
              : `Settling up in ${data?.group?.name}`}
          </p>
        </div>

        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl">
          <CardHeader className="border-b border-gray-700">
            <div className="flex items-center gap-3">
              {type === "user" ? (
                <Avatar className="h-10 w-10 ring-2 ring-sky-500/20">
                  <AvatarImage src={data?.counterpart?.imageUrl} />
                  <AvatarFallback className="bg-sky-500 text-white">
                    {data?.counterpart?.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="bg-sky-500/20 p-2 rounded-md">
                  <Users className="h-6 w-6 text-sky-400" />
                </div>
              )}
              <CardTitle className="text-white">
                {type === "user" ? data?.counterpart?.name : data?.group?.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <SettlementForm
              entityType={type}
              entityData={data}
              onSuccess={handleSuccess}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}