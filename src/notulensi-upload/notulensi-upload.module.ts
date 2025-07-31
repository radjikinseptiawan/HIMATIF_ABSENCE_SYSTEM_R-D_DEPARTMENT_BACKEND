import { Module } from '@nestjs/common';
import { NotulensiUploadService } from './notulensi-upload.service';
import { NotulensiUploadController } from './notulensi-upload.controller';

@Module({
  controllers: [NotulensiUploadController],
  providers: [NotulensiUploadService],
})
export class NotulensiUploadModule {}
