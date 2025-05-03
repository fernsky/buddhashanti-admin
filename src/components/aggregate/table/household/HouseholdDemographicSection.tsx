import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HouseholdDemographicSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">जनसांख्यिकी र उत्पत्ति</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>जात</TableHead>
              <TableHead>धर्म</TableHead>
              <TableHead>मातृभाषा</TableHead>
              <TableHead>पुर्खेउली भाषा</TableHead>
              <TableHead>जन्मस्थान</TableHead>
              <TableHead>पहिलेको स्थान</TableHead>
              <TableHead>बसाई कारण</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {household.caste || "N/A"}
                {household.caste_other && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    ({household.caste_other})
                  </span>
                )}
              </TableCell>
              <TableCell>
                {household.religion || "N/A"}
                {household.religion_other && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    ({household.religion_other})
                  </span>
                )}
              </TableCell>
              <TableCell>
                {household.primary_mother_tongue || "N/A"}
                {household.primary_mother_tongue_other && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    ({household.primary_mother_tongue_other})
                  </span>
                )}
              </TableCell>
              <TableCell>
                {household.ancestral_language || "N/A"}
                {household.ancestral_language_other && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    ({household.ancestral_language_other})
                  </span>
                )}
              </TableCell>
              <TableCell className="text-xs">
                <div className="space-y-1">
                  <div>{household.birth_place || "N/A"}</div>
                  {household.birth_province && (
                    <div className="text-muted-foreground">
                      {household.birth_province},{" "}
                      {household.birth_district || ""}
                      {household.birth_country &&
                      household.birth_country !== "Nepal"
                        ? ` (${household.birth_country})`
                        : ""}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-xs">
                <div className="space-y-1">
                  <div>{household.prior_location || "N/A"}</div>
                  {household.prior_province && (
                    <div className="text-muted-foreground">
                      {household.prior_province},{" "}
                      {household.prior_district || ""}
                      {household.prior_country &&
                      household.prior_country !== "Nepal"
                        ? ` (${household.prior_country})`
                        : ""}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.residence_reasons)
                  ? household.residence_reasons.join(", ")
                  : household.residence_reasons || "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
