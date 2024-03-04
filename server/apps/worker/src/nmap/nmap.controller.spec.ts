import { Test, TestingModule } from '@nestjs/testing';
import { NmapController } from './nmap.controller';
import { NmapService } from './nmap.service';

describe('NmapController', () => {
  let controller: NmapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NmapController],
      providers: [NmapService],
    }).compile();

    controller = module.get<NmapController>(NmapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
