import { isValidPassword } from '@/lib/auth';

export function hashPassword(password: string) {
  return password;
}

export function createToken(payload: any) {
  return JSON.stringify(payload);
}
