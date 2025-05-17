import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { StatusJobLogsEnum } from '../enums/job-logs.enum';

@Entity({ name: 'job_logs' })
export class JobLogsEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  relation_id: string;

  @Column({ type: 'varchar', length: 100 })
  job_type: string;

  @Index()
  @Column({
    type: 'enum',
    enum: StatusJobLogsEnum,
    default: StatusJobLogsEnum.SUCCESS,
  })
  status: StatusJobLogsEnum;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'varchar', length: 50 })
  duration: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
