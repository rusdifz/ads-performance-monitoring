import { Test, TestingModule } from '@nestjs/testing';
import { AdsPerformanceController } from './ads-performance.controller';

describe('AdsPerformanceController', () => {
  let controller: AdsPerformanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdsPerformanceController],
    }).compile();

    controller = module.get<AdsPerformanceController>(AdsPerformanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
