import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    title: 'The nmap parameters to run',
    description:
      'The parameters for the nmap command, note that there is no validation for the parameters',
    example: '-T4 -A -p 1-10 scanme.nmap.org',
  })
  params: string;

  @ApiPropertyOptional({
    title: 'The name of the job',
    description: 'The name of the job, if not provided it will be generated',
    example: 'My first job',
  })
  name?: string;

  @ApiPropertyOptional({
    title: 'The description of the job',
    description: 'The description of the job, if not provided it will be empty',
    example: 'This is my first job',
  })
  description?: string;

  //TODO remove and check the user id from the token
  @ApiPropertyOptional({
    title: 'The user id',
    description: 'The user id, if not provided it will be empty',
    example: '3513b3d0-390b-4287-9f59-8e3f3f5b8bc5',
  })
  userId?: string;
}
