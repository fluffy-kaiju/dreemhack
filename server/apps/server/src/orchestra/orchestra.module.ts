import { Module } from '@nestjs/common';
import { OrchestraService } from './orchestra.service';
import { OrchestraGateway } from './orchestra.gateway';
import { WorkersModule } from './workers/workers.module';
import { DbModule } from '@app/db';

@Module({
  providers: [OrchestraGateway, OrchestraService],
  imports: [WorkersModule, DbModule],
})
export class OrchestraModule {}
