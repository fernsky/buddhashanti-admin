"use client";
import React, { useEffect } from "react";
import { useAggregateStore } from "@/hooks/use-aggregate-store";
import { AggregateTableView } from "./table/AggregateTableView";
import { AggregateGridView } from "./AggregateGridView";
import { AggregateMapView } from "./map/AggregateMapView";
import { AggregateViewSwitch } from "./AggregateViewSwitch";
import { AggregateFiltersPanel } from "./AggregateFiltersPanel";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Home, Store, BarChart4, Info } from "lucide-react";

export function AggregateDataView() {
  const { view, pagination, filters, sorting, setPagination } =
    useAggregateStore();

  // Fetch building stats for informational purposes
  const { data: buildingStats } = api.aggregate.getBuildingStats.useQuery();

  // Reset pagination offset when filters change
  useEffect(() => {
    setPagination({ offset: 0 });
  }, [filters, setPagination]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Aggregate Data</h2>
          <p className="text-muted-foreground">
            {buildingStats ? (
              <>
                Showing data from {buildingStats.totalBuildings} buildings with{" "}
                {buildingStats.totalHouseholds} households and{" "}
                {buildingStats.totalBusinesses} businesses
              </>
            ) : (
              "Loading building statistics..."
            )}
          </p>
        </div>
        <AggregateViewSwitch />
      </div>

      <AggregateFiltersPanel />

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="data" className="flex gap-2 items-center">
            {view.viewMode === "map" ? (
              <MapPin className="h-4 w-4" />
            ) : (
              <Building className="h-4 w-4" />
            )}
            <span>Data</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex gap-2 items-center">
            <BarChart4 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex gap-2 items-center">
            <Info className="h-4 w-4" />
            <span>About</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          {view.viewMode === "table" && <AggregateTableView />}

          {view.viewMode === "grid" && <AggregateGridView />}

          {view.viewMode === "map" && (
            <Card className="overflow-hidden border rounded-lg">
              <AggregateMapView />
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <BarChart4 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">
                Analytics Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md">
                The analytics dashboard for aggregate data is currently under
                development. Here you'll soon be able to view charts, trends and
                statistics derived from your survey data.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">About Aggregate Data</h3>

            <div className="space-y-4">
              <p>
                The Aggregate Data module provides a unified view of all survey
                data collected across Buddha Shanti Municipality, bringing
                together buildings, households, and businesses in a single
                interface.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Buildings</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    View information about physical structures, including
                    ownership details, construction materials, and location
                    data.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Households</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Access data about residential units, including family
                    details, agricultural activities, and socioeconomic
                    information.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Businesses</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Explore commercial activities, including business types,
                    employee information, and economic contributions.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Map pin icon component
function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
