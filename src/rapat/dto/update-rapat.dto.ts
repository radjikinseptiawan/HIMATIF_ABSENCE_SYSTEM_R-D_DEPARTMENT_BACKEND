import { PartialType } from '@nestjs/mapped-types';
import { CreateRapatDto } from './create-rapat.dto';

export class UpdateRapatDto extends PartialType(CreateRapatDto) {}
