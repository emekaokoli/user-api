import {
  Column,
  Entity
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'client' })
export class Client extends User {
  @Column({ default: 'https://via.placeholder.com/250' })
  avatar!: string;

  @Column('text', { array: true, nullable: true })
  photos!: string[];
}
