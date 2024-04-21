import { Test, TestingModule } from '@nestjs/testing';
import { AuroraController } from './aurora.controller';

describe('AuroraController', () => {
  let controller: AuroraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuroraController],
    }).compile();

    controller = module.get<AuroraController>(AuroraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
