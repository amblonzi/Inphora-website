"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 50,
                y: (e.clientY / window.innerHeight - 0.5) * 50,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-primary text-foreground pt-24 md:pt-20">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-background pointer-events-none opacity-20" />

            {/* Animation Beam */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-[beam_10s_linear_infinite]" />
                <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-[beam_15s_linear_infinite_reverse]" />
            </div>

            {/* Floating Particles - Client Side Only to avoid hydration mismatch */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {mounted && [...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-secondary/30 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${10 + Math.random() * 20}s linear infinite`,
                            animationDelay: `-${Math.random() * 20}s`,
                            opacity: 0.1 + Math.random() * 0.4
                        }}
                    />
                ))}
            </div>

            {/* Background Glows with Parallax */}
            <div
                className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse transition-transform duration-700 ease-out"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            />
            <div
                className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/5 rounded-full blur-[70px] md:blur-[100px] animate-pulse transition-transform duration-700 ease-out"
                style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <div
                        data-aos="fade-up"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-medium text-secondary mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                        </span>
                        Elite Strategic Technology Partners
                    </div>

                    <h1
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
                    >
                        <span className="text-gradient animate-shimmer">Engineering Elite</span> <br className="hidden sm:block" />
                        Digital <span className="text-secondary">Ecosystems</span>
                    </h1>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-base md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-sans"
                    >
                        Inphora Limited delivers mission-critical AI, elite software engineering,
                        and resilient cloud infrastructure. We transform technical complexity into
                        shrewd, competitive advantages for industry leaders.
                    </p>

                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="flex flex-col sm:flex-row flex-wrap gap-4"
                    >
                        <a
                            href="https://wa.me/254705522155"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.44-9.89 9.886-.001 2.15.652 3.791 1.646 5.41l-1.032 3.77 3.876-.995zm11.017-12.332c.31-.149.54-.227.79-.227.35 0 .425.069.641.263.217.194.81 1.986.81 2.422 0 .436-.08.79-.31 1.14-.23.35-.515.61-.715.81-.2.2-.415.41-.61.61-.19.19-.395.405-.62.645-.225.24-.46.46-.71.68-.25.22-.505.41-.775.58s-.545.31-.83.43c-.285.12-.585.22-.895.3s-.63.14-.955.18-.66.06-.99.06-.67-.02-1.01-.06-.68-.08-1.03-.14-.7-.14-1.06-.24-.715-.22-1.085-.36-.745-.3-1.12-.48-.755-.38-1.14-.62-.775-.52-1.16-.84-.79-.68-1.18-1.08-.8-1.04-1.2-1.64-.81-1.21-1.21-1.9.405-.285.81-.43l.54-.18c.27-.09.54-.18.81-.27.27-.09.54-.18.81-.27.27-.09.54-.18.81-.27.27-.09.54-.18.81-.27l.54-.18c.27-.09.43-.14.59-.14.16 0 .32.05s.48.15.64.3c.16.15.64.9.64.9s.16.3.32.45c.16.15.32.15.32.15s.32 0 .48-.15c.16-.15.32-.45.32-.45s.16-.3.16-.45c0-.15-.16-.3-.32-.45s-.32-.3-.32-.3z" /></svg>
                            WhatsApp Us
                        </a>
                        <a
                            href="mailto:contact@inphora.net"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            Email Support
                        </a>
                        <Link
                            href="#solutions"
                            className="px-8 py-4 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 underline underline-offset-8"
                        >
                            Our Expertise
                        </Link>
                    </div>
                </div>
            </div>

            {/* Abstract Design Elements */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
                <div className="relative w-[600px] h-[600px]">
                    <div className="absolute top-0 right-0 w-full h-full border border-secondary/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute top-10 right-10 w-[80%] h-[80%] border border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    <div className="absolute top-20 right-20 w-[60%] h-[60%] border border-gold/20 rounded-full animate-[spin_10s_linear_infinite]" />
                </div>
            </div>
        </section>
    );
}
