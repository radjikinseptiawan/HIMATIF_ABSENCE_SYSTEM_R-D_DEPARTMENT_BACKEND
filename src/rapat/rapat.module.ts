import { Module } from '@nestjs/common';
import { RapatService } from './rapat.service';
import { RapatController } from './rapat.controller';

@Module({
  controllers: [RapatController],
  providers: [RapatService],
})
export class RapatModule {}
