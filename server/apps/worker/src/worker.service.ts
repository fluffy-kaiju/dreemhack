import { Injectable, Logger } from '@nestjs/common';
import { NmapService } from './nmap/nmap.service';
import { SubdomainService } from './subdomain/subdomain.service';

@Injectable()
export class WorkerService {
  private readonly log: Logger = new Logger(WorkerService.name);

  constructor(
    private readonly nmap: NmapService,
    private readonly subdomain: SubdomainService,
  ) {}

  //   async scanPorts() {
  //     this.nmap.runRawArgs;
  //   }
}
