import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JobLogsEntity } from '../entities/job-logs.entity';
import { StatusJobLogsEnum } from '../enums/job-logs.enum';

export class CreateJobLogsDTO implements Partial<JobLogsEntity> {
  @ApiProperty({ example: 'script scheduler eksternal data' })
  @IsNotEmpty()
  @IsString()
  jobType: string;

  @ApiProperty({ example: 'created' })
  @IsNotEmpty()
  @IsEnum(StatusJobLogsEnum)
  status: StatusJobLogsEnum;

  @ApiPropertyOptional({ example: 'd5f829fe-82a5-473b-bcfb-c6ea0094f184' })
  @IsOptional()
  @IsString()
  relation_id?: string;

  @ApiPropertyOptional({ example: '2025-05-10 08:00:00' })
  @IsOptional()
  @IsString()
  start_time?: Date;

  @ApiPropertyOptional({ example: '2025-05-10 08:00:00' })
  @IsOptional()
  @IsString()
  end_time?: Date;

  @ApiProperty({ example: '2 hour' })
  @IsNotEmpty()
  @IsString()
  duration: string;

  @ApiPropertyOptional({ example: 'success scheduler' })
  @IsOptional()
  @IsString()
  description: string;
}
