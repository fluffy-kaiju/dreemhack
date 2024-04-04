import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { NmapModule } from './nmap/nmap.module';
import { WorkerClientService } from './worker.client.service';
import { ConfigModule } from '@nestjs/config';
import { SubdomainModule } from './subdomain/subdomain.module';
import * as Joi from 'joi';

@Module({
  imports: [
    NmapModule,
    SubdomainModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        WORKER_PORT: Joi.number().default(3000),
        MASTER_WS: Joi.string().required(),
        WORKER_ID: Joi.string().required(),
      }),
    }),
    SubdomainModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService, WorkerClientService],
})
export class WorkerModule {}
