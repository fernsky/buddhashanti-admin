import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HouseholdAgricultureSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Agriculture Summary</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-muted-foreground">Has Agricultural Land</div>
            <div>
              {household.has_agricultural_land ? (
                <Badge variant="default" className="text-xs">
                  Yes
                </Badge>
              ) : (
                "No"
              )}
            </div>

            <div className="text-muted-foreground">Is Farmer</div>
            <div>
              {household.is_farmer ? (
                <Badge variant="default" className="text-xs">
                  Yes
                </Badge>
              ) : (
                "No"
              )}
            </div>

            <div className="text-muted-foreground">Male Farmers</div>
            <div>{household.total_male_farmers || 0}</div>

            <div className="text-muted-foreground">Female Farmers</div>
            <div>{household.total_female_farmers || 0}</div>

            <div className="text-muted-foreground">Months Sustained</div>
            <div>{household.months_sustained_from_agriculture || "N/A"}</div>

            <div className="text-muted-foreground">Months Involved</div>
            <div>{household.months_involved_in_agriculture || "N/A"}</div>

            <div className="text-muted-foreground">Has Animal Husbandry</div>
            <div>
              {household.has_animal_husbandry ? (
                <Badge variant="default" className="text-xs">
                  Yes
                </Badge>
              ) : (
                "No"
              )}
            </div>

            <div className="text-muted-foreground">Has Aquaculture</div>
            <div>
              {household.has_aquaculture ? (
                <Badge variant="default" className="text-xs">
                  Yes
                </Badge>
              ) : (
                "No"
              )}
            </div>

            <div className="text-muted-foreground">Has Apiculture</div>
            <div>
              {household.has_apiculture ? (
                <Badge variant="default" className="text-xs">
                  Yes
                </Badge>
              ) : (
                "No"
              )}
            </div>
          </div>

          {household.has_agricultural_land && (
            <div className="pt-1.5 mt-1.5 border-t">
              <div className="text-muted-foreground mb-1">
                Land Ownership Types
              </div>
              <div className="text-xs">
                {Array.isArray(household.agricultural_land_ownership_types)
                  ? household.agricultural_land_ownership_types.join(", ")
                  : household.agricultural_land_ownership_types || "N/A"}
              </div>
            </div>
          )}

          {household.has_animal_husbandry && (
            <div className="pt-1.5 mt-1.5 border-t">
              <div className="text-muted-foreground mb-1">Animal Types</div>
              <div className="text-xs">
                {Array.isArray(household.animal_types)
                  ? household.animal_types.join(", ")
                  : household.animal_types || "N/A"}
              </div>
            </div>
          )}

          <div className="pt-1.5 mt-1.5 border-t">
            <div className="text-muted-foreground mb-1">
              Agricultural Machinery
            </div>
            <div className="text-xs">
              {Array.isArray(household.agricultural_machinery)
                ? household.agricultural_machinery.join(", ")
                : household.agricultural_machinery || "N/A"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
