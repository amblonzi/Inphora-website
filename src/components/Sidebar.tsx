"use client";

import React, { useState } from 'react';
import { Icons } from './Icons';

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const menuItems = [
        { id: 'hero', label: 'Home', icon: <Icons.Home className="w-5 h-5" /> },
        { id: 'solutions', label: 'Solutions', icon: <Icons.Brain className="w-5 h-5" /> },
        { id: 'approach', label: 'Approach', icon: <Icons.List className="w-5 h-5" /> },
        { id: 'contact', label: 'Connect', icon: <Icons.Phone className="w-5 h-5" /> },
    ];

    const handleNavClick = (viewId: string) => {
        setActiveView(viewId);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg focus-ring"
                aria-label="Toggle navigation menu"
            >
                <div className="relative w-6 h-5">
                    <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
                    <span className={`absolute block w-full h-0.5 bg-current top-2 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
                </div>
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:w-64 bg-primary h-screen fixed left-0 top-0 z-40 flex-col border-r border-white/5 transition-all duration-300">
                {/* Logo Section */}
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shrink-0 shadow-lg shadow-white/5">
                        <span className="italic font-black text-secondary text-xl">i</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">
                        Inphora<span className="text-secondary">.</span>
                    </span>
                </div>

                {/* Navigation Section */}
                <nav className="flex-grow px-6 py-8 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group focus-ring ${
                                activeView === item.id 
                                ? 'bg-secondary text-primary shadow-lg shadow-secondary/20' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <div className={`shrink-0 transition-transform duration-300 ${activeView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {item.icon}
                            </div>
                            <span className={`font-bold text-sm transition-all ${activeView === item.id ? 'translate-x-0' : 'group-hover:translate-x-1'}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="p-8 mt-auto border-t border-white/5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-1">Status</div>
                    <div className="flex items-center gap-2 text-xs text-white font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Systems
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay Menu */}
            <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Mobile Menu Panel */}
                <aside className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-primary shadow-2xl transform transition-transform duration-300 ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    {/* Mobile Logo Section */}
                    <div className="p-6 flex items-center justify-between border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shrink-0 shadow-lg shadow-white/5">
                                <span className="italic font-black text-secondary text-xl">i</span>
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight">
                                Inphora<span className="text-secondary">.</span>
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors focus-ring"
                            aria-label="Close menu"
                        >
                            <Icons.Close className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-grow px-4 py-6 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group focus-ring ${
                                    activeView === item.id 
                                    ? 'bg-secondary text-primary shadow-lg shadow-secondary/20' 
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <div className={`shrink-0 transition-transform duration-300 ${activeView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </div>
                                <span className={`font-bold text-sm transition-all ${activeView === item.id ? 'translate-x-0' : 'group-hover:translate-x-1'}`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Footer */}
                    <div className="p-6 border-t border-white/10">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-1">Status</div>
                        <div className="flex items-center gap-2 text-xs text-white font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Systems
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}
