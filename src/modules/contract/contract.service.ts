import { Injectable } from '@nestjs/common';

import { ContractRepository } from './contract.repository';
import { FindManyOptions } from 'typeorm';
import { ContractEntity } from './entities/contract.entity';
@Injectable()
export class ContractService {
  constructor(private readonly repository: ContractRepository) {}

  async getList(props: any): Promise<{ data: any[]; count: number }> {
    let query: FindManyOptions<ContractEntity> = {
      where: {},
      relations: {
        client: true,
        adsPerformance: true,
      },
    };

    // sort & order query
    query = this.repository.sort(query, props);

    // pagination query
    query = this.repository.paginate(query, props);

    if (props.client_id) {
      Object.assign(query.where, { id: props.client_id });
    }

    if (props.kpi_type) {
      Object.assign(query.where, { kpiType: props.kpi_type });
    }

    const findData = await this.repository.findAndCount(query);

    const mapData = findData[0];

    return {
      data: mapData,
      count: findData[1],
    };
  }
}
