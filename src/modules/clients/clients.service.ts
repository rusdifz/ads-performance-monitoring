import { Injectable } from '@nestjs/common';
import { ClientRepository } from './clients.repository';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(private readonly repository: ClientRepository) {}

  async getDetail(id: string): Promise<ClientEntity> {
    return await this.repository.findOneBy({ id });
  }
}
