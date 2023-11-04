import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { SchemeInsert, schemes, users } from "~/server/db/schema";

export const schemeRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.custom<SchemeInsert>())
    .mutation(async ({ ctx: { db }, input }) => {
      await db.insert(schemes).values({ ...input, createdAt: new Date() });
    }),

  getAll: publicProcedure.query(async ({ ctx: { db } }) => {
    return await db.select().from(schemes);
  }),

  getScheme: publicProcedure
    .input(z.object({ schemeId: z.string() }))
    .query(async ({ ctx: { db }, input }) => {
      return db.query.schemes.findFirst({
        where: eq(users.id, input.schemeId),
      });
    }),
});
