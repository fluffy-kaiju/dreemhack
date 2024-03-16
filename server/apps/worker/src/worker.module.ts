import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { WorkerGateway } from './worker.gateway';
import { NmapModule } from './nmap/nmap.module';
import { WorkerClientService } from './worker.client.service';

@Module({
  imports: [NmapModule],
  controllers: [WorkerController],
  providers: [WorkerService, WorkerGateway, WorkerClientService],
})
export class WorkerModule {}
