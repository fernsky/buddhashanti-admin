import React, { useState } from "react";
import { useAggregateStore } from "@/hooks/use-aggregate-store";
import { api } from "@/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Home,
  Store,
  Calendar,
  User,
  Map,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { InfiniteLoader } from "../ui/infinite-loader";

export function AggregateTableView() {
  const {
    filters,
    pagination,
    sorting,
    view,
    setPagination,
    setSorting,
    toggleExpandedBuilding,
    setSelectedBuilding,
  } = useAggregateStore();

  // Use useQuery instead of useInfiniteQuery similar to GridView
  const { data: buildingsData, isLoading } =
    api.aggregate.getAllBuildingsInfinite.useQuery(
      {
        limit: pagination.limit,
        offset: pagination.offset,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        filters,
      },
      {
        keepPreviousData: true,
      },
    );

  // Track if we can load more
  const hasMore =
    buildingsData?.pagination?.total !== undefined &&
    buildingsData?.pagination?.offset !== undefined &&
    buildingsData?.pagination?.pageSize !== undefined &&
    buildingsData.pagination.total >
      buildingsData.pagination.offset + buildingsData.pagination.pageSize;

  // Loading state for next page
  const [loadingMore, setLoadingMore] = React.useState(false);

  // Function to load more
  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    setPagination({
      offset: pagination.offset + pagination.limit,
    });
    setLoadingMore(false);
  };

  // Handle column sorting
  const handleSortColumn = (column: string) => {
    if (sorting.sortBy === column) {
      setSorting(column, sorting.sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSorting(column, "asc");
    }
  };

  // Get buildings data
  const buildings = buildingsData?.data ?? [];

  const renderSortIcon = (column: string) => {
    if (sorting.sortBy !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sorting.sortOrder === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  // Handle building expansion
  const handleExpandBuilding = (buildingId: string) => {
    toggleExpandedBuilding(buildingId);
    setSelectedBuilding(buildingId);
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortColumn("building_id")}
                  className="flex items-center justify-start p-0 font-medium"
                >
                  Building ID
                  {renderSortIcon("building_id")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortColumn("locality")}
                  className="flex items-center justify-start p-0 font-medium"
                >
                  Locality
                  {renderSortIcon("locality")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortColumn("ward_number")}
                  className="flex items-center justify-start p-0 font-medium whitespace-nowrap"
                >
                  Ward / Area
                  {renderSortIcon("ward_number")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortColumn("building_owner_name")}
                  className="flex items-center justify-start p-0 font-medium"
                >
                  Owner
                  {renderSortIcon("building_owner_name")}
                </Button>
              </TableHead>
              <TableHead className="text-center">Households</TableHead>
              <TableHead className="text-center">Businesses</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortColumn("building_survey_date")}
                  className="flex items-center justify-start p-0 font-medium"
                >
                  Survey Date
                  {renderSortIcon("building_survey_date")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortColumn("enumerator_name")}
                  className="flex items-center justify-start p-0 font-medium"
                >
                  Enumerator
                  {renderSortIcon("enumerator_name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortColumn("map_status")}
                  className="flex items-center justify-start p-0 font-medium"
                >
                  Map Status
                  {renderSortIcon("map_status")}
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 10 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : buildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-32 text-center">
                  No buildings found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              buildings.map((building) => (
                <React.Fragment key={building.id}>
                  <TableRow
                    className={
                      view.selectedBuildingId === building.id
                        ? "bg-muted/50"
                        : undefined
                    }
                  >
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleExpandBuilding(building.id)}
                      >
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${view.expandedBuildings.has(building.id) ? "rotate-90" : ""}`}
                        />
                        <span className="sr-only">Expand</span>
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {building.buildingId}
                    </TableCell>
                    <TableCell>{building.locality}</TableCell>
                    <TableCell>
                      Ward {building.wardNumber} / {building.areaCode}
                    </TableCell>
                    <TableCell>{building.ownerName}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">
                        {building.totalFamilies || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">
                        {building.totalBusinesses || 0}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {building.surveyed_at ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(building.surveyed_at)}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">
                          Not available
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{building.enumeratorName || "Unknown"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          building.mapStatus === "validated"
                            ? "default"
                            : building.mapStatus === "needs_review"
                              ? "destructive"
                              : "default"
                        }
                      >
                        {building.mapStatus
                          ? building.mapStatus.replace("_", " ")
                          : "unverified"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(
                                `/aggregate/buildings/${building.id}`,
                                "_blank",
                              )
                            }
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              // Open the map view with this building selected
                            }}
                          >
                            <Map className="mr-2 h-4 w-4" />
                            Show on Map
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  {/* Expandable content for building details */}
                  {view.expandedBuildings.has(building.id) && (
                    <BuildingExpandedContent buildingId={building.id} />
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>

        <InfiniteLoader
          hasMore={!!hasMore}
          isLoading={loadingMore}
          onLoadMore={handleLoadMore}
        />
      </div>
    </Card>
  );
}

// Component for the expanded content of a building
function BuildingExpandedContent({ buildingId }: { buildingId: string }) {
  const [activeTab, setActiveTab] = useState<"households" | "businesses">(
    "households",
  );
  const { data: buildingDetails, isLoading } =
    api.aggregate.getBuildingById.useQuery(
      { id: buildingId, includeHouseholds: true, includeBusinesses: true },
      { keepPreviousData: true },
    );

  const { data: households } = api.aggregate.getHouseholdsByBuildingId.useQuery(
    { buildingId },
    { enabled: activeTab === "households", keepPreviousData: true },
  );

  const { data: businesses } = api.aggregate.getBusinessesByBuildingId.useQuery(
    { buildingId },
    { enabled: activeTab === "businesses", keepPreviousData: true },
  );

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={10} className="bg-muted/30 p-4">
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span>Loading building data...</span>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (!buildingDetails) {
    return (
      <TableRow>
        <TableCell colSpan={10} className="bg-muted/30 p-4">
          <div className="text-center p-4">
            Could not load building details.
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell colSpan={10} className="bg-muted/30 p-0">
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <Button
              variant={activeTab === "households" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("households")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Households ({buildingDetails.total_families || 0})
            </Button>
            <Button
              variant={activeTab === "businesses" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("businesses")}
              className="flex items-center gap-2"
            >
              <Store className="h-4 w-4" />
              Businesses ({buildingDetails.total_businesses || 0})
            </Button>
          </div>

          {activeTab === "households" && (
            <div className="rounded-md border bg-card">
              {households?.data.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Head Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Survey Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {households.data.map((household) => (
                      <TableRow key={household.id}>
                        <TableCell className="font-medium">
                          {household.headName}
                        </TableCell>
                        <TableCell>{household.headPhone}</TableCell>
                        <TableCell>{household.totalMembers}</TableCell>
                        <TableCell>{household.locality}</TableCell>
                        <TableCell>
                          {household.surveyDate
                            ? formatDate(household.surveyDate)
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `/aggregate/households/${household.id}`,
                                "_blank",
                              )
                            }
                          >
                            View
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No households found in this building
                </div>
              )}
            </div>
          )}

          {activeTab === "businesses" && (
            <div className="rounded-md border bg-card">
              {businesses?.data.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Operator</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Survey Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businesses.data.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell className="font-medium">
                          {business.businessName}
                        </TableCell>
                        <TableCell>{business.businessType}</TableCell>
                        <TableCell>{business.operatorName}</TableCell>
                        <TableCell>{business.operatorPhone}</TableCell>
                        <TableCell>
                          {business.surveyDate
                            ? formatDate(business.surveyDate)
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `/aggregate/businesses/${business.id}`,
                                "_blank",
                              )
                            }
                          >
                            View
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No businesses found in this building
                </div>
              )}
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
