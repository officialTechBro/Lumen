import type { PasswordStrength } from '@/lib/types';

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'none';
  const hasLength = password.length >= 8;
  const hasMixed = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const score = [hasLength, hasMixed, hasNumber, hasSymbol].filter(Boolean).length;
  if (score <= 1) return 'weak';
  if (score <= 2) return 'fair';
  return 'strong';
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function daysAgo(dateString: string): number {
  const ms = Date.now() - new Date(dateString).getTime();
  return Math.floor(ms / 86_400_000);
}

export function getTimeOfDayGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export function getInitials(fullName: string): string {
  return fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
