import Link from 'next/link';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { SignOutButton } from '@/components/dashboard/SignOutButton';

type SidebarProfileProps = {
  image: string | null;
  fullName: string | null;
  email: string | null;
  isPro: boolean;
};

export default function SidebarProfile({ image, fullName, email, isPro }: SidebarProfileProps) {
  const planLabel = isPro ? 'Lumen+' : 'Free plan';

  return (
    <div className="profile">
      <Link href="/dashboard/settings" className="profile-link" title={email ?? undefined}>
        <UserAvatar image={image} fullName={fullName} size={32} />
        <div className="profile-info">
          <span className="profile-name">{fullName ?? 'My Account'}</span>
          <span className="profile-plan">{planLabel}</span>
        </div>
      </Link>
      <SignOutButton />
    </div>
  );
}
