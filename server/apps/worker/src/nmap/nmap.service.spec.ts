import { Test, TestingModule } from '@nestjs/testing';
import { NmapService } from './nmap.service';

describe('NmapService', () => {
  let service: NmapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NmapService],
    }).compile();

    service = module.get<NmapService>(NmapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
