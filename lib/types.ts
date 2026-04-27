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

export type UploadStage = 'idle' | 'uploading' | 'parsing' | 'reading' | 'questions' | 'done';

export interface DashboardPageHeaderProps {
  onUpload: () => void;
}

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

export interface FlaggedMarkerDelta {
  dir: 'up' | 'down';
  amount: number;
  period: string;
}

export interface FlaggedMarker {
  id: string;
  name: string;
  code: string;
  status: 'flag' | 'watch';
  value: number;
  unit: string;
  refLow: number | null;
  refHigh: number | null;
  refLabel: string;
  delta: FlaggedMarkerDelta;
  trendValues: number[];
  plainEnglish: string;
  doctorQuestion: string;
}

export interface TrendCell {
  id: string;
  name: string;
  unit: string;
  values: number[];
  refLow: number;
  refHigh: number;
  current: number;
  status: 'flag' | 'watch' | 'ok';
}

export interface DashboardViewProps {
  children: React.ReactNode;
}

export interface UploadFlowProps {
  onBack: () => void;
  onDone: () => void;
}

export interface ReportRow {
  id: string;
  title: string;
  lab: string;
  date: string;
  reportCode: string;
  markers: number;
  flagged: number;
  watch: number;
  badge?: 'Latest' | 'First';
}
