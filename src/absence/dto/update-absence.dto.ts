import { PartialType } from '@nestjs/mapped-types';
import { CreateAbsenceDto } from './create-absence.dto';

export class UpdateAbsenceDto extends PartialType(CreateAbsenceDto) {}
