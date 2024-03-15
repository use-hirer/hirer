import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const JobContract = c.router({
  createJob: {
    method: 'POST',
    path: '/job',
    body: z.object({}),
    responses: {
      201: z.object({}),
    },
    summary: 'Create Job',
  },
  deleteJob: {
    method: 'DELETE',
    path: '/job/:id',
    body: z.null(),
    responses: {
      200: z.object({
        id: z.string(),
        name: z.string(),
        deleted: z.boolean(),
      }),
    },
    summary: 'Delete Job',
  },
  getJob: {
    method: 'GET',
    path: '/job/:id',
    responses: {
      200: z.object({}),
    },
    summary: 'Get Job',
  },
  getJobs: {
    method: 'GET',
    path: '/jobs',
    responses: {
      200: z.array(z.object({})),
    },
    summary: 'Get Jobs',
  },
});
