import { Injectable } from '@nestjs/common';
import { CreateOrchestraDto } from './dto/create-orchestra.dto';
import { UpdateOrchestraDto } from './dto/update-orchestra.dto';

@Injectable()
export class OrchestraService {
  create(createOrchestraDto: CreateOrchestraDto) {
    return 'This action adds a new orchestra';
  }

  findAll() {
    return `This action returns all orchestra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orchestra`;
  }

  update(id: number, updateOrchestraDto: UpdateOrchestraDto) {
    return `This action updates a #${id} orchestra`;
  }

  remove(id: number) {
    return `This action removes a #${id} orchestra`;
  }
}
