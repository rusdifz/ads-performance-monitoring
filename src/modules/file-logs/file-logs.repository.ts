import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { BaseRepository } from 'src/common/repositories';
import { FileLogsEntity } from './entities/file-logs.entitiy';

@Injectable()
export class FileLogsRepository extends BaseRepository<FileLogsEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FileLogsEntity, dataSource);
  }
}
