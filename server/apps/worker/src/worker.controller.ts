import { Controller, Get, Logger, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Worker')
@Controller()
export class WorkerController {
  constructor() {}

  private readonly log = new Logger(WorkerController.name);

  @Get('/')
  @Redirect('/doc')
  async index() {}
}
