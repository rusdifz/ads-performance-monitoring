import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { httpStatus } from '../const';
import { ResInternalServerErrorSwagger } from './response.swagger';

export function ApiSwaggerCustomHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'api-key',
      example: 'razfz-s4lw0a1',
      examples: {
        'api-key': {
          summary: 'api-key',
          value: 'razfz-s4lw0a1',
        },
      },
      required: true,
    }),
    ApiHeader({
      name: 'Authorization',
      example: '',
      examples: {
        Authorization: {
          summary: 'JWT Token',
          value: '',
        },
      },
      required: true,
    }),
  );
}

export function ApiSwaggerInternalServerError() {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description: httpStatus[500].toLowerCase(),
      type: ResInternalServerErrorSwagger,
    }),
  );
}
