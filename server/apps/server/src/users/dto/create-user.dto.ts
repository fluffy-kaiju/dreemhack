import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    required: true,
    example: 'Yvon La Valée',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
