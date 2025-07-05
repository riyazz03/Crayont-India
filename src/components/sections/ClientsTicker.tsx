'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../styles/clients-ticker.css'; // Adjust the path as necessary

// Client logos data - replace with your actual logos
const clientLogos = [
    { id: 1, name: 'Google', logo: '/logos/google.svg' },
    { id: 2, name: 'Microsoft', logo: '/logos/microsoft.svg' },
    { id: 3, name: 'Amazon', logo: '/logos/amazon.svg' },
    { id: 4, name: 'Apple', logo: '/logos/apple.svg' },
    { id: 5, name: 'Netflix', logo: '/logos/netflix.svg' },
    { id: 6, name: 'Spotify', logo: '/logos/spotify.svg' },
    { id: 7, name: 'Tesla', logo: '/logos/tesla.svg' },
    { id: 8, name: 'Meta', logo: '/logos/meta.svg' },
    { id: 9, name: 'Adobe', logo: '/logos/adobe.svg' },
    { id: 10, name: 'Slack', logo: '/logos/slack.svg' },
];

const ClientsTicker: React.FC = () => {
    const tickerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!tickerRef.current || !containerRef.current) return;

        const ticker = tickerRef.current;
        const container = containerRef.current;

        // Calculate the width of one set of logos
        const logoWidth = ticker.scrollWidth / 2;

        // Create the infinite scroll animation
        animationRef.current = gsap.timeline({ repeat: -1 });
        animationRef.current.to(ticker, {
            x: -logoWidth,
            duration: 20,
            ease: 'none',
        });

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
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, []);

    return (
        <section className="clients-ticker">
            <div className="gradient-black"></div>
            <div className="gradient-black is-bottom"></div>
            <div className="clients-ticker__container">
                <h2 className="clients-ticker__heading">Our Trusted Clients</h2>

                <div className="clients-ticker__ticker-container" ref={containerRef}>
                    <div className="clients-ticker__gradient clients-ticker__gradient--left"></div>
                    <div className="clients-ticker__gradient clients-ticker__gradient--right"></div>

                    <div className="clients-ticker__ticker" ref={tickerRef}>
                        {/* First set of logos */}
                        {clientLogos.map((client) => (
                            <div key={client.id} className="clients-ticker__logo">
                                <img
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    className="clients-ticker__logo-img"
                                />
                            </div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {clientLogos.map((client) => (
                            <div key={`duplicate-${client.id}`} className="clients-ticker__logo">
                                <img
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    className="clients-ticker__logo-img"
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