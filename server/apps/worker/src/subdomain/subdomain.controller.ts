import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubdomainService } from './subdomain.service';
import { NewSubdomainScanDto } from './subdomain.dto';

@Controller('subdomain')
export class SubdomainController {
  constructor(private readonly subdomainService: SubdomainService) {}

  @Post()
  create(@Body() newSubdomainScan: NewSubdomainScanDto) {
    return this.subdomainService.create(newSubdomainScan.domainName);
  }

  @Get()
  findAll() {
    return this.subdomainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subdomainService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubdomainDto: UpdateSubdomainDto,
  ) {
    return this.subdomainService.update(+id, updateSubdomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subdomainService.remove(+id);
  }
}
