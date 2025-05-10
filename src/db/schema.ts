import {
  pgTable,
  varchar,
  text,
  serial,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(), // clerkUserId
  username: varchar("username", { length: 50 }).notNull().unique(),
  first_name: varchar("first_name", { length: 100 }),
  last_name: varchar("last_name", { length: 100 }),
  image_url: text("avatar_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);

export const snippets = pgTable("snippets", {
  id: serial("id").primaryKey(),
  slug: varchar("slug").notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  code: text("code").notNull(),
  tags: text("tags").array(),
  summary: text("summary"),
  visibility: visibilityEnum().default("public").notNull(),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const pins = pgTable("pins", {
  id: serial("id").primaryKey(),
  snippetId: serial("snippet_id")
    .notNull()
    .references(() => snippets.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
