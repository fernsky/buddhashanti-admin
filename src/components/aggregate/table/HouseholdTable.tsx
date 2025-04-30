import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { HouseholdDetails } from "./household/HouseholdDetails";

export function HouseholdTable({ households }: { households: any[] }) {
  const [expandedHouseholds, setExpandedHouseholds] = useState<Set<string>>(
    new Set(),
  );

  const toggleHousehold = (id: string) => {
    const newExpanded = new Set(expandedHouseholds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedHouseholds(newExpanded);
  };

  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10"></TableHead>
              <TableHead>Head Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Income Sources</TableHead>
              <TableHead>Agriculture</TableHead>
              <TableHead>Survey Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {households.map((household) => {
              const isExpanded = expandedHouseholds.has(household.id);

              return (
                <React.Fragment key={household.id}>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleHousehold(household.id)}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {household.head_name}
                    </TableCell>
                    <TableCell>{household.head_phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{household.total_members}</Badge>
                    </TableCell>
                    <TableCell>
                      {household.household_locality ||
                        household.birth_place ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      {Array.isArray(household.income_sources)
                        ? household.income_sources.join(", ")
                        : household.income_sources || "N/A"}
                    </TableCell>
                    <TableCell>
                      {household.has_agricultural_land ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {household.household_survey_date
                        ? formatDate(household.household_survey_date)
                        : "N/A"}
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-muted/20 p-0">
                        <div className="p-4">
                          <HouseholdDetails household={household} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
