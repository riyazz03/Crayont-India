"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../../styles/hero.css';

// Import your actual Bebas Neue font
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

interface HeroProps {
  onContactClick: () => void;
}

interface GridCell {
  opacity: number;
  targetOpacity: number;
  scale: number;
  targetScale: number;
  hue: number;
}

interface Dimensions {
  width: number;
  height: number;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  // Grid configuration
  const GRID_SIZE: number = 20;
  const CURSOR_RADIUS: number = 120;
  const ANIMATION_SPEED: number = 0.1;

  useEffect(() => {
    const handleResize = (): void => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Canvas grid animation
  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Grid setup
    const cols: number = Math.ceil(dimensions.width / GRID_SIZE);
    const rows: number = Math.ceil(dimensions.height / GRID_SIZE);
    
    // Grid state
    const grid: GridCell[][] = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = { 
          opacity: 0, 
          targetOpacity: 0,
          scale: 1,
          targetScale: 1,
          hue: 220
        };
      }
    }

    let mouseX: number = -1000;
    let mouseY: number = -1000;
    let animationId: number;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = (): void => {
      mouseX = -1000;
      mouseY = -1000;
    };

    // Animation loop
    const animate = (): void => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update grid based on mouse position
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cellX: number = j * GRID_SIZE + GRID_SIZE / 2;
          const cellY: number = i * GRID_SIZE + GRID_SIZE / 2;
          
          const distance: number = Math.sqrt(
            Math.pow(mouseX - cellX, 2) + Math.pow(mouseY - cellY, 2)
          );
          
          if (distance <= CURSOR_RADIUS) {
            const intensity: number = 1 - (distance / CURSOR_RADIUS);
            const easedIntensity: number = intensity * intensity * (3 - 2 * intensity);
            
            grid[i][j].targetOpacity = easedIntensity * 0.9;
            grid[i][j].targetScale = 1 + easedIntensity * 0.2;
          } else {
            grid[i][j].targetOpacity = 0;
            grid[i][j].targetScale = 1;
          }

          // Smooth interpolation
          grid[i][j].opacity += (grid[i][j].targetOpacity - grid[i][j].opacity) * ANIMATION_SPEED;
          grid[i][j].scale += (grid[i][j].targetScale - grid[i][j].scale) * ANIMATION_SPEED;

          // Draw cell if visible
          if (grid[i][j].opacity > 0.01) {
            const cellSize: number = (GRID_SIZE - 4) * grid[i][j].scale; // Smaller cells with gaps
            const x: number = j * GRID_SIZE + GRID_SIZE / 2 - cellSize / 2;
            const y: number = i * GRID_SIZE + GRID_SIZE / 2 - cellSize / 2;

            // Draw border box with your brand color
            ctx.strokeStyle = `rgba(0, 119, 255, ${grid[i][j].opacity})`;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(x, y, cellSize, cellSize);

            // Add subtle glow
            ctx.shadowColor = 'rgba(0, 119, 255, 0.3)';
            ctx.shadowBlur = 8 * grid[i][j].scale;
            ctx.strokeRect(x, y, cellSize, cellSize);
            ctx.shadowBlur = 0;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners
    const heroElement = heroSectionRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [dimensions, GRID_SIZE, CURSOR_RADIUS, ANIMATION_SPEED]);

  // Text animation
  useEffect(() => {
    const splitText = (element: HTMLElement): HTMLSpanElement[] => {
      const text: string = element.textContent || '';
      element.innerHTML = '';

      return text.split('').map((char: string): HTMLSpanElement => { 
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

    const initializeElements = (): void => {
      if (!titleRef.current || !highlightRef.current || !descriptionRef.current || !buttonContainerRef.current) return;

      gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
      gsap.set(buttonContainerRef.current, { opacity: 0, y: 20 });

      const titleChars: HTMLSpanElement[] = splitText(titleRef.current);
      const highlightChars: HTMLSpanElement[] = splitText(highlightRef.current);

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

    const timer: NodeJS.Timeout = setTimeout(initializeElements, 100);
    return () => clearTimeout(timer);
  }, []);

  // Button hover effects
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent): void => {
      if (!circleRef.current || !buttonRef.current || !arrowRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x: number = e.clientX - rect.left;
      const y: number = e.clientY - rect.top;

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

    const handleMouseLeave = (): void => {
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
    <section ref={heroSectionRef} className="hero-section">
      {/* Canvas Grid Background */}
      <canvas
        ref={canvasRef}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
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
};

export default Hero;