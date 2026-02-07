"use client";

import { DataTable } from "@/components/organisms/data-table/data-table";
import { recentLeadsColumns } from "./recent-leads-columns";
import { DashboardLead } from "../../types";
import { Skeleton } from "@/components/atoms/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";

interface RecentLeadsProps {
  data: DashboardLead[];
  isLoading: boolean;
}

export function RecentLeads({ data, isLoading }: RecentLeadsProps) {
  if (isLoading) {
    return (
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-none shadow-none bg-transparent p-0">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle>Leads Recentes</CardTitle>
        <CardDescription>
          Visualize e gerencie os últimos leads capturados.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <DataTable
          columns={recentLeadsColumns}
          data={data}
        />
      </CardContent>
    </Card>
  );
}
