import {
  integer,
  pgTable,
  varchar,
  doublePrecision,
  timestamp,
} from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("New"),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrdersSchema = createInsertSchema(ordersTable).omit({
  id: true,
  userId: true,
  status: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  id: true,
  orderId: true,
});

export const insertOrdersWithItemsSchema = z.object({
  order: insertOrdersSchema,
  items: z.array(insertOrderItemSchema),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
  status: true,
});
