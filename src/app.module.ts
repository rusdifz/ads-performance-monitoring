import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configIndex } from 'src/config';
import { DbModule } from 'src/config/db/db.module';

import { AppController } from './app.controller';

import { IsUniqueConstraint } from './common/decorators';
import { IsExistConstraint } from './common/decorators/is-exists.decorator';

import { AdsPerformanceModule } from './modules/ads-performance/ads-performance.module';

@Module({
  imports: [ConfigModule.forRoot(configIndex), DbModule, AdsPerformanceModule],
  controllers: [AppController],
  providers: [IsUniqueConstraint, IsExistConstraint],
})
export class AppModule {}
