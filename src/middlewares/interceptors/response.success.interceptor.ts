import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IGlobalResp } from 'src/common/interfaces';

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const query = ctx.getRequest().query;
    const method = ctx.getRequest().method;

    return next.handle().pipe(
      map(async (response) => {
        const resp = await response;
        const statusCode = method === 'POST' ? 201 : 200;

        context.switchToHttp().getResponse().status(statusCode);

        // default response, data is directly on resp
        const responseBody: IGlobalResp = {
          message: 'success',
          data: resp?.data ?? resp,
          pagination: undefined,
          error: null,
          error_data: [],
        };

        // if no data, return null on response data
        if (!resp) {
          return responseBody;
        }

        // list response, resp has data & paginataion, so the data is on resp.data
        if (Array.isArray(resp.data)) {
          // assign query page with default or requested value
          let page = query.page ? parseInt(query.page) : 1;

          // assign query limit with default or requested value
          let limit = query.limit ? parseInt(query.limit) : 5;

          // build pagination response
          let pagination = {
            page: page,
            total: resp.count,
            total_page: Math.ceil(resp.count / limit),
          };

          // overwrite httpSuccess variable
          responseBody.data = resp.data;

          // assign pagination property to response object
          Object.assign(responseBody, { pagination });
        }

        return responseBody;
      }),
    );
  }
}
