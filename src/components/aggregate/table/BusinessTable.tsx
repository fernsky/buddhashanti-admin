import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MediaGallery } from "./MediaGallery";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BusinessTable({ businesses }: { businesses: any[] }) {
  const [expandedBusinesses, setExpandedBusinesses] = useState<Set<string>>(
    new Set(),
  );

  const toggleBusiness = (id: string) => {
    const newExpanded = new Set(expandedBusinesses);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedBusinesses(newExpanded);
  };

  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10"></TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Nature</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Investment</TableHead>
              <TableHead>Survey Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business) => {
              const isExpanded = expandedBusinesses.has(business.id);

              // Collect business media
              const businessMedia: {
                url: any;
                type: "audio" | "video" | "image";
                label: string;
              }[] = [];

              if (business.businessImage || business.business_image_key) {
                businessMedia.push({
                  url: business.businessImage,
                  type: "image",
                  label: "Business Image",
                });
              }

              if (
                business.businessEnumeratorSelfie ||
                business.business_enumerator_selfie_key
              ) {
                businessMedia.push({
                  url: business.businessEnumeratorSelfie,
                  type: "image",
                  label: "Enumerator Selfie",
                });
              }

              if (
                business.businessAudioRecording ||
                business.business_audio_recording_key
              ) {
                businessMedia.push({
                  url: business.businessAudioRecording,
                  type: "audio",
                  label: "Audio Recording",
                });
              }

              return (
                <React.Fragment key={business.id}>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleBusiness(business.id)}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {business.business_name}
                    </TableCell>
                    <TableCell>{business.business_nature}</TableCell>
                    <TableCell>{business.operator_name}</TableCell>
                    <TableCell>{business.operator_phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          business.registration_status === "registered"
                            ? "default"
                            : "outline"
                        }
                      >
                        {business.registration_status || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {business.investment_amount
                        ? `Rs. ${business.investment_amount.toLocaleString()}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {business.business_survey_date
                        ? formatDate(business.business_survey_date)
                        : "N/A"}
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-muted/20 p-0">
                        <div className="p-4">
                          <Tabs defaultValue="details">
                            <TabsList className="mb-4">
                              <TabsTrigger value="details">Details</TabsTrigger>
                              <TabsTrigger value="employees">
                                Employees
                              </TabsTrigger>
                              <TabsTrigger value="agriculture">
                                Agriculture
                              </TabsTrigger>
                              <TabsTrigger value="media">Media</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3">
                                <div>
                                  <h5 className="font-medium mb-2 text-sm">
                                    Basic Information
                                  </h5>
                                  <dl className="space-y-1">
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Business Type
                                      </dt>
                                      <dd className="text-sm">
                                        {business.business_type || "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Locality
                                      </dt>
                                      <dd className="text-sm">
                                        {business.business_locality || "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Operator Gender
                                      </dt>
                                      <dd className="text-sm">
                                        {business.operator_gender || "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Operator Education
                                      </dt>
                                      <dd className="text-sm">
                                        {business.operator_education_level ||
                                          "N/A"}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>

                                <div>
                                  <h5 className="font-medium mb-2 text-sm">
                                    Legal Information
                                  </h5>
                                  <dl className="space-y-1">
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        PAN Status
                                      </dt>
                                      <dd className="text-sm">
                                        {business.pan_status || "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        PAN Number
                                      </dt>
                                      <dd className="text-sm">
                                        {business.pan_number || "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Statutory Status
                                      </dt>
                                      <dd className="text-sm">
                                        {business.statutory_status || "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Registered Bodies
                                      </dt>
                                      <dd className="text-sm">
                                        {Array.isArray(
                                          business.registered_bodies,
                                        )
                                          ? business.registered_bodies.join(
                                              ", ",
                                            )
                                          : business.registered_bodies || "N/A"}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>

                                <div>
                                  <h5 className="font-medium mb-2 text-sm">
                                    Location & Ownership
                                  </h5>
                                  <dl className="space-y-1">
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Location Ownership
                                      </dt>
                                      <dd className="text-sm">
                                        {business.business_location_ownership ||
                                          "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        GPS Coordinates
                                      </dt>
                                      <dd className="text-sm">
                                        {business.business_gps_latitude &&
                                        business.business_gps_longitude
                                          ? `${business.business_gps_latitude.toString().substring(0, 8)}, ${business.business_gps_longitude.toString().substring(0, 8)}`
                                          : "N/A"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Business Number
                                      </dt>
                                      <dd className="text-sm">
                                        {business.business_number || "N/A"}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="employees">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h5 className="font-medium mb-2">Partners</h5>
                                  <dl className="space-y-2">
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Has Partners
                                      </dt>
                                      <dd className="text-sm">
                                        {business.has_partners || "No"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Total Partners
                                      </dt>
                                      <dd className="text-sm">
                                        {business.total_partners || 0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Nepali Male Partners
                                      </dt>
                                      <dd className="text-sm">
                                        {business.nepali_male_partners || 0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Nepali Female Partners
                                      </dt>
                                      <dd className="text-sm">
                                        {business.nepali_female_partners || 0}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>

                                <div>
                                  <h5 className="font-medium mb-2">
                                    Family Involvement
                                  </h5>
                                  <dl className="space-y-2">
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Has Family Involved
                                      </dt>
                                      <dd className="text-sm">
                                        {business.has_involved_family || "No"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Total Family Members
                                      </dt>
                                      <dd className="text-sm">
                                        {business.total_involved_family || 0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Male Family Members
                                      </dt>
                                      <dd className="text-sm">
                                        {business.male_involved_family || 0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Female Family Members
                                      </dt>
                                      <dd className="text-sm">
                                        {business.female_involved_family || 0}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                  <h5 className="font-medium mb-2">
                                    Permanent Employees
                                  </h5>
                                  <dl className="space-y-2">
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Has Perm. Employees
                                      </dt>
                                      <dd className="text-sm">
                                        {business.has_permanent_employees ||
                                          "No"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Total Perm. Employees
                                      </dt>
                                      <dd className="text-sm">
                                        {business.total_permanent_employees ||
                                          0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Nepali Male
                                      </dt>
                                      <dd className="text-sm">
                                        {business.nepali_male_permanent_employees ||
                                          0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Nepali Female
                                      </dt>
                                      <dd className="text-sm">
                                        {business.nepali_female_permanent_employees ||
                                          0}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>

                                <div>
                                  <h5 className="font-medium mb-2">
                                    Temporary Employees
                                  </h5>
                                  <dl className="space-y-2">
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Has Temp. Employees
                                      </dt>
                                      <dd className="text-sm">
                                        {business.has_temporary_employees ||
                                          "No"}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Total Temp. Employees
                                      </dt>
                                      <dd className="text-sm">
                                        {business.total_temporary_employees ||
                                          0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Nepali Male
                                      </dt>
                                      <dd className="text-sm">
                                        {business.nepali_male_temporary_employees ||
                                          0}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                      <dt className="text-sm text-muted-foreground">
                                        Nepali Female
                                      </dt>
                                      <dd className="text-sm">
                                        {business.nepali_female_temporary_employees ||
                                          0}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="agriculture">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {business.agricultural_type && (
                                  <div>
                                    <h5 className="font-medium mb-2">
                                      Agricultural Type
                                    </h5>
                                    <p className="text-sm">
                                      {business.agricultural_type}
                                    </p>
                                  </div>
                                )}

                                <div>
                                  <h5 className="font-medium mb-2">Crops</h5>
                                  {business.crops?.length ? (
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Crop</TableHead>
                                          <TableHead>Type</TableHead>
                                          <TableHead>Area</TableHead>
                                          <TableHead>Production</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {business.crops.map((crop: any) => (
                                          <TableRow key={crop.id}>
                                            <TableCell>
                                              {crop.crop_name}
                                            </TableCell>
                                            <TableCell>
                                              {crop.crop_type}
                                            </TableCell>
                                            <TableCell>
                                              {crop.crop_area}
                                            </TableCell>
                                            <TableCell>
                                              {crop.crop_production}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  ) : (
                                    <div className="text-muted-foreground text-sm py-2">
                                      No crop data available
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                  <h5 className="font-medium mb-2">Animals</h5>
                                  {business.animals?.length ? (
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Animal</TableHead>
                                          <TableHead>Count</TableHead>
                                          <TableHead>Sales</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {business.animals.map((animal: any) => (
                                          <TableRow key={animal.id}>
                                            <TableCell>
                                              {animal.animal_name}
                                            </TableCell>
                                            <TableCell>
                                              {animal.total_count}
                                            </TableCell>
                                            <TableCell>
                                              {animal.sales_count || "N/A"}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  ) : (
                                    <div className="text-muted-foreground text-sm py-2">
                                      No animal data available
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <h5 className="font-medium mb-2">
                                    Animal Products
                                  </h5>
                                  {business.animal_products?.length ? (
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Product</TableHead>
                                          <TableHead>Production</TableHead>
                                          <TableHead>Unit</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {business.animal_products.map(
                                          (product: any) => (
                                            <TableRow key={product.id}>
                                              <TableCell>
                                                {product.product_name}
                                              </TableCell>
                                              <TableCell>
                                                {product.production_amount}
                                              </TableCell>
                                              <TableCell>
                                                {product.unit}
                                              </TableCell>
                                            </TableRow>
                                          ),
                                        )}
                                      </TableBody>
                                    </Table>
                                  ) : (
                                    <div className="text-muted-foreground text-sm py-2">
                                      No product data available
                                    </div>
                                  )}
                                </div>
                              </div>

                              {business.aquaculture && (
                                <div className="mt-4">
                                  <h5 className="font-medium mb-2">
                                    Aquaculture
                                  </h5>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                      <span className="text-sm text-muted-foreground block">
                                        Pond Count
                                      </span>
                                      <span>
                                        {business.aquaculture.pond_count ||
                                          "N/A"}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-sm text-muted-foreground block">
                                        Pond Area
                                      </span>
                                      <span>
                                        {business.aquaculture.pond_area ||
                                          "N/A"}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-sm text-muted-foreground block">
                                        Fish Production
                                      </span>
                                      <span>
                                        {business.aquaculture.fish_production ||
                                          "N/A"}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-sm text-muted-foreground block">
                                        Annual Income
                                      </span>
                                      <span>
                                        {business.aquaculture.annual_income ||
                                          "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {business.apiculture && (
                                <div className="mt-4">
                                  <h5 className="font-medium mb-2">
                                    Apiculture
                                  </h5>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <span className="text-sm text-muted-foreground block">
                                        Hive Count
                                      </span>
                                      <span>
                                        {business.apiculture.hive_count ||
                                          "N/A"}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-sm text-muted-foreground block">
                                        Honey Production
                                      </span>
                                      <span>
                                        {business.apiculture.honey_production ||
                                          "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="media">
                              <MediaGallery media={businessMedia} />
                            </TabsContent>
                          </Tabs>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
