import { Test, TestingModule } from '@nestjs/testing';
import { ProgramkerjaController } from './programkerja.controller';
import { ProgramkerjaService } from './programkerja.service';

describe('ProgramkerjaController', () => {
  let controller: ProgramkerjaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramkerjaController],
      providers: [ProgramkerjaService],
    }).compile();

    controller = module.get<ProgramkerjaController>(ProgramkerjaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
