import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { ContractEntity } from 'src/modules/contract/entities/contract.entity';

@Entity({ name: 'client' })
export class ClientEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => ContractEntity, (entity) => entity.client)
  @JoinColumn({ name: 'id', referencedColumnName: 'client_id' })
  contracts?: ContractEntity[];
}
