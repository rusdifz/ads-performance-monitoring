import { Injectable } from '@nestjs/common';

import { ContractEntity } from './entities/contract.entity';
import { ClientEntity } from '../clients/entities/client.entity';

import { ContractRepository } from './contract.repository';
import { FindManyOptions } from 'typeorm';
import { dummyContract } from './dummy-data/contract.dummy';

@Injectable()
export class ContractService {
  constructor(private readonly repository: ContractRepository) {}

  async getList(props: any): Promise<{ data: any[]; count: number }> {
    let query: FindManyOptions<ContractEntity> = {
      where: {},
      relations: {
        client: true,
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

  async getDetail(id: string): Promise<ContractEntity> {
    return await this.repository.findOneBy({ id });
  }

  async createDummyData(
    clientDummy: ClientEntity[],
  ): Promise<ContractEntity[]> {
    let resp: ContractEntity[] = [];

    for (const client of clientDummy) {
      for (const contract of dummyContract(client)) {
        const insertData = await this.repository.save(contract);

        if (insertData.id) {
          resp.push(insertData);
        }
      }
    }

    return resp;
  }
}
