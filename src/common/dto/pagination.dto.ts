import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDTO {
  @ApiPropertyOptional({ example: 'created_at' })
  @IsOptional()
  @IsString()
  sort?: string = 'created_at';

  @ApiPropertyOptional({ example: 'desc' })
  @IsOptional()
  @IsString()
  order?: string = 'desc';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit: number = 10;
}
