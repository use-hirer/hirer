import { initContract } from '@ts-rest/core';
import { JobContract } from './modules/job/job.contract';

const c = initContract();

export const ServerContract = c.router({
  job: JobContract,
});
