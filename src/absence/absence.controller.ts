import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Post()
  create(@Body() createAbsenceDto: CreateAbsenceDto) {
    return this.absenceService.create(createAbsenceDto);
  }

  @Get()
  findAll() {
    return this.absenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.absenceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbsenceDto: UpdateAbsenceDto) {
    return this.absenceService.update(id, updateAbsenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.absenceService.remove(+id);
  }
}
