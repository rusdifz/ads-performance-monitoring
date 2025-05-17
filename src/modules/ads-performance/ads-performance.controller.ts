import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import {
  ApiSwaggerCustomHeader,
  ApiSwaggerInternalServerError,
} from 'src/common/swaggers';
import { httpStatus } from 'src/common/const';
import { AuthAdminGuard } from 'src/middlewares';

import {
  CreateAdPerformanceDTO,
  FilterUnderperformingAdsDTO,
} from './dto/request.dto';
import {
  SwaggerBadRequestCreateAdPerformance,
  SwaggerCreatedAdPerformanceSuccess,
  SwaggerGetUnderperformingAds,
} from './swaggers/response.swagger';

import { AdsPerformanceService } from './ads-performance.service';
import { IJwtUser } from '../user/interfaces/user-jwt.interface';
import { AdminAuth } from 'src/common/decorators';

@Controller('')
@UseGuards(AuthAdminGuard)
@ApiSwaggerCustomHeader()
@ApiSwaggerInternalServerError()
export class AdsPerformanceController {
  constructor(private readonly service: AdsPerformanceService) {}

  @ApiOperation({
    summary: 'endpoint get underperformance ads',
  })
  @ApiOkResponse({
    description: httpStatus[200],
    type: SwaggerGetUnderperformingAds,
  })
  @ApiInternalServerErrorResponse()
  @Version('1')
  @Get('underperforming-ads')
  async getUnderperformingAds(@Query() query: FilterUnderperformingAdsDTO) {
    return await this.service.getUnderperformingAds(query);
  }

  @ApiOperation({
    summary: 'endpoint Input data performa iklan baru (bisa batch)',
  })
  @ApiCreatedResponse({
    description: httpStatus[201],
    type: SwaggerCreatedAdPerformanceSuccess,
  })
  @ApiBadRequestResponse({
    description: httpStatus[400],
    type: SwaggerBadRequestCreateAdPerformance,
  })
  @Version('1')
  @Post('ad-performances')
  async updateStatus(
    @AdminAuth() admin: IJwtUser, // use this to get user data from header
    @Body() body: CreateAdPerformanceDTO,
  ) {
    return await this.service.createPerformanceAds(body, admin);
  }
}
