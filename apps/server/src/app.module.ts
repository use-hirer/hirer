import { Module } from '@nestjs/common';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [JobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
