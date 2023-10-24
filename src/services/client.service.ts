import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { Client } from '../entity/client.entity';
import { dataSource } from '../utils/connection';
import { OmittedUser, user } from './interface/user.interface';

export async function validatePassword({
  email,
  password,
}: user): Promise<boolean | OmittedUser> {
  const foundUser = await dataSource
    .getRepository(Client)
    .findOne({ where: { email } });

  if (!foundUser) {
    return false; // User not found
  }

  const isValidPassword = await bcrypt.compare(password, foundUser.password);

  if (!isValidPassword) {
    return false; // Invalid password
  }

  return omit(foundUser, ['password']); // Valid user, return without password
}

export async function findUser(email: string) {
  const userDetails = await dataSource.getRepository(Client).findOne({
    where: {
      email: email,
    },
  });
  return omit(userDetails, ['password']);
}
