import { PartialType } from '@nestjs/mapped-types';
import { CreateNotulensiUploadDto } from './create-notulensi-upload.dto';

export class UpdateNotulensiUploadDto extends PartialType(CreateNotulensiUploadDto) {}
