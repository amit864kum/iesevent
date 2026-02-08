'use client';

/**
 * Header Component
 * Luxury navigation with glass effect and gold accents
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass py-3 sm:py-4 md:py-5 shadow-lg'
                : 'bg-transparent py-5 sm:py-6 md:py-7'
                }`}
        >
            <div className="container">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-10 flex-shrink-0">
                        <motion.span
                            className="text-2xl sm:text-3xl font-heading tracking-widest gold-gradient hover:text-gold transition-colors"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            LUXE
                        </motion.span>
                    </Link>

                    {/* Navigation Wrapper */}
                    <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 ml-auto">
                        {/* Desktop Navigation */}
                        <ul className="hidden lg:flex items-center gap-6 xl:gap-10">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`relative text-xs xl:text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${pathname === link.href
                                            ? 'text-gold'
                                            : 'text-text-secondary hover:text-gold'
                                            }`}
                                    >
                                        {link.label}
                                        {pathname === link.href && (
                                            <motion.span
                                                layoutId="activeNav"
                                                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gold"
                                                initial={false}
                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Theme Toggle Button */}
                        <motion.button
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-lg transition-colors duration-300 ${isScrolled ? 'hover:bg-bg-tertiary' : 'hover:bg-white/10'
                                } text-text-primary flex-shrink-0`}
                            aria-label="Toggle theme"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>

                        {/* CTA Button - Desktop */}
                        <Link
                            href="/contact"
                            className="hidden lg:inline-flex px-6 py-2.5 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-xs tracking-wider transition-all duration-300 rounded-lg"
                        >
                            Book Now
                        </Link>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="lg:hidden text-text-primary p-2 flex-shrink-0"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </motion.button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden glass border-t border-border origin-top"
                    >
                        <div className="container py-4 sm:py-6">
                            <ul className="flex flex-col gap-2 sm:gap-4">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block py-2 text-sm sm:text-base transition-colors ${pathname === link.href
                                                ? 'text-gold'
                                                : 'text-text-secondary hover:text-gold'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="pt-2 sm:pt-4"
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="btn btn-primary w-full text-xs sm:text-sm"
                                    >
                                        Book Now
                                    </Link>
                                </motion.li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
