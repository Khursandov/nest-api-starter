import * as bcrypt from 'bcrypt';

export function hashPassword(password: string, round: number): string {
  const salt = bcrypt.genSaltSync(round);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
