import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramkerjaDto } from './create-programkerja.dto';

export class UpdateProgramkerjaDto extends PartialType(CreateProgramkerjaDto) {}
