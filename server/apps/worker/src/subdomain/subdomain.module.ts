import { Module } from '@nestjs/common';
import { SubdomainService } from './subdomain.service';
import { SubdomainController } from './subdomain.controller';

@Module({
  controllers: [SubdomainController],
  providers: [SubdomainService],
  exports: [SubdomainService],
})
export class SubdomainModule {}
