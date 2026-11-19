// schema.ts
import {
  pgTable,
  pgSchema,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---- Neon Auth's managed schema (read-only reference, not managed by your migrations) ----

const neonAuthSchema = pgSchema("neon_auth");

export const usersSync = neonAuthSchema.table("users_sync", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

// ---- Your app's schema ----

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),

  authorId: text("author_id")
    .notNull()
    .references(() => usersSync.id, { onDelete: "cascade" }),

  prepTimeMinutes: integer("prep_time_minutes"),
  cookTimeMinutes: integer("cook_time_minutes"),
  servings: integer("servings"),
  difficulty: difficultyEnum("difficulty").default("medium"),

  isPublic: boolean("is_public").notNull().default(true),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 }).notNull(),
  quantity: real("quantity"),
  unit: varchar("unit", { length: 50 }),
  notes: text("notes"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const steps = pgTable("steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),

  stepNumber: integer("step_number").notNull(),
  instruction: text("instruction").notNull(),
  imageUrl: text("image_url"),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
});

export const recipeTags = pgTable("recipe_tags", {
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
});

// ---- Relations ----

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  author: one(usersSync, {
    fields: [recipes.authorId],
    references: [usersSync.id],
  }),
  ingredients: many(ingredients),
  steps: many(steps),
  recipeTags: many(recipeTags),
}));

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));

export const stepsRelations = relations(steps, ({ one }) => ({
  recipe: one(recipes, {
    fields: [steps.recipeId],
    references: [recipes.id],
  }),
}));

export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTags.recipeId],
    references: [recipes.id],
  }),
  tag: one(tags, {
    fields: [recipeTags.tagId],
    references: [tags.id],
  }),
}));
