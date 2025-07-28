import { Module } from '@nestjs/common';
import { AnggotaService } from './anggota.service';
import { AnggotaController } from './anggota.controller';

@Module({
  controllers: [AnggotaController],
  providers: [AnggotaService],
})
export class AnggotaModule {}
