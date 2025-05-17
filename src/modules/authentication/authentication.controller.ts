import { Body, Controller, Post, Version } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiHeader,
} from '@nestjs/swagger';

import { httpStatus } from 'src/common/const';
import {
  ReqChangePasswordDTO,
  ReqLoginDTO,
  ReqRegisterDTO,
} from './dto/request.dto';

import {
  SwaggerBadRequest,
  SwaggerChangePassword,
  SwaggerLogin,
  SwaggerRegister,
} from './swaggers/response.swagger';

import { AuthenticationService } from './authentication.service';

@Controller('authentication')
@ApiHeader({
  name: 'api-key',
  example: 'razfz-s4lw0a1',
  examples: {
    'api-key': {
      summary: 'api-key',
      value: 'razfz-s4lw0a1',
    },
  },
  required: true,
})
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @ApiOperation({
    summary: 'endpoint register user',
  })
  @ApiCreatedResponse({
    description: httpStatus[201],
    type: SwaggerRegister,
  })
  @ApiBadRequestResponse({
    description: httpStatus[400],
    type: SwaggerBadRequest,
  })
  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  async reqiesterUser(@Body() body: ReqRegisterDTO) {
    return await this.service.registerUser(body);
  }

  @ApiOperation({
    summary: 'endpoint login user',
  })
  @ApiCreatedResponse({
    description: httpStatus[201],
    type: SwaggerLogin,
  })
  @ApiBadRequestResponse({
    description: httpStatus[400],
    type: SwaggerBadRequest,
  })
  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async loginUser(@Body() body: ReqLoginDTO) {
    return await this.service.login(body);
  }

  @ApiOperation({
    summary: 'endpoint change password user',
  })
  @ApiCreatedResponse({
    description: httpStatus[201],
    type: SwaggerChangePassword,
  })
  @ApiBadRequestResponse({
    description: httpStatus[400],
    type: SwaggerBadRequest,
  })
  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('change-password')
  async changePasswordUser(@Body() body: ReqChangePasswordDTO) {
    return await this.service.changePassword(body);
  }
}
