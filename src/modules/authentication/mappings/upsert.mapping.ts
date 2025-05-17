import { ReqRegisterDTO } from '../dto/request.dto';
import { AdminUserEntity } from 'src/modules/user/entities/user.entity';

export async function mapReqRegisterToDb(
  payload: ReqRegisterDTO,
  hashPassword: string,
): Promise<Partial<AdminUserEntity>> {
  return {
    username: payload.username,
    email: payload.email,
    password: hashPassword,
    role: payload.role,
    isActive: true,
  };
}
