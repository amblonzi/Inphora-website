"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icons } from './Icons';

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white p-8 md:p-16 brand-pattern">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-background opacity-30 pointer-events-none" />
            
            {/* Enhanced background decorations */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Floating 3D Asset */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none"
                style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                }}
            >
                <div className="relative w-full max-w-4xl aspect-square">
                    {mounted && (
                        <Image
                            src="/images/hero-abstract.png"
                            alt="Abstract 3D Shape representing digital architecture and innovation"
                            fill
                            className="object-contain animate-[float_10s_ease-in-out_infinite]"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={85}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                    )}
                </div>
            </div>

            <div className="container mx-auto relative z-10 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div
                        data-aos="fade-up"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/10 bg-primary/5 text-xs font-black text-primary mb-12 uppercase tracking-widest"
                    >
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        Business Solutions
                    </div>

                    <h1
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-6xl md:text-9xl font-black leading-[1.1] mb-12 text-primary tracking-tighter"
                    >
                        Simple <br />
                        <span className="text-gradient animate-gradient bg-[length:200%_auto]">Software</span>
                    </h1>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-xl md:text-3xl text-slate-700 max-w-3xl mx-auto mb-16 leading-relaxed font-sans font-bold"
                    >
                        Building reliable software solutions
                        that help your business grow.
                    </p>

                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="flex flex-col sm:flex-row items-center justify-center gap-8"
                    >
                        <a
                            href="https://wa.me/254705522155"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-cta group flex items-center justify-center gap-4 min-w-[200px]"
                        >
                            <Icons.WhatsApp width={28} height={28} className="group-hover:scale-110 transition-transform" />
                            <span>Start Consultation</span>
                            <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform" />
                        </a>
                        <a
                            href="mailto:contact@inphora.net"
                            className="btn-secondary group flex items-center justify-center gap-4 min-w-[200px] text-lg font-bold"
                        >
                            <Icons.Mail width={24} height={24} className="group-hover:scale-110 transition-transform" />
                            <span>Email Us</span>
                        </a>
                    </div>
                    
                    {/* Additional trust indicators */}
                    <div 
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="flex items-center justify-center gap-8 mt-12 text-sm text-slate-500"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Always Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span>Business Ready</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500" />
                            <span>Expert Help</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
