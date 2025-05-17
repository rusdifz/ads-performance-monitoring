import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { ContractEntity } from 'src/modules/contract/entities/contract.entity';

@Entity({ name: 'ads_performance' })
export class AdsPerformanceEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'client_id' })
  clientId: string;

  @Index()
  @Column({ type: 'uuid', name: 'contract_id' })
  contractId: string;

  @Column({ type: 'decimal', name: 'actual_value', precision: 5, scale: 2 })
  actualValue: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;

  @ManyToOne(() => ClientEntity, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client?: ClientEntity;

  @ManyToOne(() => ContractEntity, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contract?: ContractEntity;
}
