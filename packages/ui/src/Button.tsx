import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontWeight: 600,
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.18s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 14px', fontSize: '0.85rem' },
    md: { padding: '10px 20px', fontSize: '0.95rem' },
    lg: { padding: '14px 28px', fontSize: '1.05rem' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-primary, #2C3E30)',
      color: '#FAF8F5',
      borderColor: 'var(--color-primary, #2C3E30)',
    },
    secondary: {
      backgroundColor: 'var(--color-secondary, #8A9A86)',
      color: '#1E2620',
      borderColor: 'var(--color-secondary, #8A9A86)',
    },
    tertiary: {
      backgroundColor: 'var(--color-tertiary, #C67D6E)',
      color: '#FAF8F5',
      borderColor: 'var(--color-tertiary, #C67D6E)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary, #2C3E30)',
      borderColor: 'var(--color-border, #E5E0D8)',
    },
  };

  return (
    <button
      style={{ ...baseStyle, ...sizeStyles[size], ...variantStyles[variant], ...style }}
      className={`posie-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
