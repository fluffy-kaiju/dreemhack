import { Module } from '@nestjs/common';
import { OrchestraService } from './orchestra.service';
import { OrchestraGateway } from './orchestra.gateway';

@Module({
  providers: [OrchestraGateway, OrchestraService],
})
export class OrchestraModule {}
