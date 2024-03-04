import { Test, TestingModule } from '@nestjs/testing';
import { OrchestraGateway } from './orchestra.gateway';
import { OrchestraService } from './orchestra.service';

describe('OrchestraGateway', () => {
  let gateway: OrchestraGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrchestraGateway, OrchestraService],
    }).compile();

    gateway = module.get<OrchestraGateway>(OrchestraGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
