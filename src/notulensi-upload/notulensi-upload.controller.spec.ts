import { Test, TestingModule } from '@nestjs/testing';
import { NotulensiUploadController } from './notulensi-upload.controller';
import { NotulensiUploadService } from './notulensi-upload.service';

describe('NotulensiUploadController', () => {
  let controller: NotulensiUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotulensiUploadController],
      providers: [NotulensiUploadService],
    }).compile();

    controller = module.get<NotulensiUploadController>(NotulensiUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
