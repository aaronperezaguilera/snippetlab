import {
  pgTable,
  varchar,
  text,
  serial,
  timestamp,
  pgEnum,
  boolean,
  integer,
  AnyPgColumn,
  json,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(), // clerkUserId
  username: varchar("username", { length: 50 }).notNull().unique(),
  first_name: varchar("first_name", { length: 100 }),
  last_name: varchar("last_name", { length: 100 }),
  image_url: text("avatar_url"),
  bio: text("bio"),
  website: text("website"),
  github: text("github"),
  x: text("x"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);

export const exampleSite = pgEnum("example_site", [
  "codilink",
  "codepen",
  "codesandbox",
  "stackblitz",
  "v0",
  "other",
]);

export const snippets = pgTable("snippets", {
  id: serial("id").primaryKey(),
  slug: varchar("slug").notNull(),
  filename: varchar("filename", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  code: text("code").notNull(),
  tags: text("tags").array(),
  summary: text("summary"),
  examples: json("examples")
    .$type<{ website: keyof typeof exampleSite; url: string }[]>()
    .default([])
    .notNull(),
  visibility: visibilityEnum().default("public").notNull(),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  forkedFrom: integer("forked_from").references(
    (): AnyPgColumn => snippets.id,
    { onDelete: "set null" }
  ),
  pinned: boolean("pinned").default(false).notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const snippetVersions = pgTable("snippet_versions", {
  id: serial("id").primaryKey(),
  snippetId: serial("snippet_id")
    .notNull()
    .references(() => snippets.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  slug: varchar("slug").notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  visibility: visibilityEnum().default("public").notNull(),
  pinned: boolean("pinned").default(false).notNull(),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collectionSnippets = pgTable(
  "collection_snippets",
  {
    collectionId: serial("collection_id")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    snippetId: serial("snippet_id")
      .notNull()
      .references(() => snippets.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.collectionId, table.snippetId] })]
);

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  snippetId: serial("snippet_id")
    .notNull()
    .references(() => snippets.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const follows = pgTable("follows", {
  id: serial("id").primaryKey(),
  followerId: varchar("follower_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  followingId: varchar("following_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  snippetId: serial("snippet_id")
    .notNull()
    .references(() => snippets.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  snippetId: integer("snippet_id")
    .$type<number | null>()
    .references(() => snippets.id, {
      onDelete: "cascade",
    }),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  questionId: serial("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
