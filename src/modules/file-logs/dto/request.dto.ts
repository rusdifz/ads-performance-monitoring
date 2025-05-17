import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { FileLogsEntity } from '../entities/file-logs.entitiy';
import { MethodSubmitFileLogsEnum } from '../enums/file-logs.enum';

export class CreateFileLogsDTO implements Partial<FileLogsEntity> {
  @ApiProperty({ example: 'rusdi' })
  @IsNotEmpty()
  @IsString()
  submitBy: string;

  @ApiProperty({ example: 'created' })
  @IsNotEmpty()
  @IsEnum(MethodSubmitFileLogsEnum)
  method: MethodSubmitFileLogsEnum;

  @ApiProperty({ example: 'd5f829fe-82a5-473b-bcfb-c6ea0094f184' })
  @IsNotEmpty()
  @IsUUID()
  adsPerformanceId: string;

  @ApiProperty({ example: 'changes revision' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
