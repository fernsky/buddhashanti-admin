import { publicProcedure } from "@/server/api/trpc";
import { buildingQuerySchema } from "../building.schema";
import { buildings } from "@/server/db/schema/building";
import { surveyAttachments } from "@/server/db/schema";
import { and, eq, ilike, sql } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "@/env";

export const getAll = publicProcedure
  .input(buildingQuerySchema)
  .query(async ({ ctx, input }) => {
    const { limit, offset, sortBy, sortOrder, filters } = input;

    let conditions = sql`TRUE`;
    if (filters) {
      const filterConditions = [];
      if (filters.wardNumber) {
        filterConditions.push(eq(buildings.tmpWardNumber, filters.wardNumber));
      }
      if (filters.areaCode) {
        filterConditions.push(
          ilike(buildings.tmpAreaCode, `%${filters.areaCode}%`),
        );
      }
      if (filters.mapStatus) {
        filterConditions.push(eq(buildings.mapStatus, filters.mapStatus));
      }
      // Add enumerator filter
      if (filters.enumeratorId) {
        filterConditions.push(eq(buildings.enumeratorId, filters.enumeratorId));
      }
      // Add status filter
      if (filters.status) {
        filterConditions.push(eq(buildings.status, filters.status));
      }
      if (filterConditions.length > 0) {
        const andCondition = and(...filterConditions);
        if (andCondition) conditions = andCondition;
      }
    }

    const [data, totalCount] = await Promise.all([
      ctx.db
        .select()
        .from(buildings)
        .where(conditions)
        .orderBy(sql`${sql.identifier(sortBy)} ${sql.raw(sortOrder)}`)
        .limit(limit)
        .offset(offset),
      ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(buildings)
        .where(conditions)
        .then((result) => result[0].count),
    ]);

    return {
      data,
      pagination: {
        total: totalCount,
        pageSize: limit,
        offset,
      },
    };
  });

export const getById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const building = await ctx.db
      .select()
      .from(buildings)
      .where(eq(buildings.id, input.id))
      .limit(1);

    const attachments = await ctx.db.query.surveyAttachments.findMany({
      where: eq(surveyAttachments.dataId, input.id),
    });

    if (!building[0]) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Building not found",
      });
    }

    const createTimeout = (ms: number) =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Operation timed out")), ms),
      );

    try {
      // Process the attachments and create presigned URLs
      for (const attachment of attachments) {
        const timeout = 20000; // 20 seconds timeout

        if (attachment.type === "building_image") {
          console.log("Fetching building image");
          building[0].buildingImage = (await Promise.race([
            ctx.minio.presignedGetObject(
              env.BUCKET_NAME,
              attachment.name,
              24 * 60 * 60, // 24 hours expiry
            ),
            createTimeout(timeout),
          ])) as string;
        }
        if (attachment.type === "building_selfie") {
          building[0].enumeratorSelfie = (await Promise.race([
            ctx.minio.presignedGetObject(
              env.BUCKET_NAME,
              attachment.name,
              24 * 60 * 60,
            ),
            createTimeout(timeout),
          ])) as string;
        }
        if (attachment.type === "audio_monitoring") {
          building[0].surveyAudioRecording = (await Promise.race([
            ctx.minio.presignedGetObject(
              env.BUCKET_NAME,
              attachment.name,
              24 * 60 * 60,
            ),
            createTimeout(timeout),
          ])) as string;
        }
      }
    } catch (error) {
      console.error(error);
      // throw new TRPCError({
      //   code: "INTERNAL_SERVER_ERROR",
      //   message: "Failed to generate presigned URLs",
      //   cause: error,
      // });
    }

    return building[0];
  });

export const getByAreaCode = publicProcedure
  .input(z.object({ areaCode: z.string() }))
  .query(async ({ ctx, input }) => {
    const buildingDetails = await ctx.db
      .select({
        id: buildings.id,
        enumeratorName: buildings.enumeratorName,
        locality: buildings.locality,
        lat: sql<number>`ST_Y(${buildings.gps}::geometry)`,
        lng: sql<number>`ST_X(${buildings.gps}::geometry)`,
        gpsAccuracy: buildings.gpsAccuracy,
      })
      .from(buildings)
      .where(eq(buildings.tmpAreaCode, input.areaCode));

    return buildingDetails.map((building) => ({
      id: building.id,
      type: "building",
      enumeratorName: building.enumeratorName,
      locality: building.locality,
      gpsPoint:
        building.lat && building.lng
          ? {
              lat: building.lat,
              lng: building.lng,
              accuracy: building.gpsAccuracy ?? 0,
            }
          : null,
    }));
  });

export const getStats = publicProcedure.query(async ({ ctx }) => {
  const stats = await ctx.db
    .select({
      totalBuildings: sql<number>`count(*)`,
      totalFamilies: sql<number>`sum(${buildings.totalFamilies})`,
      avgBusinesses: sql<number>`avg(${buildings.totalBusinesses})`,
    })
    .from(buildings);

  return stats[0];
});
