export type NavItem = {
  id: string;
  label: string;
  count: number | null;
  active: boolean;
};

export type PasswordStrength = 'none' | 'weak' | 'fair' | 'strong';

export type FormState = 'idle' | 'loading' | 'success';

export interface EmailValidation {
  status: 'idle' | 'valid' | 'invalid' | 'taken';
}

export type LoginMode = 'login' | 'forgot' | 'forgot-success';

export type LoginError = null | 'wrong-password' | 'unknown-email' | 'network';

export interface DashboardShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export interface HeroReport {
  title: string;
  lab: string;
  date: string;
  shortDate: string;
  sub: string;
  normal: number;
  watch: number;
  flagged: number;
}

export interface ReportSummary {
  trackedSince: string;
  totalReports: number;
  nextReminder: string;
}

export interface DashboardTopbarProps {
  onToggle: () => void;
}
