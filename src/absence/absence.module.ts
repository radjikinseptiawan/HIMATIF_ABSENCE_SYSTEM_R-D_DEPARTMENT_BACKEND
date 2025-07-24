import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';

@Module({
  controllers: [AbsenceController],
  providers: [AbsenceService],
})
export class AbsenceModule {}
