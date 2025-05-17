import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import { PaginationDTO } from 'src/common/dto';
import { KpiEnums } from 'src/common/enums/kpi.enums';

import { AdsPerformanceEntity } from '../entities/ads-performance.entity';
import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { ContractEntity } from 'src/modules/contract/entities/contract.entity';

import { IsExist } from 'src/common/decorators/is-exists.decorator';

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

export class CreateAdPerformanceDTO implements Partial<AdsPerformanceEntity> {
  @ApiProperty({ example: 'd5f829fe-82a5-473b-bcfb-c6ea0094f184' })
  @IsNotEmpty()
  @IsUUID()
  @IsExist(ClientEntity, 'id', { message: 'id client not found' })
  clientId: string;

  @ApiProperty({ example: '41e990c7-8f91-43b9-8f62-ff95c3ee43bf' })
  @IsNotEmpty()
  @IsUUID()
  @IsExist(ContractEntity, 'id', { message: 'id contract not found' })
  contractId: string;

  @ApiProperty({ example: 0.3 })
  @IsNotEmpty()
  @IsNumber()
  actual_value: number;
}
