import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CommonHeaderGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey) {
      throw new HttpException('not allowed to access the system', 405);
    }

    if (apiKey != process.env.API_KEY) {
      throw new HttpException('Invalid Key', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
