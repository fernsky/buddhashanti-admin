import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HouseholdEconomicSection({ household }: { household: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Economic Information</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-muted-foreground">Female Properties</div>
            <div>{household.female_properties || "N/A"}</div>

            <div className="text-muted-foreground">Has Insurance</div>
            <div>
              {household.has_insurance ? (
                <Badge variant="default" className="text-xs">
                  Yes
                </Badge>
              ) : (
                "No"
              )}
            </div>

            <div className="text-muted-foreground">Has Remittance</div>
            <div>
              {household.has_remittance ? (
                <Badge variant="default" className="text-xs">
                  Yes
                </Badge>
              ) : (
                "No"
              )}
            </div>

            <div className="text-muted-foreground">Health Organization</div>
            <div>
              {household.health_organization || "N/A"}
              {household.health_organization_other
                ? ` (${household.health_organization_other})`
                : ""}
            </div>
          </div>

          <div className="pt-1.5 mt-1.5 border-t">
            <div className="text-muted-foreground mb-1">Income Sources</div>
            <div className="text-xs">
              {Array.isArray(household.income_sources)
                ? household.income_sources.join(", ")
                : household.income_sources || "N/A"}
            </div>
          </div>

          {household.has_remittance && (
            <div className="pt-1.5 mt-1.5 border-t">
              <div className="text-muted-foreground mb-1">
                Remittance Expenses
              </div>
              <div className="text-xs">
                {Array.isArray(household.remittance_expenses)
                  ? household.remittance_expenses.join(", ")
                  : household.remittance_expenses || "N/A"}
              </div>
            </div>
          )}

          <div className="pt-1.5 mt-1.5 border-t">
            <div className="text-muted-foreground mb-1">
              Financial Organizations
            </div>
            <div className="text-xs">
              {Array.isArray(household.financial_organizations)
                ? household.financial_organizations.join(", ")
                : household.financial_organizations || "N/A"}
            </div>
          </div>

          <div className="pt-1.5 mt-1.5 border-t">
            <div className="text-muted-foreground mb-1">Loan Usage</div>
            <div className="text-xs">
              {Array.isArray(household.loan_use)
                ? household.loan_use.join(", ")
                : household.loan_use || "N/A"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
