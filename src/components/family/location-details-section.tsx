import { Home, MapPin } from "lucide-react";
import { ShowPoint } from "@/components/shared/maps/show-point";

interface LocationDetailsSectionProps {
  coordinates: [number, number];
  gpsAccuracy?: number;
  altitude?: number;
  locality?: string;
  wardNo?: number;
}

export function LocationDetailsSection({
  coordinates,
  gpsAccuracy,
  altitude,
  locality,
  wardNo,
}: LocationDetailsSectionProps) {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="border-b bg-muted/50 p-4">
          <h3 className="font-semibold">Location Details</h3>
          <p className="text-xs text-muted-foreground">
            Family Location and Address Details
          </p>
        </div>
        <div className="aspect-[16/10]">
          <ShowPoint coordinates={coordinates} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 p-4">
          <div className="rounded-lg border bg-card/50 p-3 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Ward & Locality
                </p>
                <p className="font-medium">
                  Ward {wardNo || "—"}
                  {locality && `, ${locality}`}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card/50 p-3 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Elevation
                </p>
                <p className="font-medium">
                  {altitude?.toFixed(2) || "—"} meters
                  {gpsAccuracy && ` (±${gpsAccuracy.toFixed(2)}m)`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
