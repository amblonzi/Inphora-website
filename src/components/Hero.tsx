"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';

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
        <section className="relative min-h-screen flex overflow-hidden bg-primary text-foreground pt-36 md:pt-48">
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
                        Your Trusted Technology Partner
                    </div>

                    <h1
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
                    >
                        <span className="text-gradient animate-shimmer">Building Digital Solutions</span> <br className="hidden sm:block" />
                        That Drive <span className="text-secondary">Growth</span>
                    </h1>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-base md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-sans"
                    >
                        We provide expert software development, data insights, and
                        reliable cloud services. We handle the complex technology so you
                        can focus on your business results.
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
                            <Icons.WhatsApp width={20} height={20} />
                            WhatsApp Us
                        </a>
                        <a
                            href="mailto:contact@inphora.net"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                        >
                            <Icons.Mail width={20} height={20} />
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
