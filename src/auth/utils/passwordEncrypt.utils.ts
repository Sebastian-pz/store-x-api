import * as bcrypt from 'bcrypt';
import DEFAULT_SALT from './defaultSalt';

export default function encryptPassword(userPassword: string): string {
  const encryptedPassword = bcrypt.hashSync(userPassword, DEFAULT_SALT);
  return encryptedPassword;
}
