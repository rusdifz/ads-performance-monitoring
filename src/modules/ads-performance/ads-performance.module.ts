import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdsPerformanceEntity } from './entities/ads-performance.entity';

import { AdsPerformanceRepository } from './ads-performance.repository';
import { AdsPerformanceService } from './ads-performance.service';
import { AdsPerformanceController } from './ads-performance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdsPerformanceEntity])],
  providers: [AdsPerformanceRepository, AdsPerformanceService],
  controllers: [AdsPerformanceController],
})
export class AdsPerformanceModule {}
