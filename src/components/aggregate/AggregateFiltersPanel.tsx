import React from "react";
import { useAggregateStore } from "@/hooks/use-aggregate-store";
import { api } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, X, Filter, Calendar, MapPin } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function AggregateFiltersPanel() {
  const { filters, setFilter, resetFilters, view } = useAggregateStore();

  // Fetch data directly from the aggregate buildings
  const { data: wards } = api.aggregate.getDistinctWardNumbers.useQuery();
  const { data: enumerators } = api.aggregate.getDistinctEnumerators.useQuery();
  const { data: mapStatuses } = api.aggregate.getDistinctMapStatuses.useQuery();
  const { data: buildingOwnerships } =
    api.aggregate.getDistinctBuildingOwnerships.useQuery();
  const { data: buildingBases } =
    api.aggregate.getDistinctBuildingBases.useQuery();
  const { data: areaCodes } = api.aggregate.getDistinctAreaCodes.useQuery();

  const { data: buildingStats } = api.aggregate.getBuildingStats.useQuery(
    undefined,
    {
      enabled: view.viewMode !== "map",
    },
  );

  // Handle date range selection
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setFilter("fromDate", format(range.from, "yyyy-MM-dd"));
    } else {
      setFilter("fromDate", undefined);
    }

    if (range?.to) {
      setFilter("toDate", format(range.to, "yyyy-MM-dd"));
    } else {
      setFilter("toDate", undefined);
    }
  };

  // Get existing date range from filters
  const dateRange: DateRange | undefined = React.useMemo(() => {
    if (!filters.fromDate && !filters.toDate) return undefined;

    return {
      from: filters.fromDate ? new Date(filters.fromDate) : undefined,
      to: filters.toDate ? new Date(filters.toDate) : undefined,
    };
  }, [filters.fromDate, filters.toDate]);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <Accordion type="single" collapsible defaultValue="filters">
          <AccordionItem value="filters" className="border-none">
            <AccordionTrigger className="py-2 font-semibold">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {Object.keys(filters).length > 0 && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {Object.keys(filters).length}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-4 py-3">
                {/* Search term filter */}
                <div className="relative">
                  <Input
                    placeholder="Search by locality, owner name, enumerator..."
                    value={filters.searchTerm || ""}
                    onChange={(e) =>
                      setFilter("searchTerm", e.target.value || undefined)
                    }
                    className="pl-9"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  {filters.searchTerm && (
                    <button
                      onClick={() => setFilter("searchTerm", undefined)}
                      className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
                  {/* Ward Filter */}
                  <div className="relative">
                    <Label htmlFor="ward-filter" className="mb-1.5 block">
                      Ward
                    </Label>
                    <Select
                      value={filters.wardId ?? "all"}
                      onValueChange={(value) =>
                        setFilter("wardId", value === "all" ? undefined : value)
                      }
                    >
                      <SelectTrigger id="ward-filter" className="pl-9">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <SelectValue placeholder="All Wards" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* <SelectItem value="all">All Wards</SelectItem> */}
                          {/* {wards?.map((ward) => (
                            <SelectItem key={ward.id} value={ward.id}>
                              Ward {ward.wardNumber}
                            </SelectItem>
                          ))} */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area Code Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="area-code-filter">Area Code</Label>
                    <Select
                      value={filters.areaCode ?? "all"}
                      onValueChange={(value) =>
                        setFilter(
                          "areaCode",
                          value === "all" ? undefined : value,
                        )
                      }
                    >
                      <SelectTrigger id="area-code-filter">
                        <SelectValue placeholder="All Area Codes" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="all">All Area Codes</SelectItem> */}
                        {/* {areaCodes?.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.areaCode}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Enumerator Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="enumerator-filter">Enumerator</Label>
                    <Select
                      value={filters.enumeratorId ?? "all"}
                      onValueChange={(value) =>
                        setFilter(
                          "enumeratorId",
                          value === "all" ? undefined : value,
                        )
                      }
                    >
                      <SelectTrigger id="enumerator-filter">
                        <SelectValue placeholder="All Enumerators" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="all">All Enumerators</SelectItem> */}
                        {/* {enumerators?.map((enumerator) => (
                          <SelectItem key={enumerator.id} value={enumerator.id}>
                            {enumerator.name}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Map Status Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="map-status-filter">Map Status</Label>
                    <Select
                      value={filters.mapStatus ?? "all"}
                      onValueChange={(value) =>
                        setFilter(
                          "mapStatus",
                          value === "all" ? undefined : value,
                        )
                      }
                    >
                      <SelectTrigger id="map-status-filter">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="all">All Statuses</SelectItem> */}
                        {/* {mapStatuses?.map((status) => (
                          <SelectItem key={status.id} value={status.id}>
                            {status.name.charAt(0).toUpperCase() +
                              status.name.slice(1).replace(/_/g, " ")}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Building Ownership Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="building-ownership-filter">
                      Building Ownership
                    </Label>
                    <Select
                      value={filters.buildingOwnership ?? "all"}
                      onValueChange={(value) =>
                        setFilter(
                          "buildingOwnership",
                          value === "all" ? undefined : value,
                        )
                      }
                    >
                      <SelectTrigger id="building-ownership-filter">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="all">All Types</SelectItem> */}
                        {/* {buildingOwnerships?.map((ownership) => (
                          <SelectItem key={ownership.id} value={ownership.id}>
                            {ownership.name.charAt(0).toUpperCase() +
                              ownership.name.slice(1)}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Building Base Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="building-base-filter">Building Base</Label>
                    <Select
                      value={filters.buildingBase ?? "all"}
                      onValueChange={(value) =>
                        setFilter(
                          "buildingBase",
                          value === "all" ? undefined : value,
                        )
                      }
                    >
                      <SelectTrigger id="building-base-filter">
                        <SelectValue placeholder="All Bases" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="all">All Bases</SelectItem> */}
                        {buildingBases?.map((base) => (
                          <SelectItem key={base.id} value={base.id}>
                            {base.name.charAt(0).toUpperCase() +
                              base.name.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range Filter */}
                  <div className="space-y-1.5 col-span-full md:col-span-2 lg:col-span-3">
                    <Label
                      htmlFor="date-range-filter"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Survey Date Range
                    </Label>
                    <DatePickerWithRange
                      date={dateRange}
                      onDateChange={handleDateRangeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2">
                  {/* Has Households Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has-households-filter"
                      checked={filters.hasHouseholds === true}
                      onCheckedChange={(checked) =>
                        setFilter(
                          "hasHouseholds",
                          checked === "indeterminate"
                            ? undefined
                            : checked || undefined,
                        )
                      }
                    />
                    <Label
                      htmlFor="has-households-filter"
                      className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        filters.hasHouseholds === true &&
                          "font-semibold text-primary",
                      )}
                    >
                      Has households ({buildingStats?.totalHouseholds || "..."})
                    </Label>
                  </div>

                  {/* Has Businesses Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has-businesses-filter"
                      checked={filters.hasBusinesses === true}
                      onCheckedChange={(checked) =>
                        setFilter(
                          "hasBusinesses",
                          checked === "indeterminate"
                            ? undefined
                            : checked || undefined,
                        )
                      }
                    />
                    <Label
                      htmlFor="has-businesses-filter"
                      className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        filters.hasBusinesses === true &&
                          "font-semibold text-primary",
                      )}
                    >
                      Has businesses ({buildingStats?.totalBusinesses || "..."})
                    </Label>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-end space-x-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    disabled={Object.keys(filters).length === 0}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
