import { Schema, z } from "zod";
import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";
import { Prisma, Rank } from "@prisma/client";



export const exampleRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.rank.findMany();
  }),

  post: publicProcedure
  .input(
    z.object({
      sydneyRank: z.number(),
      lokiRank: z.number(),
      stuartRank: z.number(),
      elGatoRank: z.number(),
    })
  ).mutation (async({input, ctx}) => {
      const post = await ctx.prisma.rank.create({
        data: {
          id: 0, 
          sydneyRank: input.sydneyRank, 
          lokiRank: input.lokiRank, 
          stuartRank: input.stuartRank, 
          elGatoRank: input.elGatoRank
        }
      });

      return post
  })
})




