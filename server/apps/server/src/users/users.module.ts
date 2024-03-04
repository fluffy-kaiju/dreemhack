import { Module } from '@nestjs/common';
import { UsersControllerService } from './users-controller.service';
import { UsersController } from './users.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersControllerService],
})
export class UsersModule {}
