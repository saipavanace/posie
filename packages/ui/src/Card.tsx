import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  bordered = true,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-card, #FFFFFF)',
        borderRadius: '16px',
        padding: '24px',
        border: bordered ? '1px solid var(--color-border, #E5E0D8)' : 'none',
        boxShadow: '0 4px 20px -2px rgba(44, 62, 48, 0.05)',
        ...style,
      }}
      className={`posie-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
