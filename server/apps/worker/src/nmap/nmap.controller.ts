import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NmapService } from './nmap.service';
import { CreateNmapDto } from './dto/create-nmap.dto';
import { UpdateNmapDto } from './dto/update-nmap.dto';

@Controller('nmap')
export class NmapController {
  constructor(private readonly nmapService: NmapService) {}

  @Post()
  create(@Body() createNmapDto: CreateNmapDto) {
    return this.nmapService.create(createNmapDto);
  }

  @Get()
  findAll() {
    return this.nmapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nmapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNmapDto: UpdateNmapDto) {
    return this.nmapService.update(+id, updateNmapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nmapService.remove(+id);
  }
}
