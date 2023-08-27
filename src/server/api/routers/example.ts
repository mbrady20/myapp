import { Schema, z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "npm/server/api/trpc";
import { Prisma, Rank } from "@prisma/client";
import { clerkClient, currentUser } from "@clerk/nextjs";



export const exampleRouter = createTRPCRouter({
  
  getAll: privateProcedure.query( async ({ ctx }) => {
    return await ctx.prisma.rank.findMany();
  }),

  post: privateProcedure
  .input(
    z.object({
      sydneyRank: z.number(),
      lokiRank: z.number(),
      stuartRank: z.number(),
      elGatoRank: z.number(),
      initials: z.string(),
    })
  ).mutation (async({input, ctx}) => {
    const authorId = ctx.userId;
      const post = await ctx.prisma.rank.create({
        data: {
          sydneyRank: input.sydneyRank, 
          lokiRank: input.lokiRank, 
          stuartRank: input.stuartRank, 
          elGatoRank: input.elGatoRank,
          authorId: authorId,
          initials: input.initials
        }
      });

      return post
  }),

  getTen: privateProcedure.query(async ({ctx}) => {
    return await ctx.prisma.rank.findMany({
      take: 10,
      orderBy: {
        id: 'desc'
      }
    });
  }),

})






