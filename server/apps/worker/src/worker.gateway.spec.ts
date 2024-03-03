import { Test, TestingModule } from '@nestjs/testing';
import { WorkerGateway } from './worker.gateway';

describe('WorkerGateway', () => {
  let gateway: WorkerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerGateway],
    }).compile();

    gateway = module.get<WorkerGateway>(WorkerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
