/* eslint-disable @typescript-eslint/no-unused-vars */
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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProgramkerjaService } from './programkerja.service';
import { CreateProgramkerjaDto } from './dto/create-programkerja.dto';
import { UpdateProgramkerjaDto } from './dto/update-programkerja.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('programkerja')
export class ProgramkerjaController {
  constructor(private readonly programkerjaService: ProgramkerjaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('notulensi_rapat'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    createProgramkerjaDto: CreateProgramkerjaDto,
  ) {
    const buffer = file?.buffer ?? null;
    const dto: CreateProgramkerjaDto = {
      ketua_pelaksana: Number(body.ketua_pelaksana),
      sekertaris_pelaksana: Number(body.sekertaris_pelaksana),
      sekertaris_pelaksana2: Number(body.sekertaris_pelaksana2),
      bendahara_pelaksana: Number(body.bendahara_pelaksana),
      bendahara_pelaksana2: Number(body.bendahara_pelaksana2),
      status: body.status,
      nama_program: body.nama_program,
      tanggal_pelaksanaan: new Date(body.tanggal_pelaksanaan),
      notulensi_rapat: buffer || null,
      id_program: 0,
    };
    return this.programkerjaService.create(dto);
  }

  @Get()
  findAll() {
    return this.programkerjaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programkerjaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgramkerjaDto: UpdateProgramkerjaDto,
  ) {
    return this.programkerjaService.update(+id, updateProgramkerjaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programkerjaService.remove(+id);
  }
}
