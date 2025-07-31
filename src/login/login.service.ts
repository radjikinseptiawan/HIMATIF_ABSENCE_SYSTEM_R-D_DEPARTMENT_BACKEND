/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class LoginService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto;

    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new HttpException(
        {
          message: 'Login failed!',
          errir: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { user, session } = data;

    return {
      user,
      session,
    };
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
