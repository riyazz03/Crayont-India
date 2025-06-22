"use client";
import { useState, useEffect } from 'react';
import SplashScreen from '../layouts/SpalshScreen';
interface ClientLayoutProps {
    children: React.ReactNode;
}
export default function ClientLayout({ children }: ClientLayoutProps) {
    const [showSplash, setShowSplash] = useState(true);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const handleSplashComplete = () => {
        setShowSplash(false);
    };
    if (!mounted) {
        return null;
    }
    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
    return <>{children}</>;
}