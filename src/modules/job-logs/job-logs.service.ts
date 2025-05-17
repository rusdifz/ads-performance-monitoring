import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PaginationDTO } from 'src/common/dto';

import { JobLogsEntity } from './entities/job-logs.entity';

import { JobLogsRepository } from './job-logs.repository';
import { CreateJobLogsDTO } from './dto/request.dto';

@Injectable()
export class JobLogsService {
  constructor(private readonly repository: JobLogsRepository) {}

  async getList(props: PaginationDTO) {
    let query: FindManyOptions<JobLogsEntity> = {
      where: {},
    };

    // sort & order query
    query = this.repository.sort(query, props);

    // pagination query
    query = this.repository.paginate(query, props);

    const findData = await this.repository.findAndCount(query);

    return {
      data: findData[0],
      count: findData[1],
    };
  }

  async getDetail(id: string): Promise<JobLogsEntity> {
    const query: FindOneOptions<JobLogsEntity> = {
      where: {
        id,
      },
    };

    return await this.repository.findOne(query);
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async cronjobEksternal() {
    //get data from external
    //mapping data and validation
    //save to database
    // return await this.repository.save(data);
  }

  async createLogs(data: CreateJobLogsDTO): Promise<JobLogsEntity> {
    return await this.repository.save(data);
  }
}
