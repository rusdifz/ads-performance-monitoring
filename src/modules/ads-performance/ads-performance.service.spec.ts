import { Test, TestingModule } from '@nestjs/testing';
import { AdsPerformanceService } from './ads-performance.service';
import { AdsPerformanceRepository } from './ads-performance.repository';
import { FileLogsService } from '../file-logs/file-logs.service';
import { JobLogsService } from '../job-logs/job-logs.service';
import { ClientsService } from '../clients/clients.service';
import { ContractService } from '../contract/contract.service';
import { MethodSubmitFileLogsEnum } from '../file-logs/enums/file-logs.enum';
import { StatusJobLogsEnum } from '../job-logs/enums/job-logs.enum';
import {
  FilterUnderperformingAdsDTO,
  CreateAdPerformanceDTO,
} from './dto/request.dto';
import { AdsPerformanceEntity } from './entities/ads-performance.entity';
import * as XLSX from 'xlsx';
import { existsSync, readFileSync } from 'fs';
import { dayNow, durationHour } from '../../common/helpers';
import { IJwtUser } from '../user/interfaces/user-jwt.interface';
import { UserRoleEnum } from '../user/enums/user.enum';

// Mock fungsi eksternal
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.mock('xlsx', () => ({
  read: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));

jest.mock('../../common/helpers', () => ({
  dayNow: jest.fn(),
  durationHour: jest.fn(),
}));

describe('AdsPerformanceService', () => {
  let service: AdsPerformanceService;
  let repository: AdsPerformanceRepository;
  let fileLogsService: FileLogsService;
  let jobLogsService: JobLogsService;
  let clientsService: ClientsService;
  let contractService: ContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdsPerformanceService,
        {
          provide: AdsPerformanceRepository,
          useValue: {
            findList: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: FileLogsService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: JobLogsService,
          useValue: {
            createLogs: jest.fn(),
          },
        },
        {
          provide: ClientsService,
          useValue: {
            getDetail: jest.fn(),
          },
        },
        {
          provide: ContractService,
          useValue: {
            getDetail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdsPerformanceService>(AdsPerformanceService);
    repository = module.get<AdsPerformanceRepository>(AdsPerformanceRepository);
    fileLogsService = module.get<FileLogsService>(FileLogsService);
    jobLogsService = module.get<JobLogsService>(JobLogsService);
    clientsService = module.get<ClientsService>(ClientsService);
    contractService = module.get<ContractService>(ContractService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUnderperformingAds', () => {
    it('harus mengembalikan iklan dengan performa rendah', async () => {
      const mockAds: AdsPerformanceEntity[] = [
        {
          id: '1',
          actualValue: 0.02,
          clientId: 'client1',
          contractId: 'contract1',
        },
        {
          id: '2',
          actualValue: 0.01,
          clientId: 'client1',
          contractId: 'contract1',
        },
      ];
      const mockCount = 2;
      const mockFilter: FilterUnderperformingAdsDTO = {
        // kpi_target: 0.03,
        // client_id: 'bf9dbab3-cfd1-498a-965a-9038491ddf9a',
        contract_id: '15f6aaff-9422-4d9f-9989-b34286204ad8',
        page: 1,
        limit: 20,
      };
      const mockMappedData = [
        { id: '1', actual_value: 0.02, kpi_target: 0.03 },
        { id: '2', actual_value: 0.01, kpi_target: 0.03 },
      ];

      jest
        .spyOn(repository, 'findList')
        .mockResolvedValue([mockAds, mockCount]);
      jest
        .spyOn(
          require('./mappings/view.mapping'),
          'mapDbToResUnderperformingAds',
        )
        .mockResolvedValue(mockMappedData);

      const result = await service.getUnderperformingAds(mockFilter);

      expect(result.data).toEqual(mockMappedData);
      expect(result.count).toEqual(mockCount);
      expect(repository.findList).toHaveBeenCalledWith(mockFilter);
    });

    it('harus mengembalikan data kosong jika tidak ada iklan yang ditemukan', async () => {
      const mockFilter: FilterUnderperformingAdsDTO = {
        // kpi_target: 0.03,
        // client_id: 'a36f07cc-25e1-4d17-a6a3-4c4fa66b7d14',
        contract_id: '070b9066-5131-41f8-8851-c81d9504801e',
        page: 1,
        limit: 20,
      };

      jest.spyOn(repository, 'findList').mockResolvedValue([[], 0]);
      jest
        .spyOn(
          require('./mappings/view.mapping'),
          'mapDbToResUnderperformingAds',
        )
        .mockResolvedValue([]);

      const result = await service.getUnderperformingAds(mockFilter);

      expect(result.data).toEqual([]);
      expect(result.count).toEqual(0);
      expect(repository.findList).toHaveBeenCalledWith(mockFilter);
    });
  });

  describe('createPerformanceAds', () => {
    it('harus membuat data performa iklan dan mencatat log', async () => {
      const mockCreateData: CreateAdPerformanceDTO = {
        clientId: 'a36f07cc-25e1-4d17-a6a3-4c4fa66b7d14',
        contractId: '070b9066-5131-41f8-8851-c81d9504801e',
        actualValue: 0.3,
      };
      const mockAdmin: IJwtUser = {
        iat: 1516239022,
        user: {
          id: 1,
          username: 'admin-user',
          email: '',
          role: UserRoleEnum.ADMIN,
          isActive: true,
        },
      };
      const mockCreatedEntity: AdsPerformanceEntity = {
        id: '41e990c7-8f91-43b9-8f62-ff95c3ee43bf',
        clientId: '464ed2bb-6d64-4307-a879-9922983a1cd3',
        contractId: '4226bb6b-617c-4d37-abba-ad72757d1a92',
        actualValue: 0.3,
      };

      jest.spyOn(repository, 'create').mockResolvedValue(mockCreatedEntity);
      jest.spyOn(fileLogsService, 'create').mockResolvedValue(undefined);

      const result = await service.createPerformanceAds(
        mockCreateData,
        mockAdmin,
      );

      expect(result).toEqual(mockCreatedEntity);
      expect(repository.create).toHaveBeenCalledWith(mockCreateData);
      expect(fileLogsService.create).toHaveBeenCalledWith({
        submitBy: mockAdmin.user.username,
        method: MethodSubmitFileLogsEnum.CREATED,
        adsPerformanceId: mockCreatedEntity.id,
        description: 'Tambah actual perday',
      });
    });
  });

  describe('cronjobMetaFacebook', () => {
    it('harus mengembalikan false jika file tidak ada', async () => {
      (existsSync as jest.Mock).mockReturnValue(false);

      const result = await service.cronjobMetaFacebook();

      expect(result).toBe(false);
      expect(existsSync).toHaveBeenCalled();
      expect(readFileSync).not.toHaveBeenCalled();
    });

    it('harus memproses file dan membuat iklan jika file ada dengan data valid', async () => {
      (existsSync as jest.Mock).mockReturnValue(true);
      (readFileSync as jest.Mock).mockReturnValue(
        Buffer.from('some excel data'),
      );
      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} },
      });
      const mockJsonData = [
        { clientId: 'client1', contractId: null, actual_value: 0.3 },
        { clientId: null, contractId: 'contract1', actual_value: 0.4 },
      ];
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockJsonData);

      const mockClient = { id: 'client1' };
      const mockContract = { id: 'contract1' };
      // jest.spyOn(clientsService, 'getDetail').mockResolvedValue(mockClient);
      // jest.spyOn(contractService, 'getDetail').mockResolvedValue(mockContract);

      const mockCreatedAd1 = {
        id: '41e990c7-8f91-43b9-8f62-ff95c3ee43bf',
        clientId: '464ed2bb-6d64-4307-a879-9922983a1cd3',
        contractId: '4226bb6b-617c-4d37-abba-ad72757d1a92',
        actualValue: 0.3,
      };
      const mockCreatedAd2 = {
        id: '41e990c7-8f91-43b9-8f62-ff95c3ee43bf',
        clientId: '464ed2bb-6d64-4307-a879-9922983a1cd3',
        contractId: '4226bb6b-617c-4d37-abba-ad72757d1a92',
        actualValue: 0.6,
      };
      jest
        .spyOn(repository, 'create')
        .mockResolvedValueOnce(mockCreatedAd1)
        .mockResolvedValueOnce(mockCreatedAd2);

      const startTime = new Date();
      const endTime1 = new Date(startTime.getTime() + 1000);
      const endTime2 = new Date(endTime1.getTime() + 1000);
      (dayNow as jest.Mock)
        .mockReturnValueOnce(startTime)
        .mockReturnValue(endTime1)
        .mockReturnValueOnce(endTime2);
      (durationHour as jest.Mock).mockReturnValue(0.01);

      jest.spyOn(fileLogsService, 'create').mockResolvedValue(undefined);
      jest.spyOn(jobLogsService, 'createLogs').mockResolvedValue(undefined);

      const result = await service.cronjobMetaFacebook();

      expect(result).toBe(false); // Sesuai kode asli
      expect(repository.create).toHaveBeenCalledTimes(2);
      expect(repository.create).toHaveBeenNthCalledWith(1, mockJsonData[0]);
      expect(repository.create).toHaveBeenNthCalledWith(2, mockJsonData[1]);
      expect(fileLogsService.create).toHaveBeenCalledTimes(2);
      expect(jobLogsService.createLogs).toHaveBeenCalledTimes(2);
      expect(jobLogsService.createLogs).toHaveBeenNthCalledWith(1, {
        jobType: 'meta facebooj',
        status: StatusJobLogsEnum.SUCCESS,
        relation_id: mockCreatedAd1.id,
        start_time: startTime,
        end_time: endTime1,
        duration: 'Durasi (jam): 0.01 h',
        description: 'success cronjob',
      });
      expect(jobLogsService.createLogs).toHaveBeenNthCalledWith(2, {
        jobType: 'meta facebooj',
        status: StatusJobLogsEnum.SUCCESS,
        relation_id: mockCreatedAd2.id,
        start_time: startTime,
        end_time: endTime2,
        duration:
          'Durasi (jam):The unit tests provided above are designed to ensure that the `AdsPerformanceService` in your NestJS application functions correctly under various conditions. Below is a comprehensive report detailing the approach, implementation, and considerations for creating these tests, including how they address potential issues like Redis connection failures (as seen in your previous logs) and best practices for testing cron jobs',
      });
    });
  });
});
