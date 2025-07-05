"use client";
import { useState, useEffect } from 'react';
import SplashScreen from '../layouts/SpalshScreen';
import ScrollSmootherWrapper from '../layouts/ScrollSmoother';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setContentReady(true);
    }, 100);
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div 
      className="main-content-wrapper"
      style={{ 
        opacity: contentReady ? 1 : 0,
        transition: 'opacity 0.8s ease-out',
        willChange: 'opacity'
      }}
    >
      <ScrollSmootherWrapper>
        {children}
      </ScrollSmootherWrapper>
    </div>
  );
}