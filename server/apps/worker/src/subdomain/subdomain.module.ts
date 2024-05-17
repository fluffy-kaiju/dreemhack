import { Module } from '@nestjs/common';
import { SubdomainService } from './subdomain.service';
import { SubdomainController } from './subdomain.controller';
import { DbModule } from '@app/db';

@Module({
  imports: [DbModule],
  controllers: [SubdomainController],
  providers: [SubdomainService],
  exports: [SubdomainService],
})
export class SubdomainModule {}
