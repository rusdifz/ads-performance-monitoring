import { Injectable } from '@nestjs/common';

import { ClientEntity } from './entities/client.entity';
import { dummyClient } from './dummy-data/client.dummy';

import { ClientRepository } from './clients.repository';

@Injectable()
export class ClientsService {
  constructor(private readonly repository: ClientRepository) {}

  async getDetail(id: string): Promise<ClientEntity> {
    return await this.repository.findOneBy({ id });
  }

  async createDummyData(): Promise<ClientEntity[]> {
    let resp: ClientEntity[] = [];

    for (const client of dummyClient) {
      const insertData = await this.repository.save(client);
      if (insertData.id) {
        resp.push(insertData);
      }
    }

    return resp;
  }
}
