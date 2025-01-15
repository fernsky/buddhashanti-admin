import { z } from "zod";

export const buildingSchema = z.object({
  id: z.string(),
  surveyDate: z.string().date(),
  enumeratorName: z.string(),
  enumeratorId: z.string(),
  areaCode: z.string(),
  wardNumber: z.number(),
  locality: z.string(),
  totalFamilies: z.number(),
  totalBusinesses: z.number(),
  surveyAudioRecording: z.string().nullable(),
  gps: z.string(),
  altitude: z.number().nullable(),
  gpsAccuracy: z.number().nullable(),
  buildingImage: z.string().nullable(),
  enumeratorSelfie: z.string().nullable(),
  landOwnership: z.string(),
  base: z.string(),
  outerWall: z.string(),
  roof: z.string(),
  floor: z.string(),
  mapStatus: z.string(),
  naturalDisasters: z.string(),
  timeToMarket: z.string(),
  timeToActiveRoad: z.string(),
  timeToPublicBus: z.string(),
  timeToHealthOrganization: z.string(),
  timeToFinancialOrganization: z.string(),
  roadStatus: z.string(),
});

export const createBuildingSchema = buildingSchema.omit({ id: true });

export const updateBuildingSchema = buildingSchema.partial();

export const buildingQuerySchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
  sortBy: z
    .enum(["survey_date", "ward_number", "locality"])
    .default("survey_date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  filters: z
    .object({
      wardNumber: z.number().optional(),
      locality: z.string().optional(),
      mapStatus: z.string().optional(),
    })
    .optional(),
});

export type Building = z.infer<typeof buildingSchema>;
