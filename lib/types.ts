export type PasswordStrength = 'none' | 'weak' | 'fair' | 'strong';

export type FormState = 'idle' | 'loading' | 'success';

export interface EmailValidation {
  status: 'idle' | 'valid' | 'invalid' | 'taken';
}

export type LoginMode = 'login' | 'forgot' | 'forgot-success';

export type LoginError = null | 'wrong-password' | 'unknown-email' | 'network';
