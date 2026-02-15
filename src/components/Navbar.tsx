"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? "py-4 glass-dark shadow-lg" : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight z-50">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary relative">
                        <span className="italic font-black">i</span>
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" /> {/* Symbolic information dot */}
                    </div>
                    Inphora Limited<span className="text-secondary">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#solutions" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Solutions</Link>
                    <Link href="#approach" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Approach</Link>
                    <Link href="#expertise" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Expertise</Link>
                    <Link
                        href="#contact"
                        className="px-5 py-2.5 glass border border-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all"
                    >
                        Get Insight
                    </Link>
                </div>

                {/* Mobile Menu Button ... */}
                {/* ... */}

                {/* Mobile Menu Drawer */}
                <div className={`fixed inset-0 bg-primary/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                    <Link onClick={toggleMenu} href="#solutions" className="text-2xl font-bold text-white hover:text-secondary transition-colors">Solutions</Link>
                    <Link onClick={toggleMenu} href="#approach" className="text-2xl font-bold text-white hover:text-secondary transition-colors">Approach</Link>
                    <Link onClick={toggleMenu} href="#expertise" className="text-2xl font-bold text-white hover:text-secondary transition-colors">Expertise</Link>
                    <Link
                        onClick={toggleMenu}
                        href="#contact"
                        className="mt-4 px-8 py-4 bg-secondary text-primary font-bold rounded-xl shadow-lg shadow-secondary/20"
                    >
                        Get Insight
                    </Link>
                </div>
            </div>
        </nav>
    );
}
