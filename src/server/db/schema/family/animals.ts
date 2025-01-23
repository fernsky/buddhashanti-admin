import { pgTable, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { geometry } from "../../geographical";

const buddhashantiAnimal = pgTable("buddhashanti_animal", {
  id: varchar("id", { length: 48 }).primaryKey().notNull(),
  parentId: varchar("parent_id", { length: 48 }).notNull(),
  wardNo: integer("ward_no").notNull(),
  tenantId: varchar("tenant_id", { length: 48 }).default("buddhashanti"),
  deviceId: varchar("device_id", { length: 48 }).notNull(),
  animalName: varchar("animal_name", { length: 100 }),
  animalNameOther: varchar("animal_name_other", { length: 100 }),
  totalAnimals: integer("total_animals"),
  animalSales: decimal("animal_sales", { precision: 10, scale: 2 }),
  animalRevenue: decimal("animal_revenue", { precision: 10, scale: 2 }),
  geom: geometry("geom", { type: "Point" }),
});

export default buddhashantiAnimal;
