import { Test, TestingModule } from '@nestjs/testing';
import { WorkerDbService } from './worker.db.service';

describe('WorkerDbService', () => {
  let service: WorkerDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerDbService],
    }).compile();

    service = module.get<WorkerDbService>(WorkerDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
