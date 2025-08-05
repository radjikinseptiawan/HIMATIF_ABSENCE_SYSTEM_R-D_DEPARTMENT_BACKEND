/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
  Res,
} from '@nestjs/common';
import { UsersAccountsService } from './users-accounts.service';
import { CreateUsersAccountDto } from './dto/create-users-account.dto';
import { UpdateUsersAccountDto } from './dto/update-users-account.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
@Controller('users-accounts')
export class UsersAccountsController {
  constructor(private readonly usersAccountsService: UsersAccountsService) {}

  @Post()
  create(@Body() createUsersAccountDto: CreateUsersAccountDto) {
    return this.usersAccountsService.create(createUsersAccountDto);
  }

  @Get()
  findAll() {
    return this.usersAccountsService.findAll();
  }

  @Get(':id/photo')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersAccountsService.findOne(id);
    if (!user || !user.data.photoProfile) {
      return res.status(404).send('Image not found');
    }
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'inline');
    return res.send(user.data.photoProfile);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photoProfile'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateUsersAccountDto,
  ) {
    const buffer = file?.buffer ?? null;
    const dto: UpdateUsersAccountDto = {
      fullname: body.fullname,
      username: body.username,
      email: body.email,
      password: body.password,
      gender: body.gender,
      phone: body.phone,
      address: body.address,
      role: body.role,
      birth_date: body.birth_date,
      departement: body.departement,
      photoProfile: buffer || null,
      user_id: body.user_id,
    };
    console.log(file);
    console.log(dto);
    console.log(id);
    return this.usersAccountsService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersAccountsService.remove(+id);
  }
}
