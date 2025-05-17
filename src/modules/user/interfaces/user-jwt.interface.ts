import { AdminUserEntity } from '../entities/user.entity';

export interface IJwtUser {
  iat: number;
  user: Partial<AdminUserEntity>;
}
