import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';

export const metadata: Metadata = {
  title: 'Posie — Modern Beauty & Wellness Studio',
  description: 'Glow up without the headache. Booking, treatment menus, and policies made simple.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
