import { Module } from '@nestjs/common';
import { OrchestraService } from './orchestra.service';
import { OrchestraGateway } from './orchestra.gateway';
import { WorkersModule } from './workers/workers.module';

@Module({
  providers: [OrchestraGateway, OrchestraService],
  imports: [WorkersModule],
})
export class OrchestraModule {}
