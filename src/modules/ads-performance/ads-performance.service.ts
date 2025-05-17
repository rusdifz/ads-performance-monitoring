import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { IJwtUser } from '../user/interfaces/user-jwt.interface';

import {
  CreateAdPerformanceDTO,
  FilterUnderperformingAdsDTO,
} from './dto/request.dto';
import { mapDbToResUnderperformingAds } from './mappings/view.mapping';
import { ResUnderperformingAdsDTO } from './dto/response.dto';
import { AdsPerformanceEntity } from './entities/ads-performance.entity';

import { FileLogsService } from '../file-logs/file-logs.service';
import { ClientsService } from '../clients/clients.service';

import { AdsPerformanceRepository } from './ads-performance.repository';
import { MethodSubmitFileLogsEnum } from '../file-logs/enums/file-logs.enum';

@Injectable()
export class AdsPerformanceService {
  constructor(
    private readonly repository: AdsPerformanceRepository,
    private readonly logsFileService: FileLogsService,
    private readonly clientService: ClientService,
  ) {}

  async getUnderperformingAds(
    props: FilterUnderperformingAdsDTO,
  ): Promise<{ data: ResUnderperformingAdsDTO[]; count: number }> {
    const findData = await this.repository.findList(props);

    const mapData = await mapDbToResUnderperformingAds(findData[0]);

    return {
      data: mapData,
      count: findData[1],
    };
  }

  async createPerformanceAds(
    data: CreateAdPerformanceDTO,
    admin: IJwtUser,
  ): Promise<AdsPerformanceEntity> {
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
    //simulasi data eksternal, excel sudah masuk di folder public
    //cek apakah data ada di folder public
    //jika ada jalankan script, jika tidak return false

    return false;
  }
}
