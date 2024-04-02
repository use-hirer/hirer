import { aiRouter } from "./routes/ai/router";
import { jobRouter } from "./routes/job";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  ai: aiRouter,
  job: jobRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
