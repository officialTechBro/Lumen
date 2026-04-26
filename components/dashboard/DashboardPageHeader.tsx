'use client';

import { MOCK_USER, MOCK_LATEST_REPORT } from '@/lib/mock-data';
import { daysAgo, getTimeOfDayGreeting } from '@/lib/helpers';

export default function DashboardPageHeader() {
  const firstName = MOCK_USER.fullName.split(' ')[0];
  const days = daysAgo(MOCK_LATEST_REPORT.uploadedAt);

  return (
    <div className="page-head fade d1">
      <div>
        <p className="greet">{getTimeOfDayGreeting()}, {firstName}</p>
        <h1>
          Your health,{' '}
          <span className="italic">in plain English.</span>
        </h1>
        <p className="meta">
          Last upload {days} {days === 1 ? 'day' : 'days'} ago
          {' · '}{MOCK_LATEST_REPORT.title} from {MOCK_LATEST_REPORT.lab}
        </p>
      </div>
      <div className="page-head-ctas">
        <button className="btn btn-secondary">Share with doctor</button>
        <button className="btn btn-primary">
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
