"use client";
import { Bebas_Neue } from 'next/font/google';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/hero.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
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
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className={`hero-title ${bebasNeue.className}`}>
            Creativity without
            <span className={`hero-title-highlight ${bebasNeue.className}`}>
              compromise
            </span>
          </h1>
          <p className="hero-description">
            We partner with forward-thinking companies to create digital products that drive results and deliver exceptional user experiences.
          </p>
          <div className="hero-action">
            <button
              ref={buttonRef}
              onClick={onContactClick}
              className="hero-button"
            >
              <div ref={circleRef} className="hero-button-circle" />
              <span className="hero-button-text">Start Your Project</span>
              <svg
                ref={arrowRef}
                className="hero-button-arrow"
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
          </div>
        </div>
      </div>
    </section>
  );
}