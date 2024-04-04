import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewSubdomainScanDto {
  @ApiProperty({
    description: 'The domain to scan',
    example: 'example.com',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  domainName: string;
}
