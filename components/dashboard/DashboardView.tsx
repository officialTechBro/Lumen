'use client';

import { useState } from 'react';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import UploadFlow from '@/components/dashboard/UploadFlow';
import type { DashboardViewProps } from '@/lib/types';

export default function DashboardView({
  children,
  totalReports,
  trackedSince,
  lastUploadedAt,
}: DashboardViewProps) {
  const [showUpload, setShowUpload] = useState(false);

  if (showUpload) {
    return (
      <UploadFlow
        onBack={() => setShowUpload(false)}
        onDone={() => setShowUpload(false)}
      />
    );
  }

  return (
    <>
      <DashboardPageHeader
        onUpload={() => setShowUpload(true)}
        totalReports={totalReports}
        trackedSince={trackedSince}
        lastUploadedAt={lastUploadedAt}
      />
      <div className="home-grid">
        {children}
      </div>
    </>
  );
}
