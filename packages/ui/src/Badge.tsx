import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'sage' | 'rose' | 'muted';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sage',
  className = '',
  style,
  ...props
}) => {
  const badgeStyles: Record<string, React.CSSProperties> = {
    sage: {
      backgroundColor: '#D8DFD6',
      color: '#2C3E30',
    },
    rose: {
      backgroundColor: '#F5E3DF',
      color: '#B36B5C',
    },
    muted: {
      backgroundColor: '#F0ECE6',
      color: '#68736B',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        ...badgeStyles[variant],
        ...style,
      }}
      className={`posie-badge ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
