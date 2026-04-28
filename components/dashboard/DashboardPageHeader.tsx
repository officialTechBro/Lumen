'use client';

import { MOCK_USER } from '@/lib/mock-data';
import { daysAgo, getTimeOfDayGreeting } from '@/lib/helpers';
import type { DashboardPageHeaderProps } from '@/lib/types';

export default function DashboardPageHeader({
  onUpload,
  totalReports,
  trackedSince,
  lastUploadedAt,
}: DashboardPageHeaderProps) {
  const firstName = MOCK_USER.fullName.split(' ')[0];

  const metaParts: string[] = [];
  if (lastUploadedAt) {
    const days = daysAgo(lastUploadedAt);
    metaParts.push(`Last upload ${days} ${days === 1 ? 'day' : 'days'} ago`);
  }
  metaParts.push(`${totalReports} ${totalReports === 1 ? 'report' : 'reports'}`);
  if (trackedSince) metaParts.push(`tracked since ${trackedSince}`);

  return (
    <div className="page-head fade d1">
      <div>
        <p className="greet">{getTimeOfDayGreeting()}, {firstName}</p>
        <h1>
          Your health,{' '}
          <span className="italic">in plain English.</span>
        </h1>
        <p className="meta">{metaParts.join(' · ')}</p>
      </div>
      <div className="page-head-ctas">
        <button type="button" className="btn btn-secondary">Share with doctor</button>
        <button type="button" className="btn btn-primary" onClick={onUpload}>
          Upload new report
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 6h7m-3-3 3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
