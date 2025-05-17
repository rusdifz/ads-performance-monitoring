import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

import { IsUnique } from 'src/common/decorators';

import { Match } from './validator/match.decorator';
import { UserRoleEnum } from 'src/modules/user/enums/user.enum';
import { AdminUserEntity } from 'src/modules/user/entities/user.entity';

export class ReqRegisterDTO {
  @ApiProperty({ example: 'rusdifz' })
  @IsNotEmpty()
  @IsString()
  @IsUnique(AdminUserEntity, 'username', {
    message: 'username already exist',
  })
  username: string;

  @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(AdminUserEntity, 'email', { message: 'email  already exist' })
  email: string;

  @ApiProperty({ example: 'Tester123!' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiPropertyOptional({ example: UserRoleEnum.ADMIN })
  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'value role not found' })
  role: UserRoleEnum;
}

export class ReqChangePasswordDTO {
  @ApiProperty({ example: 'rusdifz' })
  @ValidateIf((o) => !o.email)
  @IsNotEmpty({ message: 'username or email not empty' })
  @IsString()
  username?: string;

  @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
  @ValidateIf((o) => !o.username)
  @IsNotEmpty({ message: 'username or email not empty' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Tester123!' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Tester123!' })
  @IsNotEmpty()
  @IsStrongPassword()
  @Match('password', {
    message: 'Re-enter password harus sama dengan password',
  })
  reenter_password: string;
}

export class ReqLoginDTO {
  @ApiProperty({ example: 'rusdifz' })
  @ValidateIf((o) => !o.email)
  @IsNotEmpty({ message: 'username or email not empty' })
  @IsString()
  username?: string;

  @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
  @ValidateIf((o) => !o.username)
  @IsNotEmpty({ message: 'username or email not empty' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Tester123!' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
