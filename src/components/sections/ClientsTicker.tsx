'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import '../../styles/clients-ticker.css'; // Adjust the path as necessary

// Client logos data - updated with your actual logo paths
const clientLogos = [
    { id: 1, name: 'Advenza', logo: '/ticker_logos/advenza.png' },
    { id: 2, name: 'Archoeuvre', logo: '/ticker_logos/archoeuvre.png' },
    { id: 3, name: 'Arm Ni Enterprises', logo: '/ticker_logos/arm-ni-enterprises.png' },
    { id: 4, name: 'Himalaya Offset', logo: '/ticker_logos/himalaya-offset.png' },
    { id: 5, name: 'Madrasa Rahmania Quasimul Uloom', logo: '/ticker_logos/madrasa.png' },
    { id: 6, name: 'Ohmix', logo: '/ticker_logos/ohmix.png' },
    { id: 7, name: 'Online Taleem ul Quran', logo: '/ticker_logos/online-taleem-ul-quran.png' },
    { id: 8, name: 'SA', logo: '/ticker_logos/sa.png' },
    { id: 9, name: 'TechTrack', logo: '/ticker_logos/techtrack.png' },
];

const ClientsTicker: React.FC = () => {
    const tickerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!tickerRef.current || !containerRef.current) return;

        const ticker = tickerRef.current;
        const container = containerRef.current;

        // Wait for images to load and get accurate measurements
        const setupAnimation = () => {
            // Get all logo elements
            const logoElements = ticker.querySelectorAll('.clients-ticker__logo');
            
            // Calculate the total width of one complete set (first half of logos)
            const firstSetLogos = Array.from(logoElements).slice(0, clientLogos.length);
            
            // Force a layout recalculation to get accurate measurements
            ticker.style.display = 'flex';
            
            // Calculate total width including gaps
            const logoWidth = firstSetLogos.reduce((total, element) => {
                const rect = element.getBoundingClientRect();
                return total + rect.width;
            }, 0);
            
            // Get computed gap from CSS
            const computedStyle = window.getComputedStyle(ticker);
            const gap = parseInt(computedStyle.gap) || 50;
            
            // Total width of one set including gaps
            const singleSetWidth = logoWidth + (gap * (clientLogos.length - 1));
            
            // Kill any existing animation
            if (animationRef.current) {
                animationRef.current.kill();
            }
            
            // Reset position
            gsap.set(ticker, { x: 0 });

            // Create the infinite scroll animation
            animationRef.current = gsap.timeline({
                repeat: -1,
                ease: 'none'
            });

            // Animate from 0 to exactly -singleSetWidth for seamless loop
            animationRef.current.to(ticker, {
                x: -singleSetWidth,
                duration: 20, // Adjust speed as needed
                ease: 'none'
            });
        };

        // Setup animation after a short delay to ensure images are loaded
        const timeoutId = setTimeout(setupAnimation, 100);

        // Also listen for window resize to recalculate
        const handleResize = () => {
            setTimeout(setupAnimation, 100);
        };

        window.addEventListener('resize', handleResize);

        // Pause/resume on hover
        const handleMouseEnter = () => {
            if (animationRef.current) {
                animationRef.current.pause();
            }
        };

        const handleMouseLeave = () => {
            if (animationRef.current) {
                animationRef.current.resume();
            }
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, []);

    return (
        <section className="clients-ticker">
            <div className="clients-ticker__container">
                <h2 className="clients-ticker__heading">Our Trusted Clients</h2>

                <p className='clients-ticker__description'>
                    We specialize in custom website development and mobile app development, delivering high-quality digital solutions tailored to each brand&apos;s unique needs. With 24/7 customer support, a collaborative process, and a strong focus on client satisfaction, we&apos;ve built lasting relationships with businesses across industries. The logos below represent some of the trusted clients who have partnered with us to bring their digital visions to life.
                </p>

                <div className="clients-ticker__ticker-container" ref={containerRef}>
                    <div className="clients-ticker__gradient clients-ticker__gradient--left"></div>
                    <div className="clients-ticker__gradient clients-ticker__gradient--right"></div>

                    <div className="clients-ticker__ticker" ref={tickerRef}>
                        {/* First set of logos */}
                        {clientLogos.map((client) => (
                            <div key={client.id} className="clients-ticker__logo">
                                <Image
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    width={180}
                                    height={200}
                                    className="clients-ticker__logo-img"
                                    style={{ objectFit: 'contain' }}
                                    priority={false}
                                />
                            </div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {clientLogos.map((client) => (
                            <div key={`duplicate-${client.id}`} className="clients-ticker__logo">
                                <Image
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    width={180}
                                    height={200}
                                    className="clients-ticker__logo-img"
                                    style={{ objectFit: 'contain' }}
                                    priority={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientsTicker;