/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersAccountDto } from './dto/create-users-account.dto';
import { UpdateUsersAccountDto } from './dto/update-users-account.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersAccountsService {
  constructor(
    private supabaseService: SupabaseService,
    private hashService: HashService,
  ) {}

  async create(createUsersAccountDto: CreateUsersAccountDto) {
    try {
      const {
        email,
        password,
        fullname,
        gender,
        phone,
        address,
        role,
        departement,
        birth_date,
        username,
      } = createUsersAccountDto;

      const { data: authData, error: authError } =
        await this.supabaseService.client.auth.signUp({
          email,
          password,
        });

      if (authError) {
        throw new HttpException(
          `Failed add account, ${authError.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const userId = authData.user?.id;
      const passwordHashed = await this.hashService.hashPassword(password);
      if (!userId) {
        throw new HttpException(
          'Sign up suceeded but user_id not found!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { data: profileData, error: profileError } =
        await this.supabaseService.client.from('profile').insert([
          {
            user_id: userId,
            email,
            password: passwordHashed,
            fullname,
            gender,
            username,
            phone,
            address,
            role,
            departement,
            birth_date: new Date(birth_date).toISOString().split('T')[0],
          },
        ]);

      if (profileError) {
        throw new HttpException(
          {
            message: 'Failed to insert into user_profile',
            supabaseError: {
              message: profileError.message,
              details: profileError.details,
              hint: profileError.hint,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        message: 'Success add data',
        data: profileData,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: `Failed running request`, error: error },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll() {
    const { data, error } = await this.supabaseService.client
      .from('anggota')
      .select();

    if (error) {
      throw new HttpException('Failed to show data', HttpStatus.BAD_REQUEST);
    }
    return `This action returns all usersAccounts ${data?.toString()}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersAccount`;
  }

  async update(id: string, updateUsersAccountDto: UpdateUsersAccountDto) {
    const {
      fullname,
      username,
      email,
      password,
      gender,
      phone,
      address,
      role,
      birth_date,
      departement,
      user_id,
      photoProfile,
    } = updateUsersAccountDto;

    const { data, error } = await this.supabaseService.client
      .from('profile')
      .update({
        fullname,
        username,
        email,
        password,
        gender,
        phone,
        address,
        role,
        birth_date,
        departement,
        photoProfile,
      })
      .eq('id', user_id);
    return `This action updates a #${id} usersAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersAccount`;
  }
}
