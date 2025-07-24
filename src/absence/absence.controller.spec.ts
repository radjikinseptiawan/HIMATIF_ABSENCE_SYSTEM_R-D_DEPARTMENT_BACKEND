import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceController } from './absence.controller';
import { AbsenceService } from './absence.service';

describe('AbsenceController', () => {
  let controller: AbsenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenceController],
      providers: [AbsenceService],
    }).compile();

    controller = module.get<AbsenceController>(AbsenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
