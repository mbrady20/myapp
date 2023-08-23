import { Schema, z } from "zod";
import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";
import { Prisma, Rank } from "@prisma/client";
import { clerkClient, currentUser } from "@clerk/nextjs";



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
      authorId: z.string(),
    })
  ).mutation (async({input, ctx}) => {
      const post = await ctx.prisma.rank.create({
        data: {
          sydneyRank: input.sydneyRank, 
          lokiRank: input.lokiRank, 
          stuartRank: input.stuartRank, 
          elGatoRank: input.elGatoRank,
          authorId: input.authorId
        }
      });

      return post
  })
})




