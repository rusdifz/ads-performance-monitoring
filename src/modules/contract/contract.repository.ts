import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { BaseRepository } from 'src/common/repositories';
import { ContractEntity } from './entities/contract.entity';

@Injectable()
export class ContractRepository extends BaseRepository<ContractEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ContractEntity, dataSource);
  }
}
