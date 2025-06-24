"use client";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface ButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className = "" }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (circleRef.current && arrowRef.current) {
      gsap.set(circleRef.current, {
        scale: 0,
        opacity: 0
      });
      gsap.set(arrowRef.current, {
        rotation: 0
      });
      setIsInitialized(true);
    }

    const handleMouseEnter = (e: MouseEvent) => {
      if (!circleRef.current || !buttonRef.current || !arrowRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.killTweensOf([circleRef.current, arrowRef.current]);

      gsap.set(circleRef.current, {
        left: x,
        top: y,
        scale: 0,
        opacity: 1
      });

      gsap.to(circleRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(arrowRef.current, {
        rotation: -45,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      if (!circleRef.current || !arrowRef.current) return;

      gsap.killTweensOf([circleRef.current, arrowRef.current]);

      gsap.to(circleRef.current, {
        scale: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const button = buttonRef.current;

    if (button) {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <>
      <style jsx>{`
        .custom-button {
          position: relative;
          overflow: hidden;
          border: 0.5px solid #ffffff7a;
          color: white;
          padding: 8px 20px;
          border-radius: 12px;
          font-weight: 500;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.2s ease;
          opacity: ${isInitialized ? 1 : 0};
        }

        .custom-button:hover {
          color: white;
          border: 0.5px solid var(--brand-color-1);
        }

        .button-circle {
          position: absolute;
          width: 350px;
          height: 350px;
          background: var(--brand-color-1);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          pointer-events: none;
        }

        .button-text {
          position: relative;
          z-index: 10;
        }

        .button-arrow {
          position: relative;
          z-index: 10;
          width: 16px;
          height: 16px;
          transform: rotate(0deg);
        }
      `}</style>
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`custom-button ${className}`}
      >
        <div ref={circleRef} className="button-circle" />
        <span className="button-text">{children}</span>
        <svg
          ref={arrowRef}
          className="button-arrow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </>
  );
}