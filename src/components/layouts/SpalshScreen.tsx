"use client";
import { useRef, useEffect, useState } from 'react';
import '../../styles/splash-screen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000;
   
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
     
      const currentPercentage = Math.round(progress * 100);
      setPercentage(currentPercentage);
     
      if (lineRef.current) {
        lineRef.current.style.width = `${progress * 100}%`;
      }

      if (containerRef.current) {
        containerRef.current.style.background = `var(--brand-color-1)`;
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = `${progress * 0.8}`;
      }
     
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (percentageRef.current) {
            percentageRef.current.style.opacity = '0';
          }
          if (lineRef.current) {
            lineRef.current.style.opacity = '0';
          }
          if (glowRef.current) {
            glowRef.current.style.opacity = '0';
          }
          if (loadingTextRef.current) {
            loadingTextRef.current.style.opacity = '0';
          }
          
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.height = '0vh';
              containerRef.current.style.transformOrigin = 'top';
            }
            
            setTimeout(onComplete, 2000);
          }, 1000);
        }, 500);
      }
    };
   
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="splash-container">
      <div ref={glowRef} className="glow-effect"></div>
      
      <span ref={percentageRef} className="percentage-text">
        {percentage}
        <span className="percentage-symbol">%</span>
      </span>
     
      <div className="progress-container">
        <div ref={lineRef} className="progress-line">
          <div className="progress-shine"></div>
        </div>
        <div className="progress-track"></div>
      </div>
      
      <div ref={loadingTextRef} className="loading-text">
        LOADING
      </div>
    </div>
  );
}