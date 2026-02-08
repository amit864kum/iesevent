'use client';

/**
 * Testimonials Page
 * Client testimonials with submission form
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import { SectionHeader, AnimatedCard } from '@/components';
import { getTestimonials, submitTestimonial, Testimonial, SubmitTestimonialData } from '@/lib/api';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<SubmitTestimonialData>({
        name: '',
        email: '',
        eventType: '',
        message: '',
        rating: 5,
    });

    useEffect(() => {
        getTestimonials()
            .then((res) => {
                setTestimonials(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await submitTestimonial(formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', eventType: '', message: '', rating: 5 });

            // Refresh testimonials to show the new one
            const res = await getTestimonials();
            setTestimonials(res.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit testimonial');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
                            <span className="text-xs sm:text-sm text-gold font-medium uppercase tracking-wider">Client Stories</span>
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 leading-tight">
                            Words That <span className="gold-gradient">Inspire Us</span>
                        </h1>

                        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Our greatest reward is the joy we bring to our clients. 
                            Here&apos;s what they have to say about their experience with us.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ==================== TESTIMONIALS GRID ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="container max-w-6xl">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-80 bg-bg-secondary rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : testimonials.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <motion.div
                                    key={testimonial._id}
                                    className="flex flex-col p-7 sm:p-8 rounded-xl border border-border/50 bg-gradient-to-br from-bg-secondary/60 to-bg-secondary/30 hover:border-gold/50 transition-all duration-300 h-full"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                >
                                    <div className="flex gap-1.5 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={`${i < testimonial.rating
                                                        ? 'text-gold fill-gold'
                                                        : 'text-border/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-text-secondary mb-8 text-base sm:text-lg leading-relaxed flex-grow italic">
                                        &ldquo;{testimonial.message}&rdquo;
                                    </p>

                                    <div className="border-t border-border/50 pt-6">
                                        <p className="font-heading text-lg sm:text-xl text-white">{testimonial.name}</p>
                                        {testimonial.eventType && (
                                            <p className="text-gold text-xs sm:text-sm font-medium uppercase tracking-wider mt-2">{testimonial.eventType}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-16 sm:py-20 md:py-24">
                            <p className="text-text-secondary text-base sm:text-lg md:text-xl">
                                No testimonials yet. Be the first to share your experience!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==================== SUBMIT TESTIMONIAL FORM ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-bg-secondary/40">
                <div className="container max-w-4xl">
                    <motion.div 
                        className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-1 h-1 bg-gold rounded-full" />
                            <span className="text-gold text-xs sm:text-sm uppercase tracking-wider font-medium">Share Your Experience</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
                            Leave a <span className="gold-gradient">Testimonial</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="p-8 sm:p-10 md:p-12 rounded-xl border border-border/50 bg-gradient-to-br from-bg-primary/50 to-bg-primary/20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {submitted ? (
                            <motion.div
                                className="text-center py-12 sm:py-16"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gold/20 mb-6 sm:mb-8">
                                    <CheckCircle className="text-gold" size={32} />
                                </div>
                                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Thank You!</h3>
                                <p className="text-text-secondary text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed">
                                    Your testimonial has been submitted successfully and is now visible on our site.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="inline-flex items-center gap-3 px-7 py-3.5 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-sm tracking-wider transition-all duration-300"
                                >
                                    Submit Another
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-white mb-3">
                                            Your Name <span className="text-gold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
                                            Email <span className="text-text-secondary text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                                    <div>
                                        <label htmlFor="eventType" className="block text-sm font-semibold text-white mb-3">
                                            Event Type
                                        </label>
                                        <input
                                            type="text"
                                            id="eventType"
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleChange}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                            placeholder="Wedding, Corporate Event, etc."
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="rating" className="block text-sm font-semibold text-white mb-3">
                                            Rating
                                        </label>
                                        <select
                                            id="rating"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                        >
                                            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                                            <option value={4}>⭐⭐⭐⭐ Very Good</option>
                                            <option value={3}>⭐⭐⭐ Good</option>
                                            <option value={2}>⭐⭐ Fair</option>
                                            <option value={1}>⭐ Poor</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-white mb-3">
                                        Your Testimonial <span className="text-gold">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        minLength={20}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors resize-none"
                                        placeholder="Share your experience with us (minimum 20 characters)..."
                                        rows={5}
                                    />
                                    <p className="text-xs text-text-secondary mt-2">Minimum 20 characters required</p>
                                </div>

                                {error && (
                                    <motion.div
                                        className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold uppercase text-sm tracking-wider transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="inline-block animate-spin">⌛</span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Testimonial
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </>
    );
}
