/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersAccountDto } from './dto/create-users-account.dto';
import { UpdateUsersAccountDto } from './dto/update-users-account.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersAccountsService {
  findbyId: any;
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
      .from('profile')
      .select(' * ');

    if (error || !data) {
      throw new HttpException(
        'Not have an user accounts!',
        HttpStatus.NOT_FOUND,
      );
    }
    const users = data.map((user) => {
      if (user.photoProfile) {
        try {
          if (typeof user.photoProfile === 'string') {
            const parsed = JSON.parse(user.photoProfile);
            if (parsed?.data && Array.isArray(parsed.data)) {
              user.photoProfile = Buffer.from(parsed.data);
            } else if (
              typeof user.photoProfile === 'object' &&
              Array.isArray(user.photoProfile.data)
            ) {
              user.photoProfile = Buffer.from(user.photoProfile.data);
            }
          }
        } catch (error) {
          console.error(
            'Failed to parse photoProfile for user: ',
            user.user_id,
          );
          user.photoProfile = null;
        }
      }
    });
    return {
      data,
    };
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.client
      .from('profile')
      .select('*')
      .eq('user_id', id)
      .single();

    if (error || !data) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // ✅ Fix: handle photoProfile buffer decode
    if (data.photoProfile) {
      try {
        // Jika disimpan dalam format string JSON
        if (typeof data.photoProfile === 'string') {
          const parsed = JSON.parse(data.photoProfile);
          if (parsed?.data && Array.isArray(parsed.data)) {
            data.photoProfile = Buffer.from(parsed.data);
          }
        }

        // Jika sudah object (misalnya Supabase langsung parsing)
        else if (
          typeof data.photoProfile === 'object' &&
          Array.isArray(data.photoProfile.data)
        ) {
          data.photoProfile = Buffer.from(data.photoProfile.data);
        }
      } catch (err) {
        console.error('Error parsing photoProfile buffer:', err);
        data.photoProfile = null;
      }
    }

    return {
      data,
    };
  }

  async update(
    id: string,
    updateUsersAccountDto: UpdateUsersAccountDto,
    file: Express.Multer.File,
  ) {
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
        photoProfile: updateUsersAccountDto.photoProfile?.toJSON(),
      })
      .eq('user_id', id);
    if (error) {
      throw new HttpException(
        { message: 'Failed to update user', error },
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('Buffer type:', typeof updateUsersAccountDto.photoProfile); // HARUS object
    console.log(
      'Is Buffer?',
      Buffer.isBuffer(updateUsersAccountDto.photoProfile),
    ); // HARUS true
    console.log('Length:', updateUsersAccountDto.photoProfile?.length); // HARUS > 0

    return {
      data,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} usersAccount`;
  }
}
