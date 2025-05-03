import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { HouseholdBasicSection } from "./HouseholdBasicSection";
import { HouseholdDemographicSection } from "./HouseholdDemographicSection";
import { HouseholdUtilitiesSection } from "./HouseholdUtilitiesSection";
import { HouseholdEconomicSection } from "./HouseholdEconomicSection";
import { HouseholdAgricultureSection } from "./HouseholdAgricultureSection";
import { HouseholdMembersTable } from "./HouseholdMembersTable";
import { HouseholdMedia } from "./HouseholdMedia";
import { HouseholdAdditionalTables } from "./HouseholdAdditionalTables";

export function FullHouseholdDisplay({ household }: { household: any }) {
  // Collect household media
  const householdMedia: {
    url: any;
    type: "image" | "audio" | "video";
    label: string;
  }[] = [];

  if (household.familyImage || household.household_image_key) {
    householdMedia.push({
      url: household.familyImage,
      type: "image" as const,
      label: "Family Image",
    });
  }

  if (household.enumeratorSelfie || household.household_enumerator_selfie_key) {
    householdMedia.push({
      url: household.enumeratorSelfie,
      type: "image" as const,
      label: "Enumerator Selfie",
    });
  }

  if (
    household.surveyAudioRecording ||
    household.household_audio_recording_key
  ) {
    householdMedia.push({
      url: household.surveyAudioRecording,
      type: "audio" as const,
      label: "Audio Recording",
    });
  }

  return (
    <Card className="overflow-hidden border-2 border-primary/10 shadow-sm">
      <CardHeader className="bg-muted/20 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            Household: {household.head_name}
            <Badge variant="outline">{household.total_members} members</Badge>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Survey date: {formatDate(household.household_survey_date || "")}
          </div>
        </div>
      </CardHeader>

      <div className="p-4 space-y-6">
        {/* Top row with basic info, demographics, and media */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <HouseholdBasicSection household={household} />
          </div>
          <div className="md:col-span-4">
            <HouseholdDemographicSection household={household} />
          </div>
          <div className="md:col-span-3">
            <HouseholdMedia media={householdMedia} />
          </div>
        </div>

        {/* Second row with utilities, economic info, and agriculture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HouseholdUtilitiesSection household={household} />
          <HouseholdEconomicSection household={household} />
          <HouseholdAgricultureSection household={household} />
        </div>

        {/* Members section (always displayed) */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Household Members</h3>
          <HouseholdMembersTable members={household.household_members || []} />
        </div>

        {/* Additional data tables (crops, animals, lands, etc.) */}
        <HouseholdAdditionalTables household={household} />
      </div>
    </Card>
  );
}
