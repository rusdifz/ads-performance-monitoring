import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { httpStatus } from '../const';
import { ResInternalServerErrorSwagger } from './response.swagger';

export function ApiSwaggerCustomHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'api-key',
      example: 'https://rb.gy/1e7y4t',
      examples: {
        'api-key': {
          summary: 'api-key',
          value: 'https://rb.gy/1e7y4t',
        },
      },
      required: true,
    }),
    ApiHeader({
      name: 'Authorization',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMCwidXNlciI6eyJpZCI6IjIiLCJ1c2VybmFtZSI6InJ1c2RpZnoiLCJlbWFpbCI6ImZhdXphbnJ1c2RpMjBAZ21haWwuY29tIiwicm9sZSI6InN0YWZmIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDUtMTdUMDY6MjQ6MzUuNTE5WiJ9fQ.QxIiBsnlCWW6v9YVP5zFA7DFlwQQpq0b2Obb2uktw70',
      examples: {
        Authorization: {
          summary: 'JWT Token',
          value:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMCwidXNlciI6eyJpZCI6IjIiLCJ1c2VybmFtZSI6InJ1c2RpZnoiLCJlbWFpbCI6ImZhdXphbnJ1c2RpMjBAZ21haWwuY29tIiwicm9sZSI6InN0YWZmIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDUtMTdUMDY6MjQ6MzUuNTE5WiJ9fQ.QxIiBsnlCWW6v9YVP5zFA7DFlwQQpq0b2Obb2uktw70',
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
