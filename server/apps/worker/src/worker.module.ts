import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { WorkerGateway } from './worker.gateway';
import { NmapModule } from './nmap/nmap.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [NmapModule, JobsModule],
  controllers: [WorkerController],
  providers: [WorkerService, WorkerGateway],
})
export class WorkerModule {}
