'use client';

/**
 * Services Page
 * Comprehensive service offerings with detailed descriptions
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Heart,
    Building2,
    PartyPopper,
    Sparkles,
    MapPin,
    UtensilsCrossed,
    Camera,
    Music,
    Flower2,
    Car,
} from 'lucide-react';
import { SectionHeader, AnimatedCard } from '@/components';

const mainServices = [
    {
        icon: Heart,
        title: 'Wedding Planning',
        description:
            'From engagement to "I do," we orchestrate every moment of your wedding journey with elegance and precision.',
        features: [
            'Full-service wedding coordination',
            'Venue selection and design',
            'Vendor management',
            'Day-of coordination',
            'Budget planning',
            'Guest experience curation',
        ],
    },
    {
        icon: Building2,
        title: 'Corporate Events',
        description:
            'Elevate your brand with sophisticated corporate gatherings that inspire, engage, and leave lasting impressions.',
        features: [
            'Product launches',
            'Award ceremonies',
            'Conferences & seminars',
            'Team building events',
            'Executive retreats',
            'Networking galas',
        ],
    },
    {
        icon: PartyPopper,
        title: 'Private Celebrations',
        description:
            'Milestones deserve to be celebrated in style. We create memorable experiences for life\'s special moments.',
        features: [
            'Birthday celebrations',
            'Anniversary parties',
            'Graduation events',
            'Retirement parties',
            'Baby showers',
            'Engagement parties',
        ],
    },
    {
        icon: Sparkles,
        title: 'Bespoke Experiences',
        description:
            'Unique, tailor-made events designed exclusively around your vision, pushing the boundaries of imagination.',
        features: [
            'Themed experiences',
            'Destination events',
            'Intimate gatherings',
            'VIP experiences',
            'Cultural celebrations',
            'Multi-day events',
        ],
    },
];

const additionalServices = [
    { icon: MapPin, title: 'Venue Selection', description: 'Finding the perfect backdrop for your event.' },
    { icon: UtensilsCrossed, title: 'Catering Services', description: 'Curated culinary experiences.' },
    { icon: Camera, title: 'Photography & Video', description: 'Capturing every precious moment.' },
    { icon: Music, title: 'Entertainment', description: 'Creating the perfect atmosphere.' },
    { icon: Flower2, title: 'Floral Design', description: 'Stunning floral arrangements.' },
    { icon: Car, title: 'Transportation', description: 'Seamless guest logistics.' },
];

export default function ServicesPage() {
    return (
        <>
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20% left-10% w-72 h-72 bg-gold/10 rounded-full blur-3xl"
                        animate={{ y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-15% right-5% w-96 h-96 bg-gold/5 rounded-full blur-3xl"
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
                            <span className="text-xs sm:text-sm text-gold font-medium uppercase tracking-wider">What We Offer</span>
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 leading-tight">
                            Tailored <span className="gold-gradient">Excellence</span>
                        </h1>

                        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            From intimate gatherings to grand celebrations, we offer comprehensive services 
                            designed to bring your vision to life with sophistication and precision.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ==================== MAIN SERVICES ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="container max-w-6xl">
                    <div className="space-y-20 sm:space-y-28 md:space-y-32">
                        {mainServices.map((service, index) => (
                            <motion.div
                                key={service.title}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:[&>*:last-child]:order-first' : ''}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Content */}
                                <div>
                                    <div className="p-4 bg-gold/10 rounded-lg w-fit mb-6 md:mb-8">
                                        <service.icon className="text-gold" size={40} />
                                    </div>

                                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 leading-tight">{service.title}</h2>

                                    <div className="w-12 h-1 bg-gradient-to-r from-gold to-gold-light mb-8" />

                                    <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10">
                                        {service.description}
                                    </p>

                                    <div className="mb-10 md:mb-12">
                                        <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-6">Key Features</p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                            {service.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-3 text-text-secondary text-base"
                                                >
                                                    <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link 
                                        href="/contact" 
                                        className="inline-flex items-center gap-3 px-7 py-3.5 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-sm tracking-wider transition-all duration-300"
                                    >
                                        Inquire Now
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>

                                {/* Image */}
                                <div className={`relative aspect-[4/3] rounded-xl overflow-hidden border border-border/50 bg-gradient-to-br from-bg-secondary to-bg-tertiary`}>
                                    <div className="absolute -inset-4 sm:-inset-6 border border-gold/20 rounded-xl" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary/40 text-center px-6">
                                        <span className="text-lg sm:text-xl font-medium">{service.title} Image</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== ADDITIONAL SERVICES ==================== */}
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
                            <span className="text-gold text-xs sm:text-sm uppercase tracking-wider font-medium">Complete Solutions</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
                            Additional <span className="gold-gradient">Services</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                        {additionalServices.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-7 sm:p-8 rounded-xl border border-border/50 bg-gradient-to-br from-bg-primary/60 to-bg-primary/30 hover:border-gold/50 transition-all duration-300"
                            >
                                <div className="p-3 bg-gold/10 rounded-lg w-fit mb-6 group-hover:bg-gold/20 transition-colors">
                                    <service.icon className="text-gold" size={28} />
                                </div>
                                <h3 className="font-heading text-lg sm:text-xl mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== PROCESS SECTION ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="container max-w-6xl">
                    <motion.div 
                        className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-1 h-1 bg-gold rounded-full" />
                            <span className="text-gold text-xs sm:text-sm uppercase tracking-wider font-medium">How We Work</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
                            Our <span className="gold-gradient">Process</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
                        {[
                            { step: '01', title: 'Consultation', desc: 'Understanding your vision and goals.' },
                            { step: '02', title: 'Planning', desc: 'Crafting a detailed event strategy.' },
                            { step: '03', title: 'Execution', desc: 'Bringing your event to life.' },
                            { step: '04', title: 'Celebration', desc: 'Creating unforgettable moments.' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-7 sm:p-8 rounded-xl border border-border/50 bg-gradient-to-br from-bg-secondary/60 to-bg-secondary/30 hover:border-gold/50 transition-all"
                            >
                                <span className="text-5xl sm:text-6xl font-heading gold-gradient font-bold">{item.step}</span>
                                <h3 className="font-heading text-lg sm:text-xl md:text-2xl mt-6 mb-3 hover:text-gold transition-colors">{item.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
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
                            Let&apos;s Create Something <span className="gold-gradient">Remarkable</span>
                        </h2>
                        <p className="text-text-secondary text-base sm:text-lg md:text-xl mb-10 sm:mb-12 leading-relaxed">
                            Ready to transform your vision into reality? Contact us today to 
                            discuss your upcoming event and let us help you create magic.
                        </p>
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-black font-semibold uppercase text-sm tracking-wider transition-all duration-300 shadow-lg shadow-gold/20"
                        >
                            Get In Touch
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
