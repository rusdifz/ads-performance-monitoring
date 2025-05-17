import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { BaseRepository } from 'src/common/repositories';
import { JobLogsEntity } from './entities/job-logs.entity';

@Injectable()
export class JobLogsRepository extends BaseRepository<JobLogsEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(JobLogsEntity, dataSource);
  }
}
