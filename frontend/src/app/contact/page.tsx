'use client';

/**
 * Contact Page
 * Contact form with company information and EmailJS integration
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Send,
    CheckCircle,
    MapPin,
    Phone,
    Mail,
    Clock,
    Instagram,
    Facebook,
    Loader2,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { submitContactForm, ContactFormData } from '@/lib/api';

const contactInfo = [
    {
        icon: MapPin,
        title: 'Visit Us',
        details: ['123 Luxury Avenue, Suite 100', 'New York, NY 10001'],
    },
    {
        icon: Phone,
        title: 'Call Us',
        details: ['+1 (234) 567-890', '+1 (234) 567-891'],
    },
    {
        icon: Mail,
        title: 'Email Us',
        details: ['hello@luxeevents.com', 'inquiries@luxeevents.com'],
    },
    {
        icon: Clock,
        title: 'Working Hours',
        details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
    },
];

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        eventType: '',
        eventDate: '',
        message: '',
    });

    const sendEmail = async (data: ContactFormData) => {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.warn('EmailJS not configured in environment variables');
            return;
        }

        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone,
                    subject: data.subject,
                    event_type: data.eventType,
                    event_date: data.eventDate,
                    message: data.message,
                },
                publicKey
            );
        } catch (err) {
            console.error('EmailJS Error:', err);
            // We don't block the submission flow if email fails, just log it
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // 1. Submit to Backend (Database)
            await submitContactForm(formData);

            // 2. Send Email via EmailJS
            await sendEmail(formData);

            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                eventType: '',
                eventDate: '',
                message: '',
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
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
                            <span className="text-xs sm:text-sm text-gold font-medium uppercase tracking-wider">Get In Touch</span>
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 leading-tight">
                            Let&apos;s Start <span className="gold-gradient">Planning</span>
                        </h1>

                        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Ready to create something extraordinary? We&apos;d love to hear about your vision. 
                            Reach out to us and let&apos;s begin your journey to an unforgettable event.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ==================== CONTACT SECTION ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-20">
                        {/* Contact Info */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-2xl sm:text-3xl mb-6 md:mb-8">Contact Information</h2>
                            <div className="w-12 h-1 bg-gradient-to-r from-gold to-gold-light mb-10" />

                            <div className="space-y-8 sm:space-y-10">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        className="flex gap-4 sm:gap-5"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gold/10 border border-gold/30 rounded-lg flex-shrink-0">
                                            <item.icon className="text-gold" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-lg sm:text-xl mb-2 text-white">{item.title}</h4>
                                            {item.details.map((detail, i) => (
                                                <p key={i} className="text-text-secondary text-sm sm:text-base leading-relaxed">
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-border/50">
                                <h4 className="font-heading text-lg sm:text-xl mb-5">Follow Us</h4>
                                <div className="flex gap-4 sm:gap-5">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center border-2 border-border hover:border-gold text-text-secondary hover:text-gold transition-all duration-300 hover:scale-110 rounded-lg"
                                        aria-label="Instagram"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center border-2 border-border hover:border-gold text-text-secondary hover:text-gold transition-all duration-300 hover:scale-110 rounded-lg"
                                        aria-label="Facebook"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-8 sm:p-10 md:p-12 rounded-xl border border-border/50 bg-gradient-to-br from-bg-secondary/60 to-bg-secondary/30">
                                <h2 className="font-heading text-2xl sm:text-3xl mb-3 sm:mb-4">Send Us a Message</h2>
                                <p className="text-text-secondary text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
                                    Fill out the form below and we&apos;ll get back to you within 24-48 hours.
                                </p>

                                {submitted ? (
                                    <motion.div
                                        className="text-center py-12 sm:py-16 md:py-20"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gold/20 mb-6 sm:mb-8">
                                            <CheckCircle className="text-gold" size={32} />
                                        </div>
                                        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Message Sent!</h3>
                                        <p className="text-text-secondary text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed">
                                            Thank you for reaching out. We&apos;ve sent a confirmation to your 
                                            email and will respond shortly.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="inline-flex items-center gap-3 px-7 py-3.5 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-sm tracking-wider transition-all duration-300"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-semibold text-white mb-3">
                                                    Full Name <span className="text-gold">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
                                                    Email Address <span className="text-gold">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-3">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                                    placeholder="+1 (234) 567-890"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-semibold text-white mb-3">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                                    placeholder="How can we help?"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                                            <div>
                                                <label htmlFor="eventType" className="block text-sm font-semibold text-white mb-3">
                                                    Event Type
                                                </label>
                                                <select
                                                    id="eventType"
                                                    name="eventType"
                                                    value={formData.eventType}
                                                    onChange={handleChange}
                                                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                                >
                                                    <option value="">Select event type</option>
                                                    <option value="wedding">Wedding</option>
                                                    <option value="corporate">Corporate Event</option>
                                                    <option value="private">Private Celebration</option>
                                                    <option value="celebration">Special Occasion</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="eventDate" className="block text-sm font-semibold text-white mb-3">
                                                    Tentative Event Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="eventDate"
                                                    name="eventDate"
                                                    value={formData.eventDate}
                                                    onChange={handleChange}
                                                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-white mb-3">
                                                Your Message <span className="text-gold">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                minLength={10}
                                                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-primary/60 border border-border/50 focus:border-gold focus:outline-none rounded-lg text-white text-base transition-colors resize-none"
                                                placeholder="Tell us about your event vision..."
                                                rows={5}
                                            />
                                            <p className="text-xs text-text-secondary mt-2">Minimum 10 characters required</p>
                                        </div>

                                        {error && (
                                            <motion.div
                                                className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm"
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
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={18} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== MAP SECTION PLACEHOLDER ==================== */}
            <section className="h-64 sm:h-80 md:h-96 bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    <div className="text-center px-4 relative z-10">
                        <MapPin size={56} className="mx-auto mb-4 text-gold" />
                        <p className="text-lg sm:text-xl font-semibold mb-2">Interactive Map Would Go Here</p>
                        <p className="text-sm sm:text-base text-text-secondary">123 Luxury Avenue, New York, NY 10001</p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
            </section>
        </>
    );
}
