import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { OrchestraModule } from './orchestra/orchestra.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [JobsModule, OrchestraModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
