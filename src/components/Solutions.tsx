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
        <section id="solutions" className="pt-10 pb-20 md:pt-16 md:pb-24 bg-primary relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
                    <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-3">Our Expertise</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Smart Solutions for <br className="hidden md:block" /> <span className="text-gradient">Your Business</span></h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                        We solve real business problems with technology. Our approach is practical, efficient, and built for results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-2 glass-dark flex flex-col"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-4">{service.title}</h4>
                            <p className="text-slate-400 leading-relaxed font-sans group-hover:text-slate-300 transition-colors text-sm md:text-base mb-8 flex-grow">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                <a
                                    href={`https://wa.me/254705522155?text=I'm%20interested%20in%20Inphora's%20${encodeURIComponent(service.title)}%20solutions.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-primary transition-all"
                                    title="WhatsApp Inquiry"
                                    aria-label={`Contact via WhatsApp about ${service.title}`}
                                >
                                    <Icons.WhatsApp width={18} height={18} />
                                </a>
                                <a
                                    href={`mailto:contact@inphora.net?subject=Inquiry%20regarding%20${encodeURIComponent(service.title)}`}
                                    className="p-2.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                    title="Email Inquiry"
                                    aria-label={`Email inquiry about ${service.title}`}
                                >
                                    <Icons.Mail width={18} height={18} />
                                </a>
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-auto">Get Help</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
