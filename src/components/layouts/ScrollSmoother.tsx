"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface ScrollSmootherWrapperProps {
  children: React.ReactNode;
}

export default function ScrollSmootherWrapper({ children }: ScrollSmootherWrapperProps) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let smoother: ScrollSmoother;

    if (smoothWrapperRef.current && smoothContentRef.current) {
      smoother = ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
    }

    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={smoothWrapperRef}>
      <div id="smooth-content" ref={smoothContentRef}>
        {children}
      </div>
    </div>
  );
}