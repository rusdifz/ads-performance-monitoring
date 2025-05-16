import { Injectable } from '@nestjs/common';

import { AdsPerformanceRepository } from './ads-performance.repository';
import { FilterUnderperformingAdsDTO } from './dto/request.dto';
import { mapDbToResUnderperformingAds } from './mappings/view.mapping';
import { ResUnderperformingAdsDTO } from './dto/response.dto';
@Injectable()
export class AdsPerformanceService {
  constructor(private readonly repository: AdsPerformanceRepository) {}

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
}
