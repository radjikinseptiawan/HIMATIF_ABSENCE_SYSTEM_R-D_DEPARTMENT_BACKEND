/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NotulensiUploadService } from './notulensi-upload.service';
import { CreateNotulensiUploadDto } from './dto/create-notulensi-upload.dto';
import { UpdateNotulensiUploadDto } from './dto/update-notulensi-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notulensi-upload')
export class NotulensiUploadController {
  constructor(
    private readonly notulensiUploadService: NotulensiUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const buffer = file.buffer;
    const dto: CreateNotulensiUploadDto = {
      judul: body.judul,
      announcement: buffer,
    };
    return this.notulensiUploadService.create(dto);
  }

  @Get()
  findAll() {
    return this.notulensiUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notulensiUploadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotulensiUploadDto: UpdateNotulensiUploadDto,
  ) {
    return this.notulensiUploadService.update(+id, updateNotulensiUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notulensiUploadService.remove(+id);
  }
}
