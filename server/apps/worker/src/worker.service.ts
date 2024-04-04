import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WorkerService {
  private readonly log: Logger = new Logger(WorkerService.name);
}
