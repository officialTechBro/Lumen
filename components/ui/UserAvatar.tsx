import { getInitials } from '@/lib/helpers';

type UserAvatarProps = {
  image: string | null;
  fullName: string | null;
  size?: number;
};

export function UserAvatar({ image, fullName, size = 32 }: UserAvatarProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={fullName ?? 'User'}
        width={size}
        height={size}
        style={{
          display: 'block',
          width: size,
          height: size,
          borderRadius: '999px',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '999px',
        background: 'var(--forest)',
        color: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: size * 0.4,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {getInitials(fullName)}
    </span>
  );
}
