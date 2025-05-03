import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { localizeNumber } from "@/lib/utils/localize-number";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HouseholdBasicSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">आधारभूत जानकारी</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>पहिचान</TableHead>
              <TableHead>टोकन</TableHead>
              <TableHead>वडा नं.</TableHead>
              <TableHead>क्षेत्र कोड</TableHead>
              <TableHead>स्थान</TableHead>
              <TableHead>प्रमुखको नाम</TableHead>
              <TableHead>फोन</TableHead>
              <TableHead>कुल सदस्य</TableHead>
              <TableHead>जिपिएस</TableHead>
              <TableHead>पेश मिति</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs">
                {household.id}
              </TableCell>
              <TableCell>{household.household_token}</TableCell>
              <TableCell>
                {localizeNumber(household.ward_number, "ne")}
              </TableCell>
              <TableCell>{household.area_code}</TableCell>
              <TableCell>{household.household_locality}</TableCell>
              <TableCell className="font-medium">
                {household.head_name}
              </TableCell>
              <TableCell>
                {localizeNumber(household.head_phone, "ne")}
              </TableCell>
              <TableCell>
                {localizeNumber(household.total_members, "ne")}
              </TableCell>
              <TableCell className="text-xs">
                {household.household_gps_latitude
                  ? `${localizeNumber(household.household_gps_latitude, "ne")}, ${localizeNumber(household.household_gps_longitude, "ne")}`
                  : "N/A"}
                {household.household_gps_accuracy &&
                  ` (${localizeNumber(household.household_gps_accuracy, "ne")} मि.)`}
              </TableCell>
              <TableCell className="text-xs">
                {household.household_submission_date
                  ? formatDate(household.household_submission_date)
                  : "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
