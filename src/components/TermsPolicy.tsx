"use client";

import React from 'react';

interface TermsPolicyProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'terms' | 'policy';
}

export default function TermsPolicy({ isOpen, onClose, type }: TermsPolicyProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-3xl max-h-[80vh] bg-[#0A0F1E] border border-white/10 rounded-3xl overflow-hidden glass-dark shadow-2xl flex flex-col">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                        {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto font-sans text-slate-300 leading-relaxed text-sm">
                    {type === 'terms' ? (
                        <div className="space-y-6">
                            <section>
                                <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                                <p>Welcome to Inphora Limited. By accessing our services, you agree to comply with and be bound by the following terms and conditions.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold mb-2">2. Services Offered</h3>
                                <p>Inphora Limited provides data science, AI integration, and custom software consultancy. Specific project terms are defined in individual service level agreements.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold mb-2">3. Intellectual Property</h3>
                                <p>All content, branding, and proprietary algorithms developed by Inphora Limited remain the property of Inphora Limited unless otherwise specified in written contracts.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold mb-2">4. User Obligations</h3>
                                <p>Users must provide accurate information when inquiring about services and must not use our platforms for any illegal activities.</p>
                            </section>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <section>
                                <h3 className="text-white font-bold mb-2">1. Data Collection</h3>
                                <p>We collect minimal data necessary for service inquiries, including email addresses and contact information provided via our contact forms.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold mb-2">2. Use of Information</h3>
                                <p>Your information is used solely to respond to inquiries and provide requested services. We do not sell or share your data with third parties for marketing.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold mb-2">3. Data Security</h3>
                                <p>We implement industry-standard security measures to protect your information from unauthorized access or disclosure.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold mb-2">4. Cookies</h3>
                                <p>Our website may use essential cookies to enhance user experience and analyze site traffic anonymously.</p>
                            </section>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/5 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary/90 transition-all"
                    >
                        Acknowledged
                    </button>
                </div>
            </div>
        </div>
    );
}
