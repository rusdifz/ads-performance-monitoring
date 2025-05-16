import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IJwtn } from 'src/modules/authentication/interfaces/jwt.interface';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException(`You Don't Have Access`);
    }

    try {
      const userData = jwt.verify(token, process.env.JWT_KEY) as IJwtAdmin;

      request.headers['user_data'] = userData;

      return true;
    } catch (error) {
      throw new UnauthorizedException('unauthorized - jwt not provided');
    }
  }
}
