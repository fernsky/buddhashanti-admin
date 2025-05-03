import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { localizeNumber } from "@/lib/utils/localize-number";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HouseholdAgricultureSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">कृषि सारांश</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>कृषि भूमि</TableHead>
              <TableHead>किसान</TableHead>
              <TableHead>किसान संख्या</TableHead>
              <TableHead>महिना असर</TableHead>
              <TableHead>पशुपालन</TableHead>
              <TableHead>जलकृषि</TableHead>
              <TableHead>मौरीपालन</TableHead>
              <TableHead>कृषि उपकरण</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="space-y-1">
                  {household.has_agricultural_land ? (
                    <div>
                      <Badge variant="default" className="text-xs">
                        छ
                      </Badge>
                    </div>
                  ) : (
                    <div>छैन</div>
                  )}
                  {household.has_agricultural_land && household.agricultural_land_ownership_types && (
                    <div className="text-xs text-muted-foreground">
                      {Array.isArray(household.agricultural_land_ownership_types)
                        ? household.agricultural_land_ownership_types.join(", ")
                        : household.agricultural_land_ownership_types}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {household.is_farmer ? (
                  <Badge variant="default" className="text-xs">
                    छ
                  </Badge>
                ) : (
                  "छैन"
                )}
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-xs">
                  <div>
                    पुरुष: {localizeNumber(household.total_male_farmers || 0, "ne")}
                  </div>
                  <div>
                    महिला: {localizeNumber(household.total_female_farmers || 0, "ne")}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-xs">
                  <div>
                    धान्य: {localizeNumber(household.months_sustained_from_agriculture || 0, "ne")} महिना
                  </div>
                  <div>
                    संलग्न: {localizeNumber(household.months_involved_in_agriculture || 0, "ne")} महिना
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {household.has_animal_husbandry ? (
                    <div>
                      <Badge variant="default" className="text-xs">
                        छ
                      </Badge>
                    </div>
                  ) : (
                    <div>छैन</div>
                  )}
                  {household.has_animal_husbandry && household.animal_types && (
                    <div className="text-xs text-muted-foreground">
                      {Array.isArray(household.animal_types)
                        ? household.animal_types.join(", ")
                        : household.animal_types}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {household.has_aquaculture ? (
                  <Badge variant="default" className="text-xs">
                    छ
                  </Badge>
                ) : (
                  "छैन"
                )}
              </TableCell>
              <TableCell>
                {household.has_apiculture ? (
                  <Badge variant="default" className="text-xs">
                    छ
                  </Badge>
                ) : (
                  "छैन"
                )}
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.agricultural_machinery)
                  ? household.agricultural_machinery.join(", ")
                  : household.agricultural_machinery || "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
