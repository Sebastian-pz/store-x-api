import * as bcrypt from 'bcrypt';

export default async function comparePasswords(
  userPassword: string,
  dbPassword: string
) {
  const compare = await bcrypt.compare(userPassword, dbPassword);
  return compare;
}
