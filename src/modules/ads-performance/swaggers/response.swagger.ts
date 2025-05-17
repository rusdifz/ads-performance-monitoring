import { ApiProperty } from '@nestjs/swagger';

import { IErrorData, IGlobalResp } from 'src/common/interfaces';
import { httpStatus } from 'src/common/const';

import {
  CreateAdPerformanceDTO,
  FilterUnderperformingAdsDTO,
} from '../dto/request.dto';
import { ResUnderperformingAdsDTO } from '../dto/response.dto';

export class SwaggerGetUnderperformingAds implements IGlobalResp {
  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    type: [ResUnderperformingAdsDTO],
  })
  data: ResUnderperformingAdsDTO[];

  @ApiProperty({ example: '', description: 'Error message if any' })
  error: string;

  @ApiProperty({
    example: [],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}

export class SwaggerCreatedAdPerformanceSuccess implements IGlobalResp {
  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    type: CreateAdPerformanceDTO,
  })
  data: CreateAdPerformanceDTO;

  @ApiProperty({ example: '', description: 'Error message if any' })
  error: string;

  @ApiProperty({
    example: [],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}

export class SwaggerBadRequestCreateAdPerformance implements IGlobalResp {
  @ApiProperty({ example: httpStatus[400] })
  message: string;

  @ApiProperty({
    example: {},
  })
  data: Record<string, never>;

  @ApiProperty({
    example: 'client not found',
    description: 'Error message if any',
  })
  error: string;

  @ApiProperty({
    example: [
      {
        info: 'contract expired Not Valid',
        message: 'Question Name Duplicate',
      },
    ],
    description: 'List of error details',
  })
  error_data: IErrorData[];
}
