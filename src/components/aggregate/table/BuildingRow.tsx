import React from "react";
import { HouseholdTable } from "./HouseholdTable";
import { BusinessTable } from "./BusinessTable";
import { MediaGallery } from "./MediaGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function BuildingRow({ building }: { building: any }) {
  const [expanded, setExpanded] = React.useState(true);

  // Collect all media related to this building
  const buildingMedia: {
    url: any;
    type: "audio" | "video" | "image";
    label: string;
  }[] = [];

  if (building.buildingImage) {
    buildingMedia.push({
      url: building.buildingImage,
      type: "image",
      label: "Building Image",
    });
  }

  if (building.buildingEnumeratorSelfie) {
    buildingMedia.push({
      url: building.buildingEnumeratorSelfie,
      type: "image",
      label: "Enumerator Selfie",
    });
  }

  if (building.buildingAudioRecording) {
    buildingMedia.push({
      url: building.buildingAudioRecording,
      type: "audio",
      label: "Audio Recording",
    });
  }

  return (
    <div className="py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">
              Building {building.building_id}
            </h3>
            <Badge
              variant={
                building.map_status === "validated"
                  ? "default"
                  : building.map_status === "needs_review"
                    ? "destructive"
                    : "default"
              }
            >
              {building.map_status
                ? building.map_status.replace(/_/g, " ")
                : "unverified"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Owner: {building.building_owner_name || "Unknown"}
              {building.building_owner_phone &&
                ` (${building.building_owner_phone})`}
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ward {building.ward_number}, Area {building.area_code} -{" "}
              {building.locality}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {building.building_survey_date
                ? formatDate(building.building_survey_date)
                : "No survey date"}
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {expanded && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">
                Building Details
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-sm text-muted-foreground">
                  GPS Coordinates
                </div>
                <div className="text-sm">
                  {building.building_gps_latitude?.toString().substring(0, 8)},
                  {building.building_gps_longitude?.toString().substring(0, 8)}
                </div>

                <div className="text-sm text-muted-foreground">
                  GPS Accuracy
                </div>
                <div className="text-sm">
                  {building.building_gps_accuracy} m
                </div>

                <div className="text-sm text-muted-foreground">
                  Building Base
                </div>
                <div className="text-sm">
                  {building.building_base?.replace(/_/g, " ")}
                </div>

                <div className="text-sm text-muted-foreground">
                  Building Wall
                </div>
                <div className="text-sm">
                  {building.building_outer_wall?.replace(/_/g, " ")}
                </div>

                <div className="text-sm text-muted-foreground">
                  Building Roof
                </div>
                <div className="text-sm">
                  {building.building_roof?.replace(/_/g, " ")}
                </div>

                <div className="text-sm text-muted-foreground">
                  Building Floor
                </div>
                <div className="text-sm">
                  {building.building_floor?.replace(/_/g, " ")}
                </div>

                <div className="text-sm text-muted-foreground">Road Status</div>
                <div className="text-sm">
                  {building.road_status?.replace(/_/g, " ")}
                </div>

                <div className="text-sm text-muted-foreground">
                  Time to Market
                </div>
                <div className="text-sm">
                  {building.time_to_market || "N/A"}
                </div>

                <div className="text-sm text-muted-foreground">
                  Time to Active Road
                </div>
                <div className="text-sm">
                  {building.time_to_active_road || "N/A"}
                </div>

                <div className="text-sm text-muted-foreground">
                  Time to Health Org
                </div>
                <div className="text-sm">
                  {building.time_to_health_organization || "N/A"}
                </div>

                <div className="text-sm text-muted-foreground">
                  Ownership Status
                </div>
                <div className="text-sm">
                  {building.building_ownership_status?.replace(/_/g, " ") ||
                    "N/A"}
                </div>

                <div className="text-sm text-muted-foreground">Enumerator</div>
                <div className="text-sm">
                  {building.enumerator_name || "Unknown"}
                </div>

                <div className="text-sm text-muted-foreground">Households</div>
                <div className="text-sm font-medium">
                  {building.total_families || 0}
                </div>

                <div className="text-sm text-muted-foreground">Businesses</div>
                <div className="text-sm font-medium">
                  {building.total_businesses || 0}
                </div>
              </div>
            </div>

            <MediaGallery media={buildingMedia} />
          </div>

          {/* Households */}
          {building.households?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-lg mb-4 border-b pb-2">
                Households ({building.households.length})
              </h4>
              <HouseholdTable households={building.households} />
            </div>
          )}

          {/* Businesses */}
          {building.businesses?.length > 0 && (
            <div className="mt-8">
              <h4 className="font-medium text-lg mb-4 border-b pb-2">
                Businesses ({building.businesses.length})
              </h4>
              <BusinessTable businesses={building.businesses} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
