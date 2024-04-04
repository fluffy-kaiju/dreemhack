import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RawNmapArgsDto {
  @ApiProperty({
    description: 'Arguments to pass to nmap',
    example: '-T4 -A -p 1-1000 scanme.nmap.org',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  params: string;
}
