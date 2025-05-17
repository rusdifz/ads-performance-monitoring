import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileLogsEntity } from './entities/file-logs.entitiy';

import { FileLogsRepository } from '../clients/clients.repository';
import { FileLogsService } from './file-logs.service';
import { FileLogsController } from './file-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileLogsEntity])],
  providers: [FileLogsRepository, FileLogsService],
  controllers: [FileLogsController],
  exports: [FileLogsService],
})
export class FileLogsModule {}
