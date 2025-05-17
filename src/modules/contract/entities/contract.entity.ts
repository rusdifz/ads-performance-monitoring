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

import { KpiEnums } from 'src/common/enums/kpi.enums';
import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { AdsPerformanceEntity } from 'src/modules/ads-performance/entities/ads-performance.entity';
@Entity({ name: 'contracts' })
export class ContractEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'client_id' })
  clientId: string;

  @Index()
  @Column({
    type: 'enum',
    enum: KpiEnums,
    default: KpiEnums.CTR,
    name: 'kpi_type',
  })
  kpiType: KpiEnums;

  @Column('decimal', { precision: 5, scale: 2, name: 'kpi_target' })
  kpiTarget: number;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date' })
  endDate: Date;

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
}
