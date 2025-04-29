import { publicProcedure } from "@/server/api/trpc";
import { sql } from "drizzle-orm";
import { buddhashantiAggregateBuilding } from "@/server/db/schema/aggregate-building";

export const getDistinctWardNumbers = publicProcedure.query(async ({ ctx }) => {
  const results = await ctx.db
    .selectDistinct({
      wardNumber: buddhashantiAggregateBuilding.ward_number,
    })
    .from(buddhashantiAggregateBuilding)
    .where(sql`${buddhashantiAggregateBuilding.ward_number} IS NOT NULL`)
    .orderBy(buddhashantiAggregateBuilding.ward_number);

  return results
    .filter(({ wardNumber }) => wardNumber !== null)
    .map(({ wardNumber }) => ({
      id: wardNumber!.toString(),
      wardNumber: wardNumber!,
    }));
});

export const getDistinctAreaCodes = publicProcedure.query(async ({ ctx }) => {
  const results = await ctx.db
    .selectDistinct({
      areaCode: buddhashantiAggregateBuilding.area_code,
    })
    .from(buddhashantiAggregateBuilding)
    .where(sql`${buddhashantiAggregateBuilding.area_code} IS NOT NULL`)
    .orderBy(buddhashantiAggregateBuilding.area_code);

  return results
    .filter(({ areaCode }) => areaCode !== null)
    .map(({ areaCode }) => ({
      id: areaCode!.toString(),
      areaCode: areaCode!,
    }));
});

export const getDistinctEnumerators = publicProcedure.query(async ({ ctx }) => {
  const results = await ctx.db
    .selectDistinct({
      enumeratorId: buddhashantiAggregateBuilding.enumerator_id,
      enumeratorName: buddhashantiAggregateBuilding.enumerator_name,
    })
    .from(buddhashantiAggregateBuilding)
    .where(sql`${buddhashantiAggregateBuilding.enumerator_id} IS NOT NULL`)
    .orderBy(buddhashantiAggregateBuilding.enumerator_name);

  return results
    .filter(({ enumeratorId }) => enumeratorId !== null)
    .map(({ enumeratorId, enumeratorName }) => ({
      id: enumeratorId!,
      name: enumeratorName || "Unknown Enumerator",
    }));
});

export const getDistinctMapStatuses = publicProcedure.query(async ({ ctx }) => {
  const results = await ctx.db
    .selectDistinct({
      mapStatus: buddhashantiAggregateBuilding.map_status,
    })
    .from(buddhashantiAggregateBuilding)
    .where(sql`${buddhashantiAggregateBuilding.map_status} IS NOT NULL`)
    .orderBy(buddhashantiAggregateBuilding.map_status);

  return results
    .filter(({ mapStatus }) => mapStatus !== null)
    .map(({ mapStatus }) => ({
      id: mapStatus!,
      name: mapStatus!,
    }));
});

export const getDistinctBuildingOwnerships = publicProcedure.query(
  async ({ ctx }) => {
    const results = await ctx.db
      .selectDistinct({
        buildingOwnership:
          buddhashantiAggregateBuilding.building_ownership_status,
      })
      .from(buddhashantiAggregateBuilding)
      .where(
        sql`${buddhashantiAggregateBuilding.building_ownership_status} IS NOT NULL`,
      )
      .orderBy(buddhashantiAggregateBuilding.building_ownership_status);

    return results
      .filter(({ buildingOwnership }) => buildingOwnership !== null)
      .map(({ buildingOwnership }) => ({
        id: buildingOwnership!,
        name: buildingOwnership!.replace(/_/g, " "),
      }));
  },
);

export const getDistinctBuildingBases = publicProcedure.query(
  async ({ ctx }) => {
    const results = await ctx.db
      .selectDistinct({
        buildingBase: buddhashantiAggregateBuilding.building_base,
      })
      .from(buddhashantiAggregateBuilding)
      .where(sql`${buddhashantiAggregateBuilding.building_base} IS NOT NULL`)
      .orderBy(buddhashantiAggregateBuilding.building_base);

    return results
      .filter(({ buildingBase }) => buildingBase !== null)
      .map(({ buildingBase }) => ({
        id: buildingBase!,
        name: buildingBase!.replace(/_/g, " "),
      }));
  },
);
