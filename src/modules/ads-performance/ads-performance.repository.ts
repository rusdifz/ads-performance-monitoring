import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  Repository,
  UpdateResult,
  DeleteResult,
  FindOneOptions,
  MoreThanOrEqual,
  LessThanOrEqual,
  LessThan,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseQueryRepository } from 'src/common/repositories';

import { AdsPerformanceEntity } from './entities/ads-performance.entity';
import { FilterUnderperformingAdsDTO } from './dto/request.dto';

@Injectable()
export class AdsPerformanceRepository extends BaseQueryRepository {
  constructor(
    @InjectRepository(AdsPerformanceEntity)
    private adsPerformanceEntity: Repository<AdsPerformanceEntity>,
  ) {
    super();
  }

  async findOne(id: string): Promise<AdsPerformanceEntity> {
    const query: FindOneOptions<AdsPerformanceEntity> = {
      where: { id },
      relations: ['client', 'contract'],
    };

    return await this.adsPerformanceEntity.findOne(query);
  }

  async findList(
    props: FilterUnderperformingAdsDTO,
  ): Promise<[AdsPerformanceEntity[], number]> {
    let query: FindManyOptions<AdsPerformanceEntity> = {
      where: {},
      relations: ['client', 'contract'],
    };

    // sort & order query
    query = this.sort(query, props);

    // pagination query
    query = this.paginate(query, props);

    if (props.kpi_target) {
      Object.assign(query.where, {
        actual_value: LessThan(props.kpi_target),
      });
    }
    if (props.client_id) {
      Object.assign(query.where, {
        client_id: props.client_id,
      });
    }

    if (props.contract_id) {
      Object.assign(query.where, {
        contract_id: props.contract_id,
      });
    }

    if (props.kpi_type) {
      Object.assign(query.where, {
        kpiType: props.kpi_type,
      });
    }

    if (props.start_date && props.end_date) {
      Object.assign(query.where, {
        contract: {
          startDate: MoreThanOrEqual(props.start_date),
          endDate: LessThanOrEqual(props.end_date),
        },
      });
    } else {
      if (props.year) {
        Object.assign(query.where, {
          createdAt: props.kpi_type,
        });
      }

      if (props.month) {
        Object.assign(query.where, {
          createdA: props.kpi_type,
        });
      }

      if (props.date) {
        Object.assign(query.where, {
          createdAt: props.kpi_type,
        });
      }
    }

    return await this.adsPerformanceEntity.findAndCount(query);
  }

  async create(
    data: Partial<AdsPerformanceEntity>,
  ): Promise<AdsPerformanceEntity> {
    return await this.adsPerformanceEntity.save(data);
  }

  async update(
    data: Partial<AdsPerformanceEntity>,
    id: string,
  ): Promise<UpdateResult> {
    return await this.adsPerformanceEntity.update({ id }, data);
  }

  async softDelete(id: string): Promise<UpdateResult> {
    return await this.adsPerformanceEntity.softDelete({ id });
  }

  async hardDelete(id: string): Promise<DeleteResult> {
    return await this.adsPerformanceEntity.delete({ id });
  }
}
