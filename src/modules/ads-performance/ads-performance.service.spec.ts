import { Test, TestingModule } from '@nestjs/testing';
import { AdsPerformanceService } from './ads-performance.service';

describe('AdsPerformanceService', () => {
  let service: AdsPerformanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdsPerformanceService],
    }).compile();

    service = module.get<AdsPerformanceService>(AdsPerformanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
