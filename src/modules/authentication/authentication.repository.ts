import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { BaseRepository } from 'src/common/repositories';
import { AdminUserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthenticationUserRepository extends BaseRepository<AdminUserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(AdminUserEntity, dataSource);
  }
}
