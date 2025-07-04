"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ScrollSmootherWrapper from '../layouts/ScrollSmoother';

const SplashScreen = dynamic(() => import('../layouts/SpalshScreen'), {
  ssr: false
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShowSplash(true);
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
    return (
      <div style={{ minHeight: '100vh', width: '100%' }}>
        <ScrollSmootherWrapper>
          <div style={{ minHeight: '100vh' }}>
            {children}
          </div>
        </ScrollSmootherWrapper>
      </div>
    );
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div 
      style={{ 
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 0.8s ease-out',
        willChange: 'opacity',
        position: 'relative',
        width: '100%'
      }}
    >
      <ScrollSmootherWrapper>
        <div style={{ minHeight: '100vh' }}>
          {children}
        </div>
      </ScrollSmootherWrapper>
    </div>
  );
}