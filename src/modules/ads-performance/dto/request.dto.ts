import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

import { PaginationDTO } from 'src/common/dto';
import { KpiEnums } from 'src/common/enums/kpi.enums';
import { AdsPerformanceEntity } from '../entities/ads-performance.entity';

export class FilterUnderperformingAdsDTO extends PaginationDTO {
  @ApiProperty({ example: 0.03 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  kpi_target: number;

  @ApiProperty({ example: '60e60a02-9271-4359-87e9-d16877112864' })
  @ValidateIf((o) => !o.contract_id)
  @IsNotEmpty({ message: 'client id or contract id not empty' })
  @IsString()
  client_id: string;

  @ApiProperty({ example: '60e60a02-9271-4359-87e9-d16877112864' })
  @ValidateIf((o) => !o.client_id)
  @IsNotEmpty({ message: 'client id or contract id not empty' })
  @IsString()
  contract_id: string;

  @ApiPropertyOptional({ example: KpiEnums.CTR })
  @IsEnum(KpiEnums)
  @IsOptional()
  kpi_type: KpiEnums;

  @ApiPropertyOptional({ example: '2024-10-01' })
  @IsDate()
  @IsOptional()
  start_date: Date;

  @ApiPropertyOptional({ example: '2024-10-01' })
  @IsDate()
  @IsOptional()
  end_date: Date;

  @ApiPropertyOptional({ example: '2024' })
  @IsString()
  @IsOptional()
  year: string;

  @ApiPropertyOptional({ example: '10' })
  @IsString()
  @IsOptional()
  month: string;

  @ApiPropertyOptional({ example: '01' })
  @IsString()
  @IsOptional()
  date: string;
}

export class CreateAdPerformance implements Partial<AdsPerformanceEntity> {
  @ApiProperty({ example: '' })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  @IsString()
  contractId: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  @IsNumber()
  actual_value: number;
}
