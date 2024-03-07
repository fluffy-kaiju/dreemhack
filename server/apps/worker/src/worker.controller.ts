import { Body, Controller, Logger, Post } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ApiTags } from '@nestjs/swagger';
import { RawNmapArgsDto } from './worker.dto';

@ApiTags('Worker')
@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  private readonly log = new Logger(WorkerController.name);

  @Post('/raw')
  async rawArg(@Body() args: RawNmapArgsDto) {
    // generate a id and store in db
    return await this.workerService.runRawArgs(args.params).catch((err) => {
      this.log.error(err);
    });
    return 'ok';
  }
}
