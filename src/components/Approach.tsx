import React from 'react';

const steps = [
    {
        num: "01",
        title: "Strategic Discovery",
        text: "We map your technical ecosystem and business objectives to identify high-impact opportunities for digital transformation."
    },
    {
        num: "02",
        title: "Precision Engineering",
        text: "We architect secure, scalable infrastructure and custom models tailored to the unique constraints of your industry."
    },
    {
        num: "03",
        title: "Meticulous Deployment",
        text: "Rigorous testing and phased rollouts ensure your solution is resilient, compliant, and ready for high-stakes operations."
    }
];

export default function Approach() {
    return (
        <section id="approach" className="py-20 md:py-24 bg-[#010413] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div data-aos="fade-right">
                        <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3 text-center lg:text-left">The Inphora Method</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center lg:text-left">Engineering with <br className="hidden md:block" /> <span className="text-secondary">Surgical Precision</span></h3>
                        <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed font-sans text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                            Our process is designed for clarity and impact. We prioritize
                            transparency and measurable results at every phase of the project lifecycle.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button className="px-8 py-3 glass border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all">
                                Learn More About Our Process
                            </button>
                        </div>
                    </div>

                    <div className="space-y-10 md:space-y-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                data-aos="fade-left"
                                data-aos-delay={index * 150}
                                className="flex gap-6 items-start"
                            >
                                <div className="text-3xl md:text-4xl font-black text-white/10 font-display">
                                    {step.num}
                                </div>
                                <div>
                                    <h4 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h4>
                                    <p className="text-slate-400 font-sans leading-relaxed text-sm md:text-base">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative vertical line for the steps */}
            <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
        </section>
    );
}
