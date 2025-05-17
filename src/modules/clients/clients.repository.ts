import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { BaseRepository } from 'src/common/repositories';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientRepository extends BaseRepository<ClientEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ClientEntity, dataSource);
  }
}
