import { Controller, Post, Body } from '@nestjs/common';
import { NmapService } from './nmap.service';
import { ApiTags } from '@nestjs/swagger';
import { RawNmapArgsDto } from './nmap.dto';

@ApiTags('Nmap')
@Controller('nmap')
export class NmapController {
  constructor(private readonly nmapService: NmapService) {}

  @Post('/raw')
  async rawArg(@Body() args: RawNmapArgsDto) {
    // generate a id and store in db
    return await this.nmapService.runRawArgs(args.params);
  }
}
