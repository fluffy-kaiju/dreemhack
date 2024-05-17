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

  @ApiProperty({
    description: 'Name of the scan',
    example: 'Pentest of x.com',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Notes or description of the scan',
    example: 'Scan all subdomain of the x.com to prepare pentest',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
