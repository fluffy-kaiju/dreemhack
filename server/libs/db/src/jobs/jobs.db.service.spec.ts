import { Test, TestingModule } from '@nestjs/testing';
import { JobsDbService } from './jobs.db.service';

describe('JobsService', () => {
  let service: JobsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsDbService],
    }).compile();

    service = module.get<JobsDbService>(JobsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
