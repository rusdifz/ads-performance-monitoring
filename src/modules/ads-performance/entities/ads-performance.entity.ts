import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToOne,
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

  @Column({ type: 'float' })
  actual_value: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => ClientEntity, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client?: ClientEntity;

  @OneToOne(() => ContractEntity, (entity) => entity.adsPerformance, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contract?: ContractEntity;
}
