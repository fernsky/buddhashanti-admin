import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HouseholdDemographicSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Demographics & Origin</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="text-muted-foreground">Caste</div>
          <div>
            {household.caste || "N/A"}
            {household.caste_other ? ` (${household.caste_other})` : ""}
          </div>
          
          <div className="text-muted-foreground">Religion</div>
          <div>
            {household.religion || "N/A"}
            {household.religion_other ? ` (${household.religion_other})` : ""}
          </div>
          
          <div className="text-muted-foreground">Mother Tongue</div>
          <div>
            {household.primary_mother_tongue || "N/A"}
            {household.primary_mother_tongue_other ? ` (${household.primary_mother_tongue_other})` : ""}
          </div>
          
          <div className="text-muted-foreground">Ancestral Language</div>
          <div>
            {household.ancestral_language || "N/A"}
            {household.ancestral_language_other ? ` (${household.ancestral_language_other})` : ""}
          </div>
          
          <div className="col-span-2 font-medium mt-1.5 pt-1.5 border-t">Birth & Prior Location</div>
          
          <div className="text-muted-foreground">Birth Place</div>
          <div>{household.birth_place || "N/A"}</div>
          
          <div className="text-muted-foreground">Birth Province/District</div>
          <div>
            {household.birth_province ? `${household.birth_province}, ${household.birth_district || ""}` : "N/A"}
            {household.birth_country && household.birth_country !== "Nepal" ? ` (${household.birth_country})` : ""}
          </div>
          
          <div className="text-muted-foreground">Prior Location</div>
          <div>{household.prior_location || "N/A"}</div>
          
          <div className="text-muted-foreground">Prior Province/District</div>
          <div>
            {household.prior_province ? `${household.prior_province}, ${household.prior_district || ""}` : "N/A"}
            {household.prior_country && household.prior_country !== "Nepal" ? ` (${household.prior_country})` : ""}
          </div>
          
          <div className="text-muted-foreground">Residence Reasons</div>
          <div className="truncate">
            {Array.isArray(household.residence_reasons) 
              ? household.residence_reasons.join(", ") 
              : (household.residence_reasons || "N/A")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
