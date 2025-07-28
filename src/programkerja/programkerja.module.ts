import { Module } from '@nestjs/common';
import { ProgramkerjaService } from './programkerja.service';
import { ProgramkerjaController } from './programkerja.controller';

@Module({
  controllers: [ProgramkerjaController],
  providers: [ProgramkerjaService],
})
export class ProgramkerjaModule {}
