import React from 'react';
import Link from 'next/link';

export default function Contact() {
    return (
        <section id="contact" className="py-20 md:py-24 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-secondary/5 blur-[120px] rounded-full translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div
                    data-aos="zoom-in"
                    className="max-w-5xl mx-auto glass-dark p-8 md:p-20 rounded-[30px] md:rounded-[40px] border border-white/5 text-center"
                >
                    <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-4">Ready to Start?</h2>
                    <h3 className="text-3xl md:text-6xl font-bold text-white mb-8">Let's build <span className="text-gradient">something great together.</span></h3>
                    <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto mb-10 font-sans">
                        Have a project in mind? Contact us today to discuss how we can help your business grow.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                        <a
                            href="mailto:contact@inphora.net"
                            className="px-8 md:px-10 py-4 md:py-5 bg-secondary text-primary font-black rounded-xl md:rounded-2xl hover:bg-secondary/90 transition-all hover:scale-105 shadow-xl shadow-secondary/10"
                        >
                            Contact Us Today
                        </a>
                        <Link
                            href="#solutions"
                            className="px-8 md:px-10 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl md:rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                            View Our Work
                        </Link>
                    </div>

                    <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-white font-bold mb-1">Nairobi, KE</div>
                            <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">Headquarters</div>
                        </div>
                        <div>
                            <a href="mailto:contact@inphora.net" className="text-white font-bold mb-1 hover:text-secondary transition-colors block">contact@inphora.net</a>
                            <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">Email Support</div>
                        </div>
                        <div>
                            <a href="tel:+254705522155" className="text-white font-bold mb-1 hover:text-secondary transition-colors block">+254 705 522 155</a>
                            <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">Direct Line</div>
                        </div>
                        <div>
                            <div className="text-white font-bold mb-1">24/7 Monitoring</div>
                            <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
