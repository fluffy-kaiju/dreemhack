import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { WorkerGateway } from './worker.gateway';
import { NmapModule } from './nmap/nmap.module';

@Module({
  imports: [NmapModule],
  controllers: [WorkerController],
  providers: [WorkerService, WorkerGateway],
})
export class WorkerModule {}
