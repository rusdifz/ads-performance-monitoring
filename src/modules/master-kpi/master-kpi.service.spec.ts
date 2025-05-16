import { Test, TestingModule } from '@nestjs/testing';
import { MasterKpiService } from './master-kpi.service';

describe('MasterKpiService', () => {
  let service: MasterKpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterKpiService],
    }).compile();

    service = module.get<MasterKpiService>(MasterKpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
