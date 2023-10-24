import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

// Using ! asserts that the property will be assigned a value later during construction,
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 25 })
  @IsString()
  @Length(2, 25)
  firstName!: string;

  @Column({ length: 25 })
  @IsString()
  @Length(2, 25)
  lastName!: string;

  @Column({ unique: true, type: 'text' })
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  @Length(6, 50, {
    message: 'Password must be 6 - 50 characters long',
  })
  password!: string;

  @Column({ default: 'user' })
  @IsString()
  role!: string;

  @Column({ default: true })
  @IsBoolean()
  isActive!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @Column()
  fullName!: string;
}