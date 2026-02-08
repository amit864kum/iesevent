/**
 * Footer Component
 * Elegant footer with contact info and social links
 */

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Our Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' },
];

const services = [
    'Wedding Planning',
    'Corporate Events',
    'Private Celebrations',
    'Venue Selection',
    'Catering Services',
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-bg-primary to-bg-secondary border-t border-border/50">
            {/* Main Footer */}
            <div className="container py-16 sm:py-20 md:py-24 lg:py-28">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <Link href="/" className="inline-block mb-6 sm:mb-8">
                            <span className="text-2xl sm:text-3xl font-heading tracking-widest gold-gradient hover:text-gold transition-colors">
                                LUXE
                            </span>
                        </Link>
                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
                            Creating extraordinary moments and unforgettable experiences.
                            Your vision, our expertise – together we craft perfection.
                        </p>
                        <div className="flex gap-4 sm:gap-5">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center border-2 border-border hover:border-gold text-text-secondary hover:text-gold transition-all duration-300 hover:scale-110 rounded-lg"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center border-2 border-border hover:border-gold text-text-secondary hover:text-gold transition-all duration-300 hover:scale-110 rounded-lg"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg sm:text-xl font-heading text-white mb-6 sm:mb-8">Quick Links</h4>
                        <ul className="space-y-3 sm:space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-text-secondary text-sm sm:text-base hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                                    >
                                        {link.label}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg sm:text-xl font-heading text-white mb-6 sm:mb-8">Our Services</h4>
                        <ul className="space-y-3 sm:space-y-4">
                            {services.map((service) => (
                                <li key={service}>
                                    <span className="text-text-secondary text-sm sm:text-base hover:text-gold transition-colors cursor-default">
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg sm:text-xl font-heading text-white mb-6 sm:mb-8">Contact Us</h4>
                        <ul className="space-y-4 sm:space-y-5">
                            <li className="flex items-start gap-4">
                                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                                <span className="text-text-secondary text-sm sm:text-base leading-relaxed">
                                    123 Luxury Avenue, Suite 100<br />
                                    New York, NY 10001
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone size={18} className="text-gold flex-shrink-0" />
                                <a
                                    href="tel:+1234567890"
                                    className="text-text-secondary text-sm sm:text-base hover:text-gold transition-colors duration-300"
                                >
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail size={18} className="text-gold flex-shrink-0" />
                                <a
                                    href="mailto:hello@luxeevents.com"
                                    className="text-text-secondary text-sm sm:text-base hover:text-gold transition-colors duration-300 break-all"
                                >
                                    hello@luxeevents.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="container py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                        <p className="text-text-muted text-xs sm:text-sm">
                            © {currentYear} Luxe Events. All rights reserved.
                        </p>
                        <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                            <Link
                                href="/privacy"
                                className="text-text-muted hover:text-gold transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-text-muted hover:text-gold transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
