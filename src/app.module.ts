import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configIndex } from 'src/config';
import { DbModule } from 'src/config/db/db.module';

import { AppController } from './app.controller';

import { IsUniqueConstraint } from './common/decorators';
import { IsExistConstraint } from './common/decorators/is-exists.decorator';

import { AdsPerformanceModule } from './modules/ads-performance/ads-performance.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
// import { ContractModule } from './modules/contract/contract.module';
// import { FileLogsModule } from './modules/file-logs/file-logs.module';
// import { JobLogsModule } from './modules/job-logs/job-logs.module';
// import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(configIndex),
    DbModule,
    AdsPerformanceModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [IsUniqueConstraint, IsExistConstraint],
})
export class AppModule {}
