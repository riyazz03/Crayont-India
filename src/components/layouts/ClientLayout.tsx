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
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSplashComplete = () => {
    console.log('Splash completed'); 
    setShowSplash(false);
    
    setTimeout(() => {
      setFadeIn(true);
      console.log('Fade in triggered');
    }, 100);
  };

  if (!mounted) {
    return null;
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div 
      style={{ 
        opacity: fadeIn ? 1 : 0,
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