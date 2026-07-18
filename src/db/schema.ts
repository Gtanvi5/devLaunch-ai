import {
  pgTable,
  text,
  timestamp,
  integer,
  json,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. USERS TABLE
export const users = pgTable("users", {
  id: text("id").primaryKey(), // We use the Clerk user ID directly as the PK
  email: text("email").notNull().unique(),
  credits: integer("credits").default(3).notNull(), // Free tier gets 3 AI generations
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. IDEAS TABLE
export const ideas = pgTable("ideas", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. AI REPORTS TABLE
export const reports = pgTable("reports", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ideaId: text("idea_id")
    .notNull()
    .references(() => ideas.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // We store the structured OpenAI output as JSONB
  swotAnalysis: json("swot_analysis"),
  competitors: json("competitors"),
  revenuePrediction: json("revenue_prediction"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. STRIPE SUBSCRIPTIONS TABLE
export const subscriptions = pgTable("subscriptions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: text("stripe_customer_id").unique().notNull(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
});

// --- DRIZZLE RELATIONS (For easier querying) ---
export const usersRelations = relations(users, ({ many, one }) => ({
  ideas: many(ideas),
  reports: many(reports),
  subscription: one(subscriptions),
}));

export const ideasRelations = relations(ideas, ({ one, many }) => ({
  author: one(users, { fields: [ideas.userId], references: [users.id] }),
  reports: many(reports),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  idea: one(ideas, { fields: [reports.ideaId], references: [ideas.id] }),
  author: one(users, { fields: [reports.userId], references: [users.id] }),
}));

export const generations = pgTable("generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Links to Clerk's user ID
  topic: text("topic").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
