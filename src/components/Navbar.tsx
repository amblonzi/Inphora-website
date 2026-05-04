"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icons } from "./Icons";

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isOpen ? "py-4 glass shadow-sm" : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary tracking-tight z-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white relative">
                        <span className="italic font-black text-secondary">i</span>
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary" />
                    </div>
                    Inphora<span className="text-secondary font-black">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <Link href="#solutions" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Solutions</Link>
                    <Link href="#approach" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Approach</Link>
                    <Link href="#expertise" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Expertise</Link>
                    <Link
                        href="#contact"
                        className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/10"
                    >
                        Get Insight
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary p-2 relative z-50"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <Icons.Close className="w-8 h-8" /> : <Icons.Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-2xl transition-all duration-300 ease-in-out md:hidden flex flex-col items-center justify-start pt-32 gap-8 z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                <Link onClick={toggleMenu} href="#solutions" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">Solutions</Link>
                <Link onClick={toggleMenu} href="#approach" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">Approach</Link>
                <Link onClick={toggleMenu} href="#expertise" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">Expertise</Link>
                <Link
                    onClick={toggleMenu}
                    href="#contact"
                    className="mt-4 px-10 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20"
                >
                    Get Insight
                </Link>
            </div>
        </nav >
    );
}
