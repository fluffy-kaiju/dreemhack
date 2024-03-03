import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { WorkerGateway } from './worker.gateway';

@Module({
  imports: [],
  controllers: [WorkerController],
  providers: [WorkerService, WorkerGateway],
})
export class WorkerModule {}
