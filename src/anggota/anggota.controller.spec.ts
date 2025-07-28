import { Test, TestingModule } from '@nestjs/testing';
import { AnggotaController } from './anggota.controller';
import { AnggotaService } from './anggota.service';

describe('AnggotaController', () => {
  let controller: AnggotaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnggotaController],
      providers: [AnggotaService],
    }).compile();

    controller = module.get<AnggotaController>(AnggotaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
