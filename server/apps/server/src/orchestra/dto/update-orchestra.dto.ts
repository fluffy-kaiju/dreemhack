import { PartialType } from '@nestjs/mapped-types';
import { CreateOrchestraDto } from './create-orchestra.dto';

export class UpdateOrchestraDto extends PartialType(CreateOrchestraDto) {
  id: number;
}
