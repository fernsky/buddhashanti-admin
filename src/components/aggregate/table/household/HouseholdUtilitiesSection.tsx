import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HouseholdUtilitiesSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Utilities & Facilities</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-muted-foreground">House Ownership</div>
            <div>
              {household.house_ownership || "N/A"}
              {household.house_ownership_other
                ? ` (${household.house_ownership_other})`
                : ""}
            </div>

            <div className="text-muted-foreground">Water Source</div>
            <div className="truncate">
              {Array.isArray(household.water_source)
                ? household.water_source.join(", ")
                : household.water_source || "N/A"}
            </div>

            <div className="text-muted-foreground">Water Purification</div>
            <div className="truncate">
              {Array.isArray(household.water_purification_methods)
                ? household.water_purification_methods.join(", ")
                : household.water_purification_methods || "N/A"}
            </div>

            <div className="text-muted-foreground">Toilet Type</div>
            <div>{household.toilet_type || "N/A"}</div>

            <div className="text-muted-foreground">Waste Management</div>
            <div>
              {household.solid_waste_management || "N/A"}
              {household.solid_waste_management_other
                ? ` (${household.solid_waste_management_other})`
                : ""}
            </div>

            <div className="text-muted-foreground">Cooking Fuel</div>
            <div>{household.primary_cooking_fuel || "N/A"}</div>

            <div className="text-muted-foreground">Energy Source</div>
            <div>
              {household.primary_energy_source || "N/A"}
              {household.primary_energy_source_other
                ? ` (${household.primary_energy_source_other})`
                : ""}
            </div>
          </div>

          <div className="pt-1.5 mt-1.5 border-t">
            <div className="text-muted-foreground mb-1">
              Available Facilities
            </div>
            <div className="text-xs">
              {Array.isArray(household.facilities)
                ? household.facilities.join(", ")
                : household.facilities || "N/A"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
