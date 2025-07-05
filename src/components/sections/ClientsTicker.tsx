'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import '../../styles/clients-ticker.css'; // Adjust the path as necessary

// Client logos data - updated with your actual logo paths
const clientLogos = [
    { id: 1, name: 'Advenza', logo: '/ticker_logos/advenza.webp' },
    { id: 2, name: 'Archoeuvre', logo: '/ticker_logos/archoeuvre.webp' },
    { id: 3, name: 'Arm Ni Enterprises', logo: '/ticker_logos/arm-ni-enterprises.webp' },
    { id: 4, name: 'Himalaya Offset', logo: '/ticker_logos/himalaya-offset.webp' },
    { id: 5, name: 'Madrasa Rahmania Quasimul Uloom', logo: '/ticker_logos/madrasa.webp' },
    { id: 6, name: 'Ohmix', logo: '/ticker_logos/ohmix.webp' },
    { id: 7, name: 'Online Taleem ul Quran', logo: '/ticker_logos/online-taleem-ul-quran.webp' },
    { id: 8, name: 'SA', logo: '/ticker_logos/sa.webp' },
    { id: 9, name: 'TechTrack', logo: '/ticker_logos/techtrack.webp' },
];

const ClientsTicker: React.FC = () => {
    const tickerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!tickerRef.current || !containerRef.current) return;

        const ticker = tickerRef.current;
        const container = containerRef.current;

        // Wait for images to load and get accurate measurements
        const setupAnimation = () => {
            // Kill any existing animation
            if (animationRef.current) {
                animationRef.current.kill();
            }
            
            // Reset position
            gsap.set(ticker, { x: 0 });
            
            // Force a layout recalculation to get accurate measurements
            ticker.style.display = 'flex';
            
            // Get the total scrollWidth (like your JS version)
            const totalWidth = ticker.scrollWidth;
            
            // Create the infinite scroll animation (like your JS version)
            animationRef.current = gsap.to(ticker, {
                x: -totalWidth / 3, // Using the same logic as your JS version
                duration: 30, // Same duration as your JS version
                ease: 'none',
                repeat: -1,
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

                        {/* Second set for seamless loop */}
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

                        {/* Third set for seamless loop */}
                        {clientLogos.map((client) => (
                            <div key={`triple-${client.id}`} className="clients-ticker__logo">
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