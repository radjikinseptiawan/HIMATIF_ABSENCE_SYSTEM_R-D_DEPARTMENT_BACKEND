import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersAccountDto } from './create-users-account.dto';

export class UpdateUsersAccountDto extends PartialType(CreateUsersAccountDto) {
  fullname: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  phone: number;
  address: string;
  role: string;
  birth_date: Date;
  departement: string;
  photoProfile: Buffer | null;
  user_id: string;
}
