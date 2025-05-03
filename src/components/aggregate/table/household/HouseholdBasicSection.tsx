import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export function HouseholdBasicSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="text-muted-foreground">ID</div>
          <div className="font-mono text-xs overflow-hidden overflow-ellipsis">{household.id}</div>
          
          <div className="text-muted-foreground">Token</div>
          <div>{household.household_token}</div>
          
          <div className="text-muted-foreground">Ward Number</div>
          <div>{household.ward_number}</div>
          
          <div className="text-muted-foreground">Area Code</div>
          <div>{household.area_code}</div>
          
          <div className="text-muted-foreground">Locality</div>
          <div>{household.household_locality}</div>
          
          <div className="text-muted-foreground">Development Org</div>
          <div>{household.household_development_organization || "N/A"}</div>
          
          <div className="text-muted-foreground">GPS Coordinates</div>
          <div>
            {household.household_gps_latitude ? 
              `${household.household_gps_latitude}, ${household.household_gps_longitude}` : 
              "N/A"}
          </div>
          
          <div className="text-muted-foreground">GPS Accuracy</div>
          <div>{household.household_gps_accuracy || "N/A"} m</div>
          
          <div className="text-muted-foreground">Head Name</div>
          <div className="font-medium">{household.head_name}</div>
          
          <div className="text-muted-foreground">Head Phone</div>
          <div>{household.head_phone}</div>
          
          <div className="text-muted-foreground">Total Members</div>
          <div>{household.total_members}</div>
          
          <div className="text-muted-foreground">Is Sanitized</div>
          <div>{household.is_sanitized ? "Yes" : "No"}</div>
          
          <div className="text-muted-foreground">Feels Safe</div>
          <div>{household.feels_safe ? "Yes" : "No"}</div>
          
          <div className="text-muted-foreground">Submission Date</div>
          <div>
            {household.household_submission_date ? formatDate(household.household_submission_date) : "N/A"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
