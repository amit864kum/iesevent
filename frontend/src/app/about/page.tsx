'use client';

/**
 * About Page
 * Company story, team, and values
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Target, Eye, Gem } from 'lucide-react';
import { SectionHeader, AnimatedCard } from '@/components';

const values = [
    {
        icon: Heart,
        title: 'Passion',
        description: 'We pour our hearts into every event, treating each celebration as if it were our own.',
    },
    {
        icon: Target,
        title: 'Precision',
        description: 'Every detail matters. We plan meticulously to ensure flawless execution.',
    },
    {
        icon: Eye,
        title: 'Vision',
        description: 'We see beyond the ordinary, transforming ideas into extraordinary realities.',
    },
    {
        icon: Gem,
        title: 'Excellence',
        description: 'Good is never enough. We strive for excellence in everything we do.',
    },
];

const timeline = [
    {
        year: '2008',
        title: 'The Beginning',
        description: 'Founded with a vision to redefine event experiences.',
    },
    {
        year: '2012',
        title: 'National Recognition',
        description: 'Awarded "Best Event Planner" by Luxury Events Magazine.',
    },
    {
        year: '2016',
        title: 'International Expansion',
        description: 'Extended services to destination weddings worldwide.',
    },
    {
        year: '2020',
        title: 'Digital Innovation',
        description: 'Pioneered virtual and hybrid event solutions.',
    },
    {
        year: 'Today',
        title: 'Industry Leader',
        description: '500+ successful events and counting.',
    },
];

export default function AboutPage() {
    return (
        <>
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20% left-5% w-72 h-72 bg-gold/10 rounded-full blur-3xl"
                        animate={{ y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-10% right-5% w-96 h-96 bg-gold/5 rounded-full blur-3xl"
                        animate={{ y: [0, -30, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8">
                            <span className="w-2 h-2 bg-gold rounded-full" />
                            <span className="text-xs sm:text-sm text-gold font-medium uppercase tracking-wider">Our Story</span>
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 leading-tight">
                            Creating Magic Since <span className="gold-gradient">2008</span>
                        </h1>

                        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            For over 15 years, we have been transforming ordinary moments into extraordinary memories. 
                            Our passion for perfection has made us the trusted choice for discerning clients worldwide.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ==================== STORY SECTION ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="w-1 h-1 bg-gold rounded-full" />
                                <span className="text-gold text-xs sm:text-sm uppercase tracking-wider font-medium">Who We Are</span>
                            </div>

                            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-8 leading-tight">
                                More Than Event <span className="gold-gradient">Planners</span>
                            </h2>

                            <div className="w-12 h-1 bg-gradient-to-r from-gold to-gold-light mb-10" />

                            <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
                                <p>
                                    At Luxe Events, we believe that every celebration tells a story. We are dreamers, 
                                    creators, and perfectionists who live to bring your vision to life with elegance 
                                    and sophistication.
                                </p>
                                <p>
                                    Our team of seasoned professionals combines creativity with meticulous planning, 
                                    ensuring that every aspect of your event reflects your unique style and exceeds 
                                    your expectations.
                                </p>
                                <p>
                                    From intimate gatherings to grand celebrations, we approach each event with the 
                                    same level of dedication and attention to detail that has earned us our reputation.
                                </p>
                            </div>

                            <Link 
                                href="/services" 
                                className="inline-flex items-center gap-3 px-7 py-3.5 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-sm tracking-wider transition-all duration-300 mt-10"
                            >
                                Explore Our Services
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative aspect-[4/5] bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl overflow-hidden border border-border">
                                <div className="absolute -bottom-6 -left-6 w-2/3 aspect-video bg-gold/15 border border-gold/30 rounded-xl" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent z-10" />
                                <div className="absolute inset-0 flex items-center justify-center text-text-secondary/40">
                                    <span className="text-lg sm:text-xl font-medium">Team Photo</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== VALUES SECTION ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-bg-secondary/40">
                <div className="container max-w-6xl">
                    <motion.div 
                        className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-1 h-1 bg-gold rounded-full" />
                            <span className="text-gold text-xs sm:text-sm uppercase tracking-wider font-medium">Our Philosophy</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
                            Values We <span className="gold-gradient">Live By</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-7 sm:p-8 rounded-xl border border-border/50 bg-gradient-to-br from-bg-primary/60 to-bg-primary/30 hover:border-gold/50 transition-all duration-300"
                            >
                                <div className="p-3 bg-gold/10 rounded-lg w-fit mb-6 group-hover:bg-gold/20 transition-colors">
                                    <value.icon className="text-gold" size={28} />
                                </div>
                                <h3 className="font-heading text-xl sm:text-2xl mb-3 group-hover:text-gold transition-colors">{value.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== TIMELINE SECTION ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="container max-w-5xl">
                    <motion.div 
                        className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-1 h-1 bg-gold rounded-full" />
                            <span className="text-gold text-xs sm:text-sm uppercase tracking-wider font-medium">Our Journey</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
                            Milestone <span className="gold-gradient">Moments</span>
                        </h2>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 md:left-1/2 w-px h-full bg-gradient-to-b from-gold to-gold/10 -translate-x-1/2" />

                        <div className="space-y-8 sm:space-y-12 md:space-y-16">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Content */}
                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-8 md:pl-0`}>
                                        <span className="text-gold text-2xl sm:text-3xl font-heading font-bold">{item.year}</span>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-heading mt-2 mb-3 hover:text-gold transition-colors">{item.title}</h3>
                                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{item.description}</p>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gold rounded-full border-4 sm:border-4 border-bg-primary shadow-lg shadow-gold/20" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-bg-primary via-bg-secondary to-bg-primary">
                <div className="container max-w-4xl">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 leading-tight">
                            Ready to Create Your <span className="gold-gradient">Story</span>?
                        </h2>
                        <p className="text-text-secondary text-base sm:text-lg md:text-xl mb-10 sm:mb-12 leading-relaxed">
                            Let us help you craft an event that reflects your unique vision and 
                            leaves a lasting impression on your guests.
                        </p>
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-black font-semibold uppercase text-sm tracking-wider transition-all duration-300 shadow-lg shadow-gold/20"
                        >
                            Start Planning Today
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
