import { Test, TestingModule } from '@nestjs/testing';
import { AuroraService } from './aurora.service';

describe('AuroraService', () => {
  let service: AuroraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuroraService],
    }).compile();

    service = module.get<AuroraService>(AuroraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
