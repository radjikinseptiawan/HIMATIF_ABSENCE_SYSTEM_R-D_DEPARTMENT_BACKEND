import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersAccountsService } from './users-accounts.service';
import { CreateUsersAccountDto } from './dto/create-users-account.dto';
import { UpdateUsersAccountDto } from './dto/update-users-account.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersAccountDto: UpdateUsersAccountDto,
  ) {
    return this.usersAccountsService.update(+id, updateUsersAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersAccountsService.remove(+id);
  }
}
