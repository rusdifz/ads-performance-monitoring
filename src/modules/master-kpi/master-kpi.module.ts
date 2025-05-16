import { Module } from '@nestjs/common';
import { MasterKpiService } from './master-kpi.service';
import { MasterKpiController } from './master-kpi.controller';

@Module({
  providers: [MasterKpiService],
  controllers: [MasterKpiController]
})
export class MasterKpiModule {}
