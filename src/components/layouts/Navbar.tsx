"use client";
import { useState } from 'react';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/favicon/favicon-32x32.png" 
              alt="Crayont" 
              className="h-8 w-8 mr-3"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
              Crayont
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#projects" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Projects
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <button
              onClick={onContactClick}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <a href="#projects" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Projects
              </a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Services
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                About
              </a>
              <button
                onClick={onContactClick}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-left"
              >
                Get in Touch
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}