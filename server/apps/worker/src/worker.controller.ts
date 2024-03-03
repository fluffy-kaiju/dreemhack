import { Controller, Get } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  async getHello() {
    return await this.workerService.getHello();
  }
}
