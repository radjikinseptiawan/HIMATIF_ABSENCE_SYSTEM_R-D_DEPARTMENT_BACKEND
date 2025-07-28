import { PartialType } from '@nestjs/mapped-types';
import { CreateAnggotaDto } from './create-anggota.dto';

export class UpdateAnggotaDto extends PartialType(CreateAnggotaDto) {}
