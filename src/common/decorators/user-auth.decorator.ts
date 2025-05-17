import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtUser } from 'src/modules/user/interfaces/user-jwt.interface';

export const AdminAuth = createParamDecorator(
  (key: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request?.headers?.user_data;

    return user as IJwtUser;
  },
);
