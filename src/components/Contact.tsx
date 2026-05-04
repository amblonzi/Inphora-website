import React from 'react';

export default function Contact() {
    return (
        <section id="contact" className="h-full overflow-y-auto p-8 md:p-16 bg-white brand-pattern">
            <div className="container mx-auto">
                <div
                    data-aos="zoom-in"
                    className="max-w-6xl mx-auto bg-slate-950 p-12 md:p-24 rounded-[3rem] text-center shadow-2xl relative overflow-hidden"
                >
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] -ml-32 -mb-32" />

                    <div className="relative z-10">
                        <h2 className="text-sm font-black text-secondary tracking-[0.3em] uppercase mb-8">Get In Touch</h2>
                        <h3 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-tight">Let's <span className="text-secondary">Connect</span></h3>
                        <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-14 font-sans font-bold leading-relaxed">
                            Talk to our team about how we can help your business.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a
                                href="mailto:contact@inphora.net"
                                className="btn-accent group text-xl px-16 py-6 relative overflow-hidden"
                            >
                                <span className="relative z-10">Email Us</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                        </div>

                        <div className="mt-20 pt-16 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                            <div>
                                <div className="text-white font-black text-xl mb-2">Nairobi, KE</div>
                                <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Our Office</div>
                            </div>
                            <div>
                                <a href="mailto:contact@inphora.net" className="text-white font-black text-xl mb-2 hover:text-secondary transition-colors block underline">contact@inphora.net</a>
                                <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Email</div>
                            </div>
                            <div>
                                <a href="tel:+254705522155" className="text-white font-black text-xl mb-2 hover:text-secondary transition-colors block">+254 705 522 155</a>
                                <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Phone</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
