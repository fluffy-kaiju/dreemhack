import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
