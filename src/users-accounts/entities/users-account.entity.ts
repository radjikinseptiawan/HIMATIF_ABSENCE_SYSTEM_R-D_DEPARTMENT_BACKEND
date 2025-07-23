/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  gender: 'Male' | 'Female';

  @Column()
  address: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
