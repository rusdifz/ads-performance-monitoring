import { Module } from '@nestjs/common';
import { AdsPerformanceService } from './ads-performance.service';
import { AdsPerformanceController } from './ads-performance.controller';

@Module({
  providers: [AdsPerformanceService],
  controllers: [AdsPerformanceController]
})
export class AdsPerformanceModule {}
