"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TermsPolicy from './TermsPolicy';

export default function Footer() {
    const [modal, setModal] = useState<{ isOpen: boolean, type: 'terms' | 'policy' }>({
        isOpen: false,
        type: 'terms'
    });

    const openModal = (type: 'terms' | 'policy') => setModal({ isOpen: true, type });
    const closeModal = () => setModal({ ...modal, isOpen: false });

    return (
        <footer className="py-12 bg-[#01030d] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary relative">
                            <span className="italic font-black">i</span>
                            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" /> {/* Symbolic information dot */}
                        </div>
                        Inphora Limited<span className="text-secondary">.</span>
                    </Link>

                    <div className="flex gap-8">
                        <Link href="#solutions" className="text-slate-500 hover:text-white text-sm transition-colors">Solutions</Link>
                        <Link href="#approach" className="text-slate-500 hover:text-white text-sm transition-colors">Approach</Link>
                        <Link href="#expertise" className="text-slate-500 hover:text-white text-sm transition-colors">Expertise</Link>
                        <Link href="#contact" className="text-secondary hover:text-secondary/80 text-sm font-bold transition-colors">Join Us</Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <p className="text-slate-600 text-sm mb-4 md:mb-0 font-sans">
                        &copy; {new Date().getFullYear()} Inphora Limited. All rights reserved. Precision in every byte.
                    </p>
                    <div className="flex gap-6 text-slate-500 text-sm">
                        <button onClick={() => openModal('policy')} className="hover:text-white">Privacy Policy</button>
                        <button onClick={() => openModal('terms')} className="hover:text-white">Terms of Service</button>
                    </div>
                </div>
            </div>

            <TermsPolicy
                isOpen={modal.isOpen}
                onClose={closeModal}
                type={modal.type}
            />
        </footer>
    );
}
