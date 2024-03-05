import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
