import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

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
