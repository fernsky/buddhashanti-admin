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

export function HouseholdUtilitiesSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">उपयोगिता र सुविधाहरू</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>घर स्वामित्व</TableHead>
              <TableHead>पानी स्रोत</TableHead>
              <TableHead>पानी शुद्धिकरण</TableHead>
              <TableHead>शौचालय प्रकार</TableHead>
              <TableHead>फोहोर व्यवस्थापन</TableHead>
              <TableHead>खाना ऊर्जा</TableHead>
              <TableHead>बिजुली स्रोत</TableHead>
              <TableHead>उपलब्ध सुविधा</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {household.house_ownership || "N/A"}
                {household.house_ownership_other && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    ({household.house_ownership_other})
                  </span>
                )}
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.water_source)
                  ? household.water_source.join(", ")
                  : household.water_source || "N/A"}
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.water_purification_methods)
                  ? household.water_purification_methods.join(", ")
                  : household.water_purification_methods || "N/A"}
              </TableCell>
              <TableCell>{household.toilet_type || "N/A"}</TableCell>
              <TableCell>
                {household.solid_waste_management || "N/A"}
                {household.solid_waste_management_other && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    ({household.solid_waste_management_other})
                  </span>
                )}
              </TableCell>
              <TableCell>{household.primary_cooking_fuel || "N/A"}</TableCell>
              <TableCell>
                {household.primary_energy_source || "N/A"}
                {household.primary_energy_source_other && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    ({household.primary_energy_source_other})
                  </span>
                )}
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.facilities)
                  ? household.facilities.join(", ")
                  : household.facilities || "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
