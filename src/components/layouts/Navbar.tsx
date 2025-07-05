"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import '../../styles/navbar.css';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCircleRef = useRef<HTMLDivElement>(null);
  const mobileArrowRef = useRef<SVGSVGElement>(null);
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

    if (mobileCircleRef.current && mobileArrowRef.current) {
      gsap.set(mobileCircleRef.current, {
        scale: 0,
        opacity: 0
      });
      gsap.set(mobileArrowRef.current, {
        rotation: 0
      });
    }

    const handleMouseEnter = (e: MouseEvent, circleEl: HTMLDivElement, arrowEl: SVGSVGElement, buttonEl: HTMLButtonElement) => {
      if (!circleEl || !buttonEl || !arrowEl) return;

      const rect = buttonEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.killTweensOf([circleEl, arrowEl]);

      gsap.set(circleEl, {
        left: x,
        top: y,
        scale: 0,
        opacity: 1
      });

      gsap.to(circleEl, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(arrowEl, {
        rotation: -45,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = (circleEl: HTMLDivElement, arrowEl: SVGSVGElement) => {
      if (!circleEl || !arrowEl) return;

      gsap.killTweensOf([circleEl, arrowEl]);

      gsap.to(circleEl, {
        scale: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(arrowEl, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const button = buttonRef.current;
    const mobileButton = mobileButtonRef.current;

    if (button && circleRef.current && arrowRef.current) {
      const circle = circleRef.current;
      const arrow = arrowRef.current;
      
      const mouseEnter = (e: MouseEvent) => handleMouseEnter(e, circle, arrow, button);
      const mouseLeave = () => handleMouseLeave(circle, arrow);

      button.addEventListener('mouseenter', mouseEnter);
      button.addEventListener('mouseleave', mouseLeave);

      return () => {
        button.removeEventListener('mouseenter', mouseEnter);
        button.removeEventListener('mouseleave', mouseLeave);
      };
    }

    if (mobileButton && mobileCircleRef.current && mobileArrowRef.current) {
      const circle = mobileCircleRef.current;
      const arrow = mobileArrowRef.current;
      
      const mouseEnter = (e: MouseEvent) => handleMouseEnter(e, circle, arrow, mobileButton);
      const mouseLeave = () => handleMouseLeave(circle, arrow);

      mobileButton.addEventListener('mouseenter', mouseEnter);
      mobileButton.addEventListener('mouseleave', mouseLeave);

      return () => {
        mobileButton.removeEventListener('mouseenter', mouseEnter);
        mobileButton.removeEventListener('mouseleave', mouseLeave);
      };
    }
  }, []);

  return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="logo-section">
              <Image
                src="/svg/logo.svg"
                alt="Crayont"
                className="logo-img"
                width={120}
                height={40}
                priority
              />
            </div>

            <div className="desktop-nav">
              <a href="#projects" className="nav-link animated-link">
                Projects
              </a>
              <a href="#services" className="nav-link">
                Services
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <button
                ref={buttonRef}
                onClick={onContactClick}
                className="custom-button"
              >
                <div ref={circleRef} className="button-circle" />
                <span className="button-text">Get in Touch</span>
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
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button"
            >
              <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-content">
                <a href="#projects" className="mobile-nav-link">
                  Projects
                </a>
                <a href="#services" className="mobile-nav-link">
                  Services
                </a>
                <a href="#about" className="mobile-nav-link">
                  About
                </a>
                <button
                  ref={mobileButtonRef}
                  onClick={onContactClick}
                  className="mobile-custom-button"
                >
                  <div ref={mobileCircleRef} className="mobile-button-circle" />
                  <span className="mobile-button-text">Get in Touch</span>
                  <svg
                    ref={mobileArrowRef}
                    className="mobile-button-arrow"
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
          )}
        </div>
      </nav>
  );
}