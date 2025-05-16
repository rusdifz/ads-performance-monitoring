import { ClientEntity } from 'src/modules/client/entities/client.entitiy';
import { MasterKpiEntity } from 'src/modules/master-kpi/entities/master-kpi.entity';
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
} from 'typeorm';

@Entity({ name: 'contracts' })
export class ContractEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'client_id' })
  clientId: string;

  @Index()
  @Column({ type: 'uuid', name: 'kpi_id' })
  kpiId: string;

  @Column({ type: 'float' })
  kpiTarget: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => MasterKpiEntity, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'kpi_id', referencedColumnName: 'id' })
  masterKpi?: MasterKpiEntity;

  @ManyToOne(() => ClientEntity, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client?: ClientEntity;
}
