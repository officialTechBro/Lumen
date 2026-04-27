'use client';

import { useState, useCallback } from 'react';
import type { UploadStage, UploadFlowProps } from '@/lib/types';

const STEPS = [
  { n: 1, title: 'Uploading', sub: 'Encrypted · 2.4MB', activeAt: 0, doneAt: 30 },
  { n: 2, title: 'Parsing the file', sub: 'Extracted 21 markers from 6 pages', activeAt: 30, doneAt: 65 },
  { n: 3, title: 'Reading each result', sub: 'Matching reference ranges, drafting explanations', activeAt: 65, doneAt: 95 },
  { n: 4, title: 'Drafting your questions', sub: 'For flagged markers only', activeAt: 95, doneAt: 100 },
];

const FLAGGED_ROWS = [
  { status: 'flag' as const, name: 'Vitamin D', code: '25(OH)D', val: '24', unit: 'ng/mL', ref: 'Ref 30–100' },
  { status: 'flag' as const, name: 'LDL Cholesterol', code: 'LDL-C', val: '142', unit: 'mg/dL', ref: 'Ref < 100' },
  { status: 'watch' as const, name: 'Ferritin', code: 'Iron stores', val: '38', unit: 'ng/mL', ref: 'Ref 30–300' },
];

const SUMMARY_CELLS = [
  { label: 'Markers', value: '21', cls: '' },
  { label: 'Normal', value: '18', cls: 'leaf' },
  { label: 'Watch', value: '1', cls: 'watch' },
  { label: 'Flagged', value: '2', cls: 'flagged' },
];

function stepClass(step: typeof STEPS[0], progress: number): string {
  if (progress >= step.doneAt) return 'up-step done';
  if (progress >= step.activeAt) return 'up-step active';
  return 'up-step';
}

export default function UploadFlow({ onBack, onDone }: UploadFlowProps) {
  const [stage, setStage] = useState<UploadStage>('idle');
  const [progress, setProgress] = useState(0);

  const start = useCallback(() => {
    setStage('uploading');
    setProgress(0);
    setTimeout(() => { setProgress(30); setStage('parsing'); }, 600);
    setTimeout(() => { setProgress(65); setStage('reading'); }, 1500);
    setTimeout(() => { setProgress(95); setStage('questions'); }, 2700);
    setTimeout(() => { setProgress(100); }, 3100);
    setTimeout(() => { setStage('done'); }, 3500);
  }, []);

  const reset = useCallback(() => {
    setStage('idle');
    setProgress(0);
  }, []);

  return (
    <div className="upload-wrap fade d1">
      <div className="upload-head">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to dashboard
        </button>
        <span className="upload-step-label">Upload · Step 1 of 1</span>
      </div>

      <h1 className="upload-title">
        Upload a report.{' '}
        <span className="italic">We&apos;ll read it.</span>
      </h1>
      <p className="upload-sub">
        PDF, image, or phone photo. Quest, Labcorp, Kaiser, Mayo, or any major lab. Typical read time is under fifteen seconds.
      </p>

      {stage === 'idle' && (
        <div
          className="dropzone"
          onClick={start}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && start()}
        >
          <div className="dz-ico">
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 13V4" stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 8L10 4L14 8" stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 14V16H16V14" stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="dz-title">Drop your lab report here</p>
          <p className="dz-sub">Or click to choose a file · PDF, PNG, JPG up to 20MB</p>
          <div className="dz-trust">
            <span>· Encrypted in transit</span>
            <span>· Deleted on request</span>
            <span>· HIPAA-aligned</span>
          </div>
          <button
            type="button"
            className="btn btn-primary dz-cta"
            onClick={e => { e.stopPropagation(); start(); }}
          >
            Simulate upload
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6h7m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {stage !== 'idle' && stage !== 'done' && (
        <div className="upload-progress">
          <div className="up-file">
            <div className="up-file-ico">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="4" y="2" width="12" height="16" rx="2" stroke="var(--ink-soft)" strokeWidth="1.5" />
                <path d="M7 7h6M7 10h6M7 13h4" stroke="var(--ink-dim)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="up-file-info">
              <p className="up-file-name">quest-results-2026-03-14.pdf</p>
              <p className="up-file-size">2.4 MB · Quest Diagnostics · Page 1 of 6</p>
            </div>
            <span className="up-file-pct">{Math.round(progress)}%</span>
          </div>

          <div className="up-bar">
            <div className="up-bar-fill" style={{ width: progress + '%' }} />
          </div>

          <div className="up-steps">
            {STEPS.map(step => (
              <div key={step.n} className={stepClass(step, progress)}>
                <div className="us-dot">
                  {progress >= step.doneAt ? '✓' : step.n}
                </div>
                <div>
                  <p className="us-t">{step.title}</p>
                  <p className="us-s">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="up-foot">You can leave this page — we&apos;ll email when it&apos;s ready.</p>
        </div>
      )}

      {stage === 'done' && (
        <div className="upload-done">
          <div className="ud-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11" stroke="var(--forest)" strokeWidth="1.8" />
              <path d="M7 12L11 16L17 9" stroke="var(--forest)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Read complete · 11.4 seconds</span>
          </div>

          <h2 className="ud-title">
            Your annual panel is{' '}
            <span className="italic">ready.</span>
          </h2>
          <p className="ud-sub">
            21 markers read. Two flagged for a conversation with your doctor. One worth keeping an eye on. The rest look good.
          </p>

          <div className="ud-summary">
            {SUMMARY_CELLS.map(cell => (
              <div key={cell.label} className="ud-cell">
                <p className="ud-label">{cell.label}</p>
                <p className={`ud-v${cell.cls ? ' ' + cell.cls : ''}`}>{cell.value}</p>
              </div>
            ))}
          </div>

          <div className="ud-flagged">
            <div className="ud-flag-head">Flagged markers</div>
            {FLAGGED_ROWS.map(row => (
              <div key={row.code} className="ud-flag-row">
                <span className={`pill ${row.status}`}>
                  {row.status === 'flag' ? 'Flag' : 'Watch'}
                </span>
                <div className="ud-flag-name">
                  {row.name}
                  <span className="ud-flag-code">{row.code}</span>
                </div>
                <div className="ud-flag-val">
                  <strong>{row.val}</strong>
                  <span>{row.unit} · {row.ref}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ud-ctas">
            <button type="button" className="btn btn-primary" onClick={onDone}>
              Open full report
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 6h7m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="btn btn-secondary" onClick={reset}>
              Upload another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
