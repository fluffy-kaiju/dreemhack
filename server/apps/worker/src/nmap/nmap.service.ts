import { Injectable } from '@nestjs/common';
import { CreateNmapDto } from './dto/create-nmap.dto';
import { UpdateNmapDto } from './dto/update-nmap.dto';

@Injectable()
export class NmapService {
  create(createNmapDto: CreateNmapDto) {
    return 'This action adds a new nmap';
  }

  findAll() {
    return `This action returns all nmap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nmap`;
  }

  update(id: number, updateNmapDto: UpdateNmapDto) {
    return `This action updates a #${id} nmap`;
  }

  remove(id: number) {
    return `This action removes a #${id} nmap`;
  }
}
