import { Test, TestingModule } from '@nestjs/testing';
import { JobLogsService } from './job-logs.service';

describe('JobLogsService', () => {
  let service: JobLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobLogsService],
    }).compile();

    service = module.get<JobLogsService>(JobLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
