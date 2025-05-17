import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdsPerformanceEntity } from './entities/ads-performance.entity';

import { AdsPerformanceRepository } from './ads-performance.repository';
import { AdsPerformanceService } from './ads-performance.service';
import { AdsPerformanceController } from './ads-performance.controller';

import { FileLogsModule } from '../file-logs/file-logs.module';
import { JobLogsModule } from '../job-logs/job-logs.module';
import { ClientsModule } from '../clients/clients.module';
import { ContractModule } from '../contract/contract.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdsPerformanceEntity]),
    FileLogsModule,
    JobLogsModule,
    ClientsModule,
    ContractModule,
  ],
  providers: [AdsPerformanceRepository, AdsPerformanceService],
  controllers: [AdsPerformanceController],
})
export class AdsPerformanceModule {}
