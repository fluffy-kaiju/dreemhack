import { Test, TestingModule } from '@nestjs/testing';
import { WorkerModelService } from './worker.model.service';

describe('WorkerModelService', () => {
  let service: WorkerModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerModelService],
    }).compile();

    service = module.get<WorkerModelService>(WorkerModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
