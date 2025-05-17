import { dayjs } from '../../../common/helpers';

import { ResUnderperformingAdsDTO } from '../dto/response.dto';
import { AdsPerformanceEntity } from '../entities/ads-performance.entity';

export async function mapDbToResUnderperformingAds(
  dbs: AdsPerformanceEntity[],
): Promise<ResUnderperformingAdsDTO[]> {
  if (dbs.length === 0) {
    return [];
  }

  const resp: ResUnderperformingAdsDTO[] = dbs.map((db) => {
    return {
      id: db.id,
      client: db.client.name,
      kpi_type: db.contract.kpiType,
      target: Number(db.contract.kpiTarget),
      actual: Number(db.actualValue),
      start_date: dayjs(db.contract.startDate).format('YYYY-MM-D HH:mm:ss'),
      end_date: dayjs(db.contract.endDate).format('YYYY-MM D HH:mm:ss'),
      created_at: dayjs(db.createdAt).format('YYYY-MM-D HH:mm:ss'),
    };
  });

  return resp;
}
