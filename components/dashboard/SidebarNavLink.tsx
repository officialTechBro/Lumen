'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface Props {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  count?: number | null;
  exact?: boolean;
}

export default function SidebarNavLink({ href, icon, children, count, exact }: Props) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={`navbtn${isActive ? ' active' : ''}`}>
      <span className="ico">{icon}</span>
      {children}
      {count != null && <span className="count">{count}</span>}
    </Link>
  );
}
