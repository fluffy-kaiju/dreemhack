import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
  @ApiProperty({
    description: 'Id of the job',
    example: '1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Name of the job',
    example: 'Scan ports of a keven server',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Notes for the job',
    example:
      'I want to get revence on keven for being a jerk to me in high school. And so I will scan his server for open ports and exploit them.',
    type: String,
  })
  @IsString()
  description: string;
}

export class WorkerScanPortsJobDto extends JobDto {}
function IsNotEmpty(): (target: JobDto, propertyKey: 'id') => void {
  throw new Error('Function not implemented.');
}
