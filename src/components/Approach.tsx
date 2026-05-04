import React from 'react';

const steps = [
    {
        num: "01",
        title: "Discovery",
        text: "We listen to your needs and understand your business goals first."
    },
    {
        num: "02",
        title: "Development",
        text: "We build your solution using modern, secure, and clear coding standards."
    },
    {
        num: "03",
        title: "Launch",
        text: "We test everything thoroughly ensuring a smooth launch with no surprises."
    }
];

export default function Approach() {
    return (
        <section id="approach" className="h-full overflow-y-auto p-8 md:p-16 bg-slate-50 brand-pattern">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div data-aos="fade-right">
                        <h2 className="text-sm font-black text-secondary tracking-[0.2em] uppercase mb-4">How We Work</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-primary mb-8 leading-tight tracking-tighter">Simple <br /> Process</h3>
                        <p className="text-slate-700 text-lg md:text-xl mb-10 leading-relaxed font-sans font-bold">
                            We follow clear steps to build solutions that meet your business needs.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button className="btn-primary group px-12 py-5 relative overflow-hidden">
                                <span className="relative z-10">Learn More</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8 md:space-y-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                data-aos="fade-left"
                                data-aos-delay={index * 150}
                                className="flex gap-8 items-start group p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 card-hover relative overflow-hidden"
                            >
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/10 transition-colors duration-500" />
                                
                                <div className="text-4xl md:text-5xl font-black text-slate-200 font-display transition-all duration-300 group-hover:text-secondary group-hover:scale-105 relative z-10">
                                    {step.num}
                                </div>
                                <div className="pt-2 relative z-10">
                                    <h4 className="text-xl md:text-2xl font-black text-primary mb-3 group-hover:text-secondary transition-colors duration-300">{step.title}</h4>
                                    <p className="text-slate-600 font-sans leading-relaxed text-base md:text-lg font-bold">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
