import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationUserRepository } from './authentication.repository';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AdminUserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserEntity])],
  providers: [AuthenticationUserRepository, AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
