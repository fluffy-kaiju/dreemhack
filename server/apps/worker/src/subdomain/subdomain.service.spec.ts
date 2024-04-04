import { Test, TestingModule } from '@nestjs/testing';
import { SubdomainService } from './subdomain.service';

describe('SubdomainService', () => {
  let service: SubdomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdomainService],
    }).compile();

    service = module.get<SubdomainService>(SubdomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
