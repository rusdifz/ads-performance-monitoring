import { ApiProperty } from '@nestjs/swagger';

import { IErrorData, IGlobalResp } from 'src/common/interfaces';
import { httpStatus } from 'src/common/const';

import { ResRegisterUserDTO } from '../dto/response.dto';

export class SwaggerRegister implements IGlobalResp {
  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    type: ResRegisterUserDTO,
  })
  data: ResRegisterUserDTO;

  @ApiProperty({ example: '', description: 'Error message if any' })
  error: string;

  @ApiProperty({
    example: [],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}

export class SwaggerLogin implements IGlobalResp {
  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  })
  data: string;

  @ApiProperty({ example: '', description: 'Error message if any' })
  error: string;

  @ApiProperty({
    example: [],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}

export class SwaggerChangePassword implements IGlobalResp {
  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  })
  data: string;

  @ApiProperty({ example: '', description: 'Error message if any' })
  error: string;

  @ApiProperty({
    example: [],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}

export class SwaggerBadRequest implements IGlobalResp {
  @ApiProperty({ example: httpStatus[400] })
  message: string;

  @ApiProperty({
    example: {},
  })
  data: Record<string, never>;

  @ApiProperty({
    example: 'Question Name Duplicate',
    description: 'Error message if any',
  })
  error: string;

  @ApiProperty({
    example: [
      {
        info: 'Question A',
        message: 'Question Name Duplicate',
      },
    ],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}
