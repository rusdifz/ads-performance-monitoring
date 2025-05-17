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
import { MethodSubmitFileLogsEnum } from '../enums/file-logs.enum';

@Entity({ name: 'file_logs' })
export class FileLogsEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'submit_by', length: 255 })
  submitBy: string;

  @Index()
  @Column({
    type: 'enum',
    enum: MethodSubmitFileLogsEnum,
    default: MethodSubmitFileLogsEnum.CREATED,
  })
  method: MethodSubmitFileLogsEnum;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', name: 'ads_performance_id', length: 255 })
  adsPerformanceId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
