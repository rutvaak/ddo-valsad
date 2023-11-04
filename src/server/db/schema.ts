import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";

import {
  blob,
  index,
  integer,
  primaryKey,
  sqliteTable,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const posts = sqliteTable(
  "post",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name"),
    createdById: text("createdById").notNull(),
    createAt: integer("createdAt", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
  },
  (post) => ({
    createdByIdIdx: index("createdById_idx").on(post.createdById),
    nameIndex: index("name_idx").on(post.name),
  }),
);

export const schemes = sqliteTable(
  "scheme",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    details: text("details").notNull(),
    benefits: text("benefits").notNull(),
    eligibility: text("eligibility").notNull(),
    lastDate: integer("lastDate", { mode: "timestamp" }).notNull(),
    applicationProcess: text("applicationProcess").notNull(),
    requiredDocs: text("requiredDocs").notNull(),
    portalLink: text("portalLink").notNull(),
    gender: text("gender", {
      enum: ["ALL", "Female", "Transgender", "Male"],
    }).default("ALL"),
    maritalStatus: text("maritalStatus", {
      enum: [
        "Never Married",
        "All",
        "Divorced",
        "Separated",
        "Widowed",
        "Married",
      ],
    }).default("All"),
    category: text("category", {
      enum: ["General", "OBC", "SC", "ST", "all"],
    }).default("all"),
    schemeImage: text("schemeImage").notNull(),
    department: text("department").default("DDO-Valsad").notNull(),
    schemeCategory: text("schemeCategory", {
      enum: [
        "Social welfare & Empowerment",
        "Education & Learning",
        "Agriculture,Rural & Environment",
        "Business & Entrepreneurship",
        "Banking,Financial Services and Insurance",
        "Skills & Employment",
        "Health & Wellness",
        "Sports & Culture",
        "Housing & Shelter",
        "Utility & Sanitation",
        "Transport & Infrastructure",
        "Science, IT & Communications",
        "Travel & Tourism",
        "Public Safety,Law & Justice",
      ],
    }).default("Agriculture,Rural & Environment"),
    residence: text("residence", { enum: ["Both", "Rural", "Urban"] }).default(
      "Both",
    ),
    diffrentlyAble: text("diffrentlyAble", { enum: ["No", "Yes"] }).default(
      "No",
    ),
    isStudent: integer("isStudent", { mode: "boolean" })
      .default(true)
      .notNull(),
    employmentStatus: text("employmentStatus", {
      enum: ["All", "Employed", "Unemployed", "Self-Employed/ Entrepreneur"],
    }).default("All"),
    occupation: text("occupation", {
      enum: [
        "All",
        "Student",
        "Safai Karamchari",
        "Artists",
        "Ex Servicemen",
        "Khadi Artisan",
        "Teacher / Faculty",
        "Unorganized Worker",
      ],
    }).default("All"),
  },
  (scheme) => ({
    schemeCreatedAtIdx: index("schemeCreatedAtIdx").on(scheme.createdAt),
    genderIdx: index("genderIdx").on(scheme.gender),
    maritalStatusIdx: index("maritalStatus").on(scheme.maritalStatus),
    categoryIdx: index("categoryIdx").on(scheme.category),
    lastDateIdx: index("lastDateTdx").on(scheme.lastDate),
    nameIdx: index("nameIdx").on(scheme.name),
    departmentIdx: index("departmentIdx").on(scheme.department),
  }),
);

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export type Scheme = InferSelectModel<typeof schemes>;
export type SchemeInsert = InferInsertModel<typeof schemes>;
