import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { IErrorData, IGlobalResp } from '../interfaces';
import { Type } from 'class-transformer';

export class ResInternalServerErrorSwagger implements IGlobalResp {
  @ApiProperty({ example: 'Internal Server Error' })
  message: string;

  @ApiProperty({ example: {} })
  data: Record<string, never>;

  @ApiProperty({
    example: 'Internal Server Error',
    description: 'Error message ',
  })
  error?: string;

  @ApiProperty({
    example: [
      {
        info: 'Server Error',
        message: 'Server Error',
        data: '',
      },
    ],
    description: 'List of error details',
  })
  error_data?: IErrorData[];
}
export class SwaggerDeleteData implements IGlobalResp {
  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({ example: {} })
  data: Record<string, never>;

  @ApiProperty({ example: '', description: 'Error message if any' })
  error: string;

  @ApiProperty({
    example: [],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}
