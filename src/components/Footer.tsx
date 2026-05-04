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
        <footer className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary tracking-tight mb-8">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white relative">
                                <span className="italic font-black text-secondary">i</span>
                                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary" />
                            </div>
                            Inphora<span className="text-secondary font-black">.</span>
                        </Link>
                        <p className="text-slate-500 text-lg max-w-sm font-medium leading-relaxed">
                            A global technology architecture firm specializing in enterprise intelligence and digital transformation.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-8">Infrastructure</h4>
                        <div className="flex flex-col gap-4">
                            <Link href="#solutions" className="text-slate-500 hover:text-primary text-base font-medium transition-colors">Digital Solutions</Link>
                            <Link href="#approach" className="text-slate-500 hover:text-primary text-base font-medium transition-colors">Methodology</Link>
                            <Link href="#expertise" className="text-slate-500 hover:text-primary text-base font-medium transition-colors">Core Expertise</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-8">Corporate</h4>
                        <div className="flex flex-col gap-4">
                            <button onClick={() => openModal('policy')} className="text-left text-slate-500 hover:text-primary text-base font-medium transition-colors">Privacy Policy</button>
                            <button onClick={() => openModal('terms')} className="text-left text-slate-500 hover:text-primary text-base font-medium transition-colors">Terms of Engagement</button>
                            <Link href="#contact" className="text-secondary hover:text-secondary/80 text-base font-bold transition-colors">Partner Access</Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-100">
                    <p className="text-slate-400 text-sm mb-4 md:mb-0 font-medium tracking-tight">
                        &copy; {new Date().getFullYear()} Inphora Limited. Registered Technology Architecture Provider.
                    </p>
                    <div className="flex gap-8 text-slate-400 text-xs font-black uppercase tracking-widest">
                        <span>L-092-234-INF</span>
                        <span className="text-slate-200">|</span>
                        <span>Tier 1 Enterprise</span>
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
