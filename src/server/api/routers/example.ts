import { Schema, z } from "zod";
import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";
import { Prisma, Rank } from "@prisma/client";



export const exampleRouter = createTRPCRouter({
  
  getAll: publicProcedure.query( async ({ ctx }) => {
    return await ctx.prisma.rank.findMany();
  }),

  post: publicProcedure
  .input(
    z.object({
      sydneyRank: z.number(),
      lokiRank: z.number(),
      stuartRank: z.number(),
      elGatoRank: z.number(),
      initials: z.string(),
    })
  ).mutation (async({input, ctx}) => {
      const post = await ctx.prisma.rank.create({
        data: {
          sydneyRank: input.sydneyRank, 
          lokiRank: input.lokiRank, 
          stuartRank: input.stuartRank, 
          elGatoRank: input.elGatoRank,
          initials: input.initials
        }
      });

      return post
  }),

  getTen: publicProcedure.query(async ({ctx}) => {
    return await ctx.prisma.rank.findMany({
      take: 10,
      orderBy: {
        id: 'desc'
      }
    });
  }),

})






