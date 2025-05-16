import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

import { UserRoleEnum } from '../enums/user.enum';

@Entity({ name: 'admin' })
export class AdminUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true, type: 'varchar', length: 100 })
  username: string;

  @Index()
  @Column({ unique: true, type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.STAFF,
  })
  role: UserRoleEnum;

  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
