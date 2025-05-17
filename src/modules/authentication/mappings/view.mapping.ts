import { ResJWTUser } from '../dto/response.dto';
import { AdminUserEntity } from 'src/modules/user/entities/user.entity';

export async function mapResJwt(db: AdminUserEntity): Promise<ResJWTUser> {
  return {
    iat: 100,
    user: {
      id: db.id,
      username: db.username,
      email: db.email,
      role: db.role,
      isActive: db.isActive,
      createdAt: db.createdAt,
    },
  };
}
