import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
