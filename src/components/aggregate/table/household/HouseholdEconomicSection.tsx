import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HouseholdEconomicSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">आर्थिक जानकारी</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>महिला सम्पत्ति</TableHead>
              <TableHead>बीमा</TableHead>
              <TableHead>रेमिट्यान्स</TableHead>
              <TableHead>स्वास्थ्य संस्था</TableHead>
              <TableHead>आय स्रोत</TableHead>
              <TableHead>वित्तीय संस्था</TableHead>
              <TableHead>ऋण उपयोग</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {household.female_properties || "N/A"}
              </TableCell>
              <TableCell>
                {household.has_insurance ? (
                  <Badge variant="default" className="text-xs">
                    छ
                  </Badge>
                ) : (
                  "छैन"
                )}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {household.has_remittance ? (
                    <div>
                      <Badge variant="default" className="text-xs">
                        छ
                      </Badge>
                    </div>
                  ) : (
                    <div>छैन</div>
                  )}
                  {household.has_remittance && household.remittance_expenses && (
                    <div className="text-xs text-muted-foreground">
                      {Array.isArray(household.remittance_expenses)
                        ? household.remittance_expenses.join(", ")
                        : household.remittance_expenses}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {household.health_organization || "N/A"}
                {household.health_organization_other && 
                  <span className="text-xs text-muted-foreground"> ({household.health_organization_other})</span>}
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.income_sources)
                  ? household.income_sources.join(", ")
                  : household.income_sources || "N/A"}
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.financial_organizations)
                  ? household.financial_organizations.join(", ")
                  : household.financial_organizations || "N/A"}
              </TableCell>
              <TableCell className="text-xs">
                {Array.isArray(household.loan_use)
                  ? household.loan_use.join(", ")
                  : household.loan_use || "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
