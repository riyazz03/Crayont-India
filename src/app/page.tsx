"use client";
import { useState } from 'react';
import Navbar from '@/components/layouts/Navbar';
import Hero from '@/components/sections/Hero';
import ProjectGrid from '@/components/sections/ProjectGrid';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layouts/Footer';
import ClientSticker from '@/components/sections/ClientsTicker';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onContactClick={() => setIsContactFormOpen(true)} />
      <Hero onContactClick={() => setIsContactFormOpen(true)} />
        <ClientSticker/>
      <ProjectGrid />
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
      <Footer />
    </div>
  );
}