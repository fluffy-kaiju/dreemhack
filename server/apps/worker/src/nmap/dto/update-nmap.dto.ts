import { PartialType } from '@nestjs/mapped-types';
import { CreateNmapDto } from './create-nmap.dto';

export class UpdateNmapDto extends PartialType(CreateNmapDto) {}
