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
import { dayNow } from 'src/common/helpers';
import { ClientEntity } from '../clients/entities/client.entity';

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
      .leftJoinAndSelect('ads.contract', 'contract')
      .leftJoinAndSelect('ads.client', 'client')
      .where('ads.actual_value < contract.kpi_target')
      .andWhere('contract.start_date <= :date_now', { date_now: dayNow })
      .andWhere('contract.end_date >= :date_now', { date_now: dayNow });

    if (props.client_id) {
      queryDb.andWhere('ads.client_id = :client_id', {
        client_id: props.client_id,
      });
    }

    if (props.client_name) {
      queryDb.andWhere('client.name like :client_name', {
        client_name: `%${props.client_name}%`,
      });
    }

    if (props.contract_id) {
      queryDb.andWhere('ads.contract_id = :contract_id', {
        contract_id: props.contract_id,
      });
    }

    if (props.kpi_target) {
      queryDb.andWhere('contract.kpi_target = :kpi_target', {
        kpi_target: props.kpi_target,
      });
    }

    if (props.kpi_type) {
      queryDb.andWhere('contract.kpi_type = :kpi_type', {
        kpi_type: props.kpi_type,
      });
    }

    if (props.year) {
      queryDb.andWhere('EXTRACT(YEAR FROM ads.created_at) = :year', {
        year: props.year,
      });
    }

    if (props.month) {
      queryDb.andWhere('EXTRACT(MONTH FROM ads.created_at) = :month', {
        month: props.month,
      });
    }

    if (props.date) {
      queryDb.andWhere('ads.created_at = :date', {
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
