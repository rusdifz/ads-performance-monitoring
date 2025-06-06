import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

import { KpiEnums } from 'src/common/enums/kpi.enums';

export class ResUnderperformingAdsDTO {
  @ApiProperty({ example: '60e60a02-9271-4359-87e9-d16877112864' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'PT Raz Tech' })
  @IsString()
  client: string;

  @ApiProperty({ example: KpiEnums.CTR })
  @IsEnum(KpiEnums)
  kpi_type: KpiEnums;

  @ApiProperty({ example: 0.1 })
  @IsNumber()
  target: number;

  @ApiProperty({ example: 0.05 })
  @IsNumber()
  actual: number;

  @ApiProperty({ example: '2024-10-01' })
  @IsDate()
  start_date: Date;

  @ApiProperty({ example: '2024-10-01' })
  @IsDate()
  end_date: Date;

  @ApiProperty({ example: '2024-10-01' })
  @IsDate()
  created_at: Date;
}

export class ResCreatePerformanceDTO {
  @ApiProperty({ example: '60e60a02-9271-4359-87e9-d16877112864' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'd5f829fe-82a5-473b-bcfb-c6ea0094f184' })
  @IsString()
  clientId: string;

  @ApiProperty({ example: '41e990c7-8f91-43b9-8f62-ff95c3ee43bf' })
  @IsString()
  contractId: string;

  @ApiProperty({ example: 0.3 })
  @IsNumber()
  actualValue: number;

  @ApiProperty({ example: '2025-10-05 08:00;:00' })
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ example: null })
  @IsDate()
  deletedAt?: Date;
}
