import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { WorkerService } from '../worker.service';
import { Nmap } from '@nmap_wrapper/nmap';

@Injectable()
export class NmapService {
  private readonly log: Logger = new Logger(WorkerService.name);

  async runRawArgs(args: string) {
    const argsArr: string[] = args.split(' ');

    const nmap = new Nmap();

    return await nmap
      .run_param(argsArr, (taskProgress) => {
        this.log.verbose(taskProgress);
        // emit to master
      })
      .catch((err) => {
        this.log.error(err);
        throw new BadGatewayException(err?.message || 'Error running nmap');
      });
  }
}
