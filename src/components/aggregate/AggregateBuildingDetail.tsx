import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building,
  ChevronLeft,
  Home,
  Store,
  MapPin,
  User,
  Calendar,
  Phone,
  FileText,
  CheckCircle2,
  Download,
  Map as MapIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { BuddhashantiAggregateBuilding } from "@/server/db/schema/aggregate-building";
import { format } from "date-fns";

interface AggregateBuildingDetailProps {
  building: BuddhashantiAggregateBuilding;
}

export function AggregateBuildingDetail({
  building,
}: AggregateBuildingDetailProps) {
  const [activeImageUrl, setActiveImageUrl] = useState<string | undefined>(
    building.buildingImage,
  );

  const households = building.households || [];
  const businesses = building.businesses || [];

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/aggregate"
            className="text-sm text-muted-foreground hover:text-primary flex items-center mb-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Aggregate Data
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {building.locality || "Building Details"}
          </h1>
          <p className="text-muted-foreground">
            Building ID: {building.building_id || "N/A"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`https://maps.google.com/?q=${building.building_gps_latitude},${building.building_gps_longitude}`}
              target="_blank"
            >
              <MapIcon className="mr-2 h-4 w-4" />
              View on Google Maps
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {/* Building Image */}
          {building.buildingImage && (
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-md">
                  <img
                    src={activeImageUrl || building.buildingImage}
                    alt="Building"
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="households">
                Households ({households.length})
              </TabsTrigger>
              <TabsTrigger value="businesses">
                Businesses ({businesses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Building Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Owner
                        </h4>
                        <p className="text-base">
                          {building.building_owner_name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Phone
                        </h4>
                        <p className="text-base">
                          {building.building_owner_phone || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Location
                        </h4>
                        <p className="text-base">
                          Ward {building.ward_number}, Area {building.area_code}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Building Base
                        </h4>
                        <p className="text-base">
                          {building.building_base?.replace(/_/g, " ") || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Ownership Status
                        </h4>
                        <p className="text-base">
                          {building.building_ownership_status?.replace(
                            /_/g,
                            " ",
                          ) || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Map Status
                        </h4>
                        <Badge
                          variant={
                            building.map_status === "validated"
                              ? "success"
                              : building.map_status === "needs_review"
                                ? "warning"
                                : "default"
                          }
                        >
                          {building.map_status?.replace(/_/g, " ") ||
                            "unverified"}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Survey Date
                        </h4>
                        <p className="text-base">
                          {formatDate(
                            building.building_survey_date?.toString(),
                          )}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Road Status
                        </h4>
                        <p className="text-base">
                          {building.road_status?.replace(/_/g, " ") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Building Structure</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Base
                        </h4>
                        <p>
                          {building.building_base?.replace(/_/g, " ") || "N/A"}
                        </p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Outer Wall
                        </h4>
                        <p>
                          {building.building_outer_wall?.replace(/_/g, " ") ||
                            "N/A"}
                        </p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Roof
                        </h4>
                        <p>
                          {building.building_roof?.replace(/_/g, " ") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {building.natural_disasters &&
                    building.natural_disasters.length > 0 && (
                      <>
                        <Separator className="my-6" />
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Natural Disaster Risk
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {building.natural_disasters.map(
                              (disaster, index) => (
                                <Badge key={index} variant="outline">
                                  {disaster}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </>
                    )}

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accessibility</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Time to Market
                        </h4>
                        <p>{building.time_to_market || "N/A"}</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Time to Active Road
                        </h4>
                        <p>{building.time_to_active_road || "N/A"}</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Time to Public Bus
                        </h4>
                        <p>{building.time_to_public_bus || "N/A"}</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Time to Health Organization
                        </h4>
                        <p>{building.time_to_health_organization || "N/A"}</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Time to Financial Organization
                        </h4>
                        <p>
                          {building.time_to_financial_organization || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="households" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Households
                  </CardTitle>
                  <CardDescription>
                    {households.length > 0
                      ? `${households.length} households residing in this building`
                      : "No households recorded for this building"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {households.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Head Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Members</TableHead>
                            <TableHead>Ward</TableHead>
                            <TableHead>Survey Date</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {households.map((household) => (
                            <TableRow key={household.id}>
                              <TableCell className="font-medium">
                                {household.head_name}
                              </TableCell>
                              <TableCell>{household.head_phone}</TableCell>
                              <TableCell>{household.total_members}</TableCell>
                              <TableCell>{household.ward_number}</TableCell>
                              <TableCell>
                                {formatDate(household.household_survey_date)}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" asChild>
                                  <Link
                                    href={`/aggregate/households/${household.id}`}
                                  >
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Home className="mx-auto h-12 w-12 text-muted-foreground/30" />
                      <h3 className="mt-2 text-lg font-medium">
                        No Households
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        There are no households recorded for this building.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="businesses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Businesses
                  </CardTitle>
                  <CardDescription>
                    {businesses.length > 0
                      ? `${businesses.length} businesses operating in this building`
                      : "No businesses recorded for this building"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {businesses.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Operator</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Survey Date</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {businesses.map((business) => (
                            <TableRow key={business.id}>
                              <TableCell className="font-medium">
                                {business.business_name}
                              </TableCell>
                              <TableCell>
                                {business.business_type ||
                                  business.business_nature}
                              </TableCell>
                              <TableCell>{business.operator_name}</TableCell>
                              <TableCell>{business.operator_phone}</TableCell>
                              <TableCell>
                                {formatDate(business.business_survey_date)}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" asChild>
                                  <Link
                                    href={`/aggregate/businesses/${business.id}`}
                                  >
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Store className="mx-auto h-12 w-12 text-muted-foreground/30" />
                      <h3 className="mt-2 text-lg font-medium">
                        No Businesses
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        There are no businesses recorded for this building.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Building Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Building ID</span>
                  <span className="font-medium">{building.building_id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Households</span>
                  <Badge variant="outline">{households.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Businesses</span>
                  <Badge variant="outline">{businesses.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ward Number</span>
                  <span className="font-medium">{building.ward_number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Area Code</span>
                  <span className="font-medium">{building.area_code}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md overflow-hidden aspect-square mb-4">
                <div id="mini-map" className="h-full w-full bg-muted">
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${building.building_gps_latitude},${building.building_gps_longitude}&zoom=16&size=400x400&markers=color:red%7C${building.building_gps_latitude},${building.building_gps_longitude}&key=YOUR_API_KEY`}
                    alt="Map location"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 items-center text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span>
                    {building.building_gps_latitude?.toString().substring(0, 8)}
                    ,
                    {building.building_gps_longitude
                      ?.toString()
                      .substring(0, 8)}
                  </span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span>{building.building_gps_accuracy || "N/A"} m</span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Surveyed:</span>
                  <span>
                    {formatDate(building.building_survey_date?.toString())}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Enumerator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">
                    {building.enumerator_name || "Unknown"}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {building.enumerator_phone || "N/A"}
                  </div>
                </div>
              </div>

              {building.enumeratorSelfie && (
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    Enumerator Selfie
                  </h4>
                  <div className="h-[100px] rounded-md border overflow-hidden">
                    <img
                      src={building.enumeratorSelfie}
                      alt="Enumerator selfie"
                      className="h-full w-full object-cover"
                      onClick={() =>
                        setActiveImageUrl(building.enumeratorSelfie)
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {building.surveyAudioRecording && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Survey Recording</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Audio recording
                    </span>
                  </div>
                  <audio controls className="w-full">
                    <source
                      src={building.surveyAudioRecording}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
