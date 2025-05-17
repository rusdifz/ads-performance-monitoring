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
import { ContractEntity } from '../contract/entities/contract.entity';

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
    let queryDb = this.adsPerformanceEntity
      .createQueryBuilder('ads')
      .innerJoin(ContractEntity, 'contracts', 'ads.contract_id = contract.id')
      .where('ads.actual_value < contract.kpi_target');

    if (props.client_id) {
      queryDb.andWhere('ads.client_id = :client_id', {
        client_id: props.client_id,
      });
    }

    if (props.contract_id) {
      queryDb.andWhere('ads.contract_id = :contract_id', {
        contract_id: props.contract_id,
      });
    }

    if (props.kpi_target) {
      queryDb.andWhere('contracts.kpi_target = :kpi_target', {
        kpi_target: props.kpi_target,
      });
    }

    if (props.kpi_type) {
      queryDb.andWhere('ads.kpi_type = :kpi_type', {
        kpi_type: props.kpi_type,
      });
    }

    if (props.date) {
      queryDb.andWhere('ads.kpi_type = :kpi_type', {
        date: props.date,
      });
    }

    return await queryDb.getManyAndCount();
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
