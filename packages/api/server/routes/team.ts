import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        website: z.string().optional(),
        bio: z.string().optional(),
        logo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      async function generateTeamSlug(teamName: string): Promise<string> {
        const baseSlug = teamName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        let slug = baseSlug;
        let count = 1;

        while (await isSlugTaken(slug)) {
          slug = `${baseSlug}-${count}`;
          count++;
        }

        return slug;
      }

      async function isSlugTaken(slug: string): Promise<boolean> {
        const team = await ctx.db.team.findUnique({
          where: { slug },
        });

        return !!team;
      }

      const slug = await generateTeamSlug(input.name);

      const team = await ctx.db.team.create({
        data: {
          name: input.name,
          slug: slug,
          avatar: input.logo,
          website: input.website,
          bio: input.bio,
        },
      });

      await ctx.db.teamMember.create({
        data: {
          teamId: team.id,
          userId: ctx.user.id,
          role: "Owner",
        },
      });

      if (!ctx.user.onboarded) {
        await ctx.db.user.update({
          where: {
            id: ctx.user.id,
          },
          data: {
            onboarded: true,
            data: {
              ...ctx.user.data,
              teamOnboarding: true,
            },
          },
        });
      }

      return true;
    }),
});