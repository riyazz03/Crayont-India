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
  const [isReady, setIsReady] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSplashComplete = () => {
    console.log('Splash completed'); 
    setShowSplash(false);
    
    setIsReady(true);
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
        transform: fadeIn ? 'translateY(0)' : 'translateY(0px)',
        transition: 'opacity 0.8s ease-out, transform 0.6s ease-out',
        willChange: 'opacity, transform',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <ScrollSmootherWrapper>
        {children}
      </ScrollSmootherWrapper>
    </div>
  );
}