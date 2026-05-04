import React from 'react';
import { Icons } from './Icons';

const services = [
    {
        title: "AI & Data Insights",
        description: "Turn your data into clear answers. We help you make smarter decisions with custom data tools.",
        icon: <Icons.Brain className="w-8 h-8" />,
    },
    {
        title: "Custom Software Development",
        description: "Reliable software built to last. From financial systems to custom web apps, we build exactly what you need.",
        icon: <Icons.Code className="w-8 h-8" />,
    },
    {
        title: "Security & Protection",
        description: "Keep your business safe. We test and secure your systems against threats so you can work with peace of mind.",
        icon: <Icons.Shield className="w-8 h-8" />,
    },
    {
        title: "Cloud Hosting & Support",
        description: "Fast and secure hosting. We ensure your website and apps are always online and running smoothly.",
        icon: <Icons.Cloud className="w-8 h-8" />,
    },
];

export default function Solutions() {
    return (
        <section id="solutions" className="h-full overflow-y-auto p-8 md:p-16 bg-white brand-pattern">
            <div className="container mx-auto">
                <div className="mb-12 md:mb-16" data-aos="fade-up">
                    <h2 className="text-sm font-black text-secondary tracking-[0.2em] uppercase mb-4">What We Do</h2>
                    <h3 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">Our Services</h3>
                    <p className="text-slate-600 max-w-2xl text-lg md:text-xl font-bold leading-relaxed">
                        Simple solutions that solve real business problems.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group p-10 md:p-12 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-primary/20 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 flex flex-col card-hover relative overflow-hidden"
                        >
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors duration-500" />
                            
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-slate-800 text-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 shadow-xl shadow-primary/20 relative z-10">
                                {service.icon}
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black text-primary mb-6 relative z-10 group-hover:text-secondary transition-colors duration-300">{service.title}</h4>
                            <p className="text-slate-600 leading-relaxed font-sans font-bold text-base md:text-lg mb-8 flex-grow relative z-10">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-6 pt-8 border-t border-slate-200 relative z-10">
                                <a
                                    href={`https://wa.me/254705522155?text=I'm%20interested%20in%20Inphora's%20${encodeURIComponent(service.title)}%20solutions.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-accent group flex items-center gap-2 text-sm px-8 py-4"
                                >
                                    <Icons.WhatsApp width={18} height={18} className="group-hover:scale-110 transition-transform" />
                                    <span>Ask Us</span>
                                </a>
                                <div className="flex items-center gap-2 ml-auto">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Trusted</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
