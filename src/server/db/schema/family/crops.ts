import { pgTable, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { geometry } from "../../geographical";

const buddhashantiCrop = pgTable("buddhashanti_crop", {
  id: varchar("id", { length: 48 }).primaryKey().notNull(),
  parentId: varchar("parent_id", { length: 48 }).notNull(),
  wardNo: integer("ward_no").notNull(),
  tenantId: varchar("tenant_id", { length: 48 }).default("buddhashanti"),
  deviceId: varchar("device_id", { length: 48 }).notNull(),
  cropType: varchar("crop_type", { length: 100 }),
  cropName: varchar("crop_name", { length: 100 }),
  cropArea: decimal("crop_area", { precision: 10, scale: 2 }),
  cropProduction: decimal("crop_production", { precision: 10, scale: 2 }),
  cropSales: decimal("crop_sales", { precision: 10, scale: 2 }),
  cropRevenue: decimal("crop_revenue", { precision: 10, scale: 2 }),
  geom: geometry("geom", { type: "Point" }),
});

export default buddhashantiCrop;
