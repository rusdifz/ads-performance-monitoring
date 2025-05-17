import { Injectable } from '@nestjs/common';

import { FileLogsRepository } from '../clients/clients.repository';
import { CreateFileLogsDTO } from './dto/request.dto';
import { FileLogsEntity } from './entities/file-logs.entitiy';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PaginationDTO } from 'src/common/dto';
@Injectable()
export class FileLogsService {
  constructor(private readonly repository: FileLogsRepository) {}

  async getList(props: PaginationDTO) {
    let query: FindManyOptions<FileLogsEntity> = {
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

  async getDetail(id: string): Promise<FileLogsEntity> {
    const query: FindOneOptions<FileLogsEntity> = {
      where: {
        id,
      },
    };

    return await this.repository.findOne(query);
  }

  async create(data: CreateFileLogsDTO): Promise<FileLogsEntity> {
    return await this.repository.save(data);
  }
}
