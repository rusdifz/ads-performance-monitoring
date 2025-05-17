import { ApiProperty } from '@nestjs/swagger';

// import { ResAdminDTO, ResUserDTO } from 'src/modules/users/dto/response.dto';
import { IJwtUser } from 'src/modules/user/interfaces/user-jwt.interface';
import { UserRoleEnum } from 'src/modules/user/enums/user.enum';

export class ResJWTUser implements IJwtUser {
  iat: number;
  user: {
    id: number;
    username: string;
    email: string;
    role: UserRoleEnum;
    isActive: boolean;

    createdAt: Date;
  };
}

export class ResRegisterUserDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'rusdifz' })
  username: string;

  @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
  email: string;

  @ApiProperty({ example: UserRoleEnum.ADMIN })
  role: UserRoleEnum;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2025-05-10 08:00:00' })
  createdAt?: Date;

  @ApiProperty({ example: '2025-05-10 08:00:00' })
  updatedAt?: Date;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  })
  token: string;
}
