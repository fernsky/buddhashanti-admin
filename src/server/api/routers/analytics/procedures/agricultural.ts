import { sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { and, count, eq } from "drizzle-orm";
import buddhashantiAgriculturalLand from "@/server/db/schema/family/agricultural-lands";
import { buddhashantiCrop } from "@/server/db/schema/family/crops";
import { buddhashantiAnimal } from "@/server/db/schema/family/animals";
import { buddhashantiAnimalProduct } from "@/server/db/schema/family/animal-products";

export const getAgriculturalLandStats = publicProcedure
  .input(z.object({ wardNumber: z.number().optional() }))
  .query(async ({ ctx, input }) => {
    const query = ctx.db
      .select({
        ownershipType: buddhashantiAgriculturalLand.landOwnershipType,
        totalArea: sql<number>`sum(${buddhashantiAgriculturalLand.landArea})::float`,
        count: sql<number>`count(*)::int`,
      })
      .from(buddhashantiAgriculturalLand);

    if (input.wardNumber) {
      query.where(eq(buddhashantiAgriculturalLand.wardNo, input.wardNumber));
    }

    return await query.groupBy(buddhashantiAgriculturalLand.landOwnershipType);
  });

export const getIrrigationStats = publicProcedure
  .input(z.object({ wardNumber: z.number().optional() }))
  .query(async ({ ctx, input }) => {
    const query = ctx.db
      .select({
        isIrrigated: buddhashantiAgriculturalLand.isLandIrrigated,
        totalArea: sql<number>`sum(${buddhashantiAgriculturalLand.irrigatedLandArea})::float`,
        count: sql<number>`count(*)::int`,
      })
      .from(buddhashantiAgriculturalLand);

    if (input.wardNumber) {
      query.where(eq(buddhashantiAgriculturalLand.wardNo, input.wardNumber));
    }

    return await query.groupBy(buddhashantiAgriculturalLand.isLandIrrigated);
  });

export const getCropStats = publicProcedure
  .input(z.object({ wardNumber: z.number().optional() }))
  .query(async ({ ctx, input }) => {
    const query = ctx.db
      .select({
        cropType: buddhashantiCrop.cropType,
        cropName: buddhashantiCrop.cropName,
        totalArea: sql<number>`sum(${buddhashantiCrop.cropArea})::float`,
        totalProduction: sql<number>`sum(${buddhashantiCrop.cropProduction})::float`,
        totalRevenue: sql<number>`sum(${buddhashantiCrop.cropRevenue})::float`,
        count: sql<number>`count(*)::int`,
      })
      .from(buddhashantiCrop);

    if (input.wardNumber) {
      query.where(eq(buddhashantiCrop.wardNo, input.wardNumber));
    }

    return await query.groupBy(buddhashantiCrop.cropType, buddhashantiCrop.cropName);
  });

export const getAnimalStats = publicProcedure
  .input(z.object({ wardNumber: z.number().optional() }))
  .query(async ({ ctx, input }) => {
    const query = ctx.db
      .select({
        animalName: buddhashantiAnimal.animalName,
        totalCount: sql<number>`sum(${buddhashantiAnimal.totalAnimals})::int`,
        totalSales: sql<number>`sum(${buddhashantiAnimal.animalSales})::float`,
        totalRevenue: sql<number>`sum(${buddhashantiAnimal.animalRevenue})::float`,
        householdCount: sql<number>`count(*)::int`,
      })
      .from(buddhashantiAnimal);

    if (input.wardNumber) {
      query.where(eq(buddhashantiAnimal.wardNo, input.wardNumber));
    }

    return await query.groupBy(buddhashantiAnimal.animalName);
  });

export const getAnimalProductStats = publicProcedure
  .input(z.object({ wardNumber: z.number().optional() }))
  .query(async ({ ctx, input }) => {
    const query = ctx.db
      .select({
        productName: buddhashantiAnimalProduct.animalProductName,
        unit: buddhashantiAnimalProduct.animalProductUnit,
        totalProduction: sql<number>`sum(${buddhashantiAnimalProduct.animalProductProduction})::float`,
        totalSales: sql<number>`sum(${buddhashantiAnimalProduct.animalProductSales})::float`,
        totalRevenue: sql<number>`sum(${buddhashantiAnimalProduct.animalProductRevenue})::float`,
        householdCount: sql<number>`count(*)::int`,
      })
      .from(buddhashantiAnimalProduct);

    if (input.wardNumber) {
      query.where(eq(buddhashantiAnimalProduct.wardNo, input.wardNumber));
    }

    return await query.groupBy(
      buddhashantiAnimalProduct.animalProductName,
      buddhashantiAnimalProduct.animalProductUnit
    );
  });

export const getAgriculturalLandOverview = publicProcedure
  .input(z.object({ wardNumber: z.number().optional() }))
  .query(async ({ ctx, input }) => {
    const query = ctx.db
      .select({
        totalLandArea: sql<number>`sum(${buddhashantiAgriculturalLand.landArea})::float`,
        totalIrrigatedArea: sql<number>`sum(${buddhashantiAgriculturalLand.irrigatedLandArea})::float`,
        householdCount: sql<number>`count(distinct ${buddhashantiAgriculturalLand.familyId})::int`,
      })
      .from(buddhashantiAgriculturalLand);

    if (input.wardNumber) {
      query.where(eq(buddhashantiAgriculturalLand.wardNo, input.wardNumber));
    }

    return (await query)[0];
  });

export const getAgricultureOverview = publicProcedure
  .input(z.object({ wardNumber: z.number().optional() }))
  .query(async ({ ctx, input }) => {
    const baseWhere = input.wardNumber
      ? sql`ward_no = ${input.wardNumber}`
      : sql`1=1`;

    const [crops, animals, products] = await Promise.all([
      ctx.db.execute(sql`
        SELECT 
          COUNT(DISTINCT family_id)::int as total_households,
          SUM(crop_revenue)::float as total_revenue,
          SUM(crop_area)::float as total_area
        FROM ${buddhashantiCrop}
        WHERE ${baseWhere}
      `),
      ctx.db.execute(sql`
        SELECT 
          COUNT(DISTINCT family_id)::int as total_households,
          SUM(animal_revenue)::float as total_revenue,
          SUM(total_animals)::int as total_count
        FROM ${buddhashantiAnimal}
        WHERE ${baseWhere}
      `),
      ctx.db.execute(sql`
        SELECT 
          COUNT(DISTINCT family_id)::int as total_households,
          SUM(animal_product_revenue)::float as total_revenue
        FROM ${buddhashantiAnimalProduct}
        WHERE ${baseWhere}
      `),
    ]);

    return {
      crops: crops[0],
      animals: animals[0],
      animalProducts: products[0],
    };
  });
