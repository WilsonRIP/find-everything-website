'use client';

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/theme-provider';
import './styles/global.css';
import { useThemeManager } from '../lib/hooks/useThemeManager';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { isDark, mounted } = useThemeManager();

  React.useEffect(() => {
    // Initial theme setup from localStorage or system preference
    const root = document.documentElement;
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    let currentThemeIsDark = false;

    if (savedTheme === 'dark') {
      root.classList.add('dark');
      currentThemeIsDark = true;
    } else if (savedTheme === 'light') {
      root.classList.remove('dark');
      currentThemeIsDark = false;
    } else {
      currentThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (currentThemeIsDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    // Background image is now handled by global.css
  }, []);

  // This useEffect was for dynamically changing blend mode, 
  // but we'll rely on global.css and a theme-friendly SVG for now.
  // React.useEffect(() => {
  //   if (mounted) {
  //     document.body.style.backgroundBlendMode = isDark ? "overlay" : "normal";
  //   }
  // }, [isDark, mounted]);

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Add ColorSchemeScript to prevent flash of wrong theme */}
      </head>
      <body 
        className={`flex min-h-screen w-full flex-col antialiased ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip‑link for keyboard users & screen readers */}
          <a
            href="#content"
            className={`sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 rounded px-3 py-2 ${isDark ? 'bg-primary text-white' : 'bg-primary text-white'}`}
          >
            Skip to content
          </a>

          <Navbar />

          <main id="content" className="flex-1">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
