import { randomBytes } from 'crypto';

export function generateSalt(): string {
  return randomBytes(64).toString('hex');
}
