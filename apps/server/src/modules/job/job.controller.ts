import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { JobContract } from './job.contract';
import { JobService } from './job.service';

@Controller()
export class JobController {
  constructor(private readonly service: JobService) {}

  @TsRestHandler(JobContract.createJob)
  async createJob() {
    return tsRestHandler(JobContract.createJob, async ({ body }) => {
      console.log(body);

      return { status: 201, body: {} };
    });
  }
}
