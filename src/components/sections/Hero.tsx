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
  const titleRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const splitText = (element: HTMLElement) => {
      const text = element.textContent || '';
      element.innerHTML = '';

      return text.split('').map((char) => { 
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(100px)';
        span.style.opacity = '0';
        span.className = bebasNeue.className;
        span.style.fontFamily = 'inherit';
        span.style.fontSize = 'inherit';
        span.style.fontWeight = 'inherit';
        span.style.lineHeight = 'inherit';
        span.style.letterSpacing = 'inherit';
        element.appendChild(span);
        return span;
      });
    };

    const initializeElements = () => {
      if (!titleRef.current || !highlightRef.current || !descriptionRef.current || !buttonContainerRef.current) return;

      gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
      gsap.set(buttonContainerRef.current, { opacity: 0, y: 20 });

      const titleChars = splitText(titleRef.current);
      const highlightChars = splitText(highlightRef.current);

      const masterTimeline = gsap.timeline();

      masterTimeline
        .to(titleChars, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.04,
          ease: "power2.out"
        })
        .to(highlightChars, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.04,
          ease: "power2.out"
        }, "-=0.6")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4")
        .to(buttonContainerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");
    };

    initializeElements();

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
    <div className="blue-overlay"></div>
    <div className="green-overlay"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className={`hero-title ${bebasNeue.className}`}>
            <div className="hero-title-line">
              <span ref={titleRef} className={bebasNeue.className}>Creativity without</span>
            </div>
            <div className="hero-title-line">
              <span ref={highlightRef} className={`hero-title-highlight ${bebasNeue.className}`}>
                compromise
              </span>
            </div>
          </h1>
          <p ref={descriptionRef} className="hero-description">
            We partner with forward-thinking companies to create digital products that drive results and deliver exceptional user experiences.
          </p>
          <div ref={buttonContainerRef} className="hero-action">
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