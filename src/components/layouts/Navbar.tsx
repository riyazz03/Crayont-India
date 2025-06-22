"use client";
import { useState } from 'react';
import '../../styles/navbar.css';
import Button from '../ui/button';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="logo-section">
            <img
              src="/svg/logo.svg"
              alt="Crayont"
              className="logo-img"
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
            <Button onClick={onContactClick}>
              Get in Touch
            </Button>
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
              <Button onClick={onContactClick} className="mobile-button">
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}