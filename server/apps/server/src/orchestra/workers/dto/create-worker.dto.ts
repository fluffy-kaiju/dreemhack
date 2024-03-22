import { EWorkerStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(EWorkerStatus)
  @IsNotEmpty()
  status: EWorkerStatus;
}
