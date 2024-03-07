import { Test, TestingModule } from '@nestjs/testing';
import { JobsModelService } from './jobs.model.service';

describe('JobsModelService', () => {
  let service: JobsModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsModelService],
    }).compile();

    service = module.get<JobsModelService>(JobsModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
