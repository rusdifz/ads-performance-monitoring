import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as XLSX from 'xlsx';

import { existsSync, readFileSync } from 'fs';

import { IJwtUser } from '../user/interfaces/user-jwt.interface';
import { MethodSubmitFileLogsEnum } from '../file-logs/enums/file-logs.enum';

import { StatusJobLogsEnum } from '../job-logs/enums/job-logs.enum';
import { dayNow, durationHour } from '../../common/helpers';

import {
  CreateAdPerformanceDTO,
  FilterUnderperformingAdsDTO,
} from './dto/request.dto';
import { mapDbToResUnderperformingAds } from './mappings/view.mapping';
import {
  ResCreatePerformanceDTO,
  ResUnderperformingAdsDTO,
} from './dto/response.dto';
import { AdsPerformanceEntity } from './entities/ads-performance.entity';

import { FileLogsService } from '../file-logs/file-logs.service';
import { ClientsService } from '../clients/clients.service';
import { ContractService } from '../contract/contract.service';
import { JobLogsService } from '../job-logs/job-logs.service';

import { AdsPerformanceRepository } from './ads-performance.repository';
import { ICsvMetaFacebookPerformance } from './interfaces/csv.interface';
import { dummyAdsPerformance } from './dummy-data/ads-performance.dummy';

@Injectable()
export class AdsPerformanceService {
  constructor(
    private readonly repository: AdsPerformanceRepository,
    private readonly logsFileService: FileLogsService,
    private readonly jobLogsFileService: JobLogsService,
    private readonly clientService: ClientsService,
    private readonly contractService: ContractService,
  ) {}

  async getUnderperformingAds(
    props: FilterUnderperformingAdsDTO,
  ): Promise<{ data: ResUnderperformingAdsDTO[]; count: number }> {
    const findData = await this.repository.findList(props);
    console.log('find', findData);

    const mapData = await mapDbToResUnderperformingAds(findData[0]);

    return {
      data: mapData,
      count: findData[1],
    };
  }

  async createPerformanceAds(
    data: CreateAdPerformanceDTO,
    admin: IJwtUser,
  ): Promise<ResCreatePerformanceDTO> {
    const createData = await this.repository.create(data);

    //create log
    await this.logsFileService.create({
      submitBy: admin?.user?.username ?? 'system',
      method: MethodSubmitFileLogsEnum.CREATED,
      adsPerformanceId: createData.id,
      description: 'Tambah actual perday',
    });

    return createData;
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async cronjobMetaFacebook(): Promise<boolean> {
    const startTimeRun = dayNow();

    //simulasi data eksternal, excel sudah masuk di folder public
    const dirExcel = __dirname.replace(
      '/dist/modules/ads-performance',
      '/public/meta-performance-facebook.xlsx',
    );

    //cek apakah data ada di folder public
    //jika ada jalankan script, jika tidak return false
    if (existsSync(dirExcel)) {
      // return path;
      const excelData = readFileSync(dirExcel);

      //Baca workbook dari file buffer
      const workbook: XLSX.WorkBook = XLSX.read(excelData.buffer, {
        type: 'buffer',
      });

      // Ambil sheet pertama
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // // Konversi data sheet ke JSON
      const jsonData: ICsvMetaFacebookPerformance[] =
        XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length > 0) {
        for (const ad of jsonData) {
          const mapData: CreateAdPerformanceDTO = {
            clientId: ad['Client Id'],
            contractId: ad['Contract Id'],
            actualValue: ad['Actual Value'],
          };

          let keyId = false;

          if (mapData.clientId) {
            const clientExist = await this.clientService.getDetail(
              mapData.clientId,
            );
            if (clientExist) {
              keyId = true;
            }
          } else if (mapData.contractId) {
            const contractExist = await this.contractService.getDetail(
              mapData.contractId,
            );
            if (contractExist) {
              keyId = true;
            }
          }

          if (keyId) {
            //insert to database
            const saveData = await this.repository.create(mapData);

            const endTimeRun = dayNow();
            const duration = durationHour(startTimeRun, endTimeRun);

            await Promise.all([
              this.logsFileService.create({
                submitBy: 'system',
                method: MethodSubmitFileLogsEnum.CRONJOB,
                adsPerformanceId: saveData.id,
                description: 'cronjob file meta facebook per 6 hour',
              }),
              this.jobLogsFileService.createLogs({
                jobType: 'meta facebooj',
                status: saveData.id
                  ? StatusJobLogsEnum.SUCCESS
                  : StatusJobLogsEnum.FAILED,
                relation_id: saveData.id ?? '',
                start_time: startTimeRun,
                end_time: endTimeRun,
                duration: `Durasi (jam): ${duration.toFixed(2)} h`,
                description: saveData.id
                  ? 'success cronjob'
                  : 'failed insert data',
              }),
            ]);
          }
        }
      }
    }

    return false;
  }

  async createDummyData(): Promise<AdsPerformanceEntity[]> {
    let resp: AdsPerformanceEntity[] = [];

    const createDummyClient = await this.clientService.createDummyData();

    if (createDummyClient.length > 0) {
      const createDummyContract =
        await this.contractService.createDummyData(createDummyClient);

      if (createDummyContract.length > 0) {
        for (const dummyContract of createDummyContract) {
          const mapData = dummyAdsPerformance(dummyContract);

          for (const ads of mapData) {
            const createData = await this.repository.create(ads);
            if (createData.id) {
              resp.push(createData);
            }
          }
        }
      }
    }

    return resp;
  }
}
