import { Test, TestingModule } from '@nestjs/testing';
import { FileLogsService } from './file-logs.service';

describe('FileLogsService', () => {
  let service: FileLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileLogsService],
    }).compile();

    service = module.get<FileLogsService>(FileLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
