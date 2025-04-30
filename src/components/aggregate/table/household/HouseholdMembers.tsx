import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

export function HouseholdMembers({ members }: { members: any[] }) {
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(
    new Set(),
  );

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No household members found
      </div>
    );
  }

  const toggleMember = (id: string) => {
    const newExpanded = new Set(expandedMembers);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedMembers(newExpanded);
  };

  return (
    <Card>
      <ScrollArea className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Marital Status</TableHead>
              <TableHead>Health</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => {
              const isExpanded = expandedMembers.has(member.id);
              return (
                <React.Fragment key={member.id}>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleMember(member.id)}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.gender}</TableCell>
                    <TableCell>{member.age}</TableCell>
                    <TableCell>{member.educational_level || "N/A"}</TableCell>
                    <TableCell>{member.primary_occupation || "N/A"}</TableCell>
                    <TableCell>{member.marital_status || "N/A"}</TableCell>
                    <TableCell>
                      {member.is_disabled === "yes" && (
                        <Badge variant="destructive">Disabled</Badge>
                      )}
                      {member.has_chronic_disease === "yes" && (
                        <Badge variant="outline" className="ml-1">
                          Chronic Condition
                        </Badge>
                      )}
                      {member.is_sanitized === "yes" && (
                        <Badge variant="default" className="ml-1">
                          Sanitized
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-muted/20 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Demographics */}
                          <div>
                            <h5 className="font-medium mb-2">Demographics</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-medium text-muted-foreground">
                                Citizen Of
                              </div>
                              <div>
                                {member.citizen_of || "N/A"}
                                {member.citizen_of_other
                                  ? ` (${member.citizen_of_other})`
                                  : ""}
                              </div>

                              <div className="font-medium text-muted-foreground">
                                Caste
                              </div>
                              <div>
                                {member.caste || "N/A"}
                                {member.caste_other
                                  ? ` (${member.caste_other})`
                                  : ""}
                              </div>

                              <div className="font-medium text-muted-foreground">
                                Religion
                              </div>
                              <div>
                                {member.religion || "N/A"}
                                {member.religion_other
                                  ? ` (${member.religion_other})`
                                  : ""}
                              </div>

                              <div className="font-medium text-muted-foreground">
                                Mother Tongue
                              </div>
                              <div>
                                {member.primary_mother_tongue || "N/A"}
                                {member.primary_mother_tongue_other
                                  ? ` (${member.primary_mother_tongue_other})`
                                  : ""}
                              </div>

                              <div className="font-medium text-muted-foreground">
                                Ancestral Language
                              </div>
                              <div>
                                {member.ancestral_language || "N/A"}
                                {member.ancestral_language_other
                                  ? ` (${member.ancestral_language_other})`
                                  : ""}
                              </div>
                            </div>
                          </div>

                          {/* Health and Marriage */}
                          <div>
                            <h5 className="font-medium mb-2">
                              Health & Family
                            </h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-medium text-muted-foreground">
                                Marital Status
                              </div>
                              <div>{member.marital_status || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Married Age
                              </div>
                              <div>{member.married_age || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Chronic Disease
                              </div>
                              <div>
                                {member.has_chronic_disease || "No"}
                                {member.primary_chronic_disease
                                  ? `: ${member.primary_chronic_disease}`
                                  : ""}
                              </div>

                              <div className="font-medium text-muted-foreground">
                                Is Sanitized
                              </div>
                              <div>{member.is_sanitized || "No"}</div>

                              <div className="font-medium text-muted-foreground">
                                Is Disabled
                              </div>
                              <div>
                                {member.is_disabled || "No"}
                                {member.disability_type
                                  ? `: ${member.disability_type}`
                                  : ""}
                              </div>

                              <div className="font-medium text-muted-foreground">
                                Disability Cause
                              </div>
                              <div>{member.disability_cause || "N/A"}</div>
                            </div>
                          </div>

                          {/* Education and Work */}
                          <div>
                            <h5 className="font-medium mb-2">
                              Education & Work
                            </h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-medium text-muted-foreground">
                                Literacy Status
                              </div>
                              <div>{member.literacy_status || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Education Level
                              </div>
                              <div>{member.educational_level || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Goes to School
                              </div>
                              <div>{member.goes_school || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                School Barrier
                              </div>
                              <div>{member.school_barrier || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Has Training
                              </div>
                              <div>{member.has_training || "No"}</div>

                              <div className="font-medium text-muted-foreground">
                                Primary Skill
                              </div>
                              <div>{member.primary_skill || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Months Worked
                              </div>
                              <div>{member.months_worked || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Occupation
                              </div>
                              <div>{member.primary_occupation || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Work Barrier
                              </div>
                              <div>{member.work_barrier || "N/A"}</div>

                              <div className="font-medium text-muted-foreground">
                                Work Availability
                              </div>
                              <div>{member.work_availability || "N/A"}</div>
                            </div>
                          </div>

                          {/* Fertility Information - Only for female members */}
                          {member.gender === "Female" &&
                            member.gave_live_birth && (
                              <div className="col-span-1 md:col-span-3">
                                <h5 className="font-medium mb-2">
                                  Fertility Information
                                </h5>
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
                                  <div className="font-medium text-muted-foreground">
                                    Gave Live Birth
                                  </div>
                                  <div>{member.gave_live_birth}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Alive Sons
                                  </div>
                                  <div>{member.alive_sons || 0}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Alive Daughters
                                  </div>
                                  <div>{member.alive_daughters || 0}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Total Born
                                  </div>
                                  <div>{member.total_born_children || 0}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Dead Sons
                                  </div>
                                  <div>{member.dead_sons || 0}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Dead Daughters
                                  </div>
                                  <div>{member.dead_daughters || 0}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Recent Alive Sons
                                  </div>
                                  <div>{member.recent_alive_sons || 0}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Recent Alive Daughters
                                  </div>
                                  <div>
                                    {member.recent_alive_daughters || 0}
                                  </div>

                                  <div className="font-medium text-muted-foreground">
                                    Recent Birth Total
                                  </div>
                                  <div>{member.recent_birth_total || 0}</div>

                                  <div className="font-medium text-muted-foreground">
                                    Recent Birth Location
                                  </div>
                                  <div>
                                    {member.recent_birth_location || "N/A"}
                                  </div>

                                  <div className="font-medium text-muted-foreground">
                                    Prenatal Checkup
                                  </div>
                                  <div>{member.prenatal_checkup || "N/A"}</div>
                                </div>
                              </div>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
