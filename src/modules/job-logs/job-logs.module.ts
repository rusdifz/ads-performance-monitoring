import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobLogsEntity } from './entities/job-logs.entity';

import { JobLogsService } from './job-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobLogsEntity])],
  providers: [JobLogsService],
  exports: [JobLogsService],
})
export class JobLogsModule {}
