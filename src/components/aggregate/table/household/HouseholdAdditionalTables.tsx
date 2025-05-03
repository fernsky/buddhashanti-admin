import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function HouseholdAdditionalTables({ household }: { household: any }) {
  return (
    <div className="space-y-6">
      {/* Agricultural Lands */}
      {household.agricultural_lands?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Agricultural Lands</h3>
          <ScrollArea className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ward</TableHead>
                  <TableHead>Ownership Type</TableHead>
                  <TableHead>Land Area</TableHead>
                  <TableHead>Irrigation Source</TableHead>
                  <TableHead>Irrigation Time</TableHead>
                  <TableHead>Irrigated Area</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {household.agricultural_lands.map((land: any) => (
                  <TableRow key={land.id}>
                    <TableCell>{land.ward_number}</TableCell>
                    <TableCell>{land.land_ownership_type}</TableCell>
                    <TableCell>{land.land_area}</TableCell>
                    <TableCell>{land.irrigation_source}</TableCell>
                    <TableCell>{land.irrigation_time || "N/A"}</TableCell>
                    <TableCell>{land.irrigated_land_area || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {/* Crops */}
      {household.crops?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Crops</h3>
          <ScrollArea className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ward</TableHead>
                  <TableHead>Crop Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Production</TableHead>
                  <TableHead>Tree Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {household.crops.map((crop: any) => (
                  <TableRow key={crop.id}>
                    <TableCell>{crop.ward_number}</TableCell>
                    <TableCell>{crop.crop_name}</TableCell>
                    <TableCell>{crop.crop_type}</TableCell>
                    <TableCell>{crop.area}</TableCell>
                    <TableCell>{crop.production}</TableCell>
                    <TableCell>{crop.tree_count || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {/* Animals */}
      {household.animals?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Animals</h3>
          <ScrollArea className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal Name</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {household.animals.map((animal: any) => (
                  <TableRow key={animal.id}>
                    <TableCell>
                      {animal.animal_name}
                      {animal.animal_name_other
                        ? ` (${animal.animal_name_other})`
                        : ""}
                    </TableCell>
                    <TableCell>{animal.total_animals}</TableCell>
                    <TableCell>{animal.animal_sales || "N/A"}</TableCell>
                    <TableCell>{animal.animal_revenue || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {/* Animal Products */}
      {household.animal_products?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Animal Products</h3>
          <ScrollArea className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Production</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {household.animal_products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.product_name}
                      {product.product_name_other
                        ? ` (${product.product_name_other})`
                        : ""}
                    </TableCell>
                    <TableCell>
                      {product.unit}
                      {product.unit_other ? ` (${product.unit_other})` : ""}
                    </TableCell>
                    <TableCell>{product.production}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {/* Deaths */}
      {household.deaths?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Deceased Family Members</h3>
          <ScrollArea className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Cause</TableHead>
                  <TableHead>Fertility Death Condition</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {household.deaths.map((death: any) => (
                  <TableRow key={death.id}>
                    <TableCell className="font-medium">
                      {death.deceased_name}
                    </TableCell>
                    <TableCell>{death.deceased_gender}</TableCell>
                    <TableCell>{death.deceased_age}</TableCell>
                    <TableCell>{death.deceased_death_cause}</TableCell>
                    <TableCell>
                      {death.deceased_fertility_death_condition || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {/* Absentees */}
      {household.absentees?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Absentee Members</h3>
          <ScrollArea className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Remittance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {household.absentees.map((absentee: any) => (
                  <TableRow key={absentee.id}>
                    <TableCell className="font-medium">
                      {absentee.absentee_name}
                    </TableCell>
                    <TableCell>{absentee.gender}</TableCell>
                    <TableCell>{absentee.age}</TableCell>
                    <TableCell>{absentee.education_level}</TableCell>
                    <TableCell>{absentee.absence_reason}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>{absentee.location}</div>
                        <div className="text-xs text-muted-foreground">
                          {[
                            absentee.province,
                            absentee.district,
                            absentee.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {absentee.sends_remittance ? (
                        <div>
                          <Badge variant="default" className="text-xs">
                            Yes
                          </Badge>
                          {absentee.remittance_amount && (
                            <div className="text-xs mt-1">
                              Rs. {absentee.remittance_amount}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          No
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {/* Suggestions to municipality */}
      {household.municipal_suggestions?.length > 0 && (
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-medium mb-2">Municipal Suggestions</h3>
          <div className="text-sm">
            {Array.isArray(household.municipal_suggestions)
              ? household.municipal_suggestions.join(", ")
              : household.municipal_suggestions}
            {household.municipal_suggestions_other && (
              <>
                <Separator className="my-2" />
                <div className="italic">
                  {household.municipal_suggestions_other}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
