import { Test, TestingModule } from '@nestjs/testing';
import { MasterKpiController } from './master-kpi.controller';

describe('MasterKpiController', () => {
  let controller: MasterKpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterKpiController],
    }).compile();

    controller = module.get<MasterKpiController>(MasterKpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
