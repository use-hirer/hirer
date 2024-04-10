import { activityRouter } from "./routes/activity";
import { aiRouter } from "./routes/ai/router";
import { candidateRouter } from "./routes/candidate";
import { jobRouter } from "./routes/job";
import { teamRouter } from "./routes/team";
import { userRouter } from "./routes/user";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  ai: aiRouter,
  job: jobRouter,
  user: userRouter,
  team: teamRouter,
  candidate: candidateRouter,
  activity: activityRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
