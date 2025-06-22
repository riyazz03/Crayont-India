"use client";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    timeline
      .fromTo(lineRef.current, {
        width: "0%"
      }, {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100);
          setPercentage(progress);
        }
      })
      .to(lineRef.current, {
        height: "0px",
        duration: 0.8,
        ease: "power2.inOut"
      }, "+=0.3")
      .to(percentageRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <>
      <style jsx>{`
        .splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .percentage-text {
          font-size: 1.5rem;
          font-weight: 300;
          color: #ffffff;
          letter-spacing: 0.1em;
          font-family: var(--font-inter), 'Arial', sans-serif;
        }

        .progress-container {
          width: 300px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
        }

        .progress-line {
          height: 100%;
          background: linear-gradient(90deg, #ffffff, #cccccc);
          width: 0%;
          border-radius: 1px;
        }

        @media (max-width: 768px) {
          .progress-container {
            width: 250px;
          }
          
          .percentage-text {
            font-size: 1.25rem;
          }
        }
      `}</style>
      <div ref={containerRef} className="splash-container">
        <div className="splash-content">
          <span ref={percentageRef} className="percentage-text">
            {percentage}%
          </span>
          <div className="progress-container">
            <div ref={lineRef} className="progress-line" />
          </div>
        </div>
      </div>
    </>
  );
}