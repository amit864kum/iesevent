'use client';

/**
 * Section Header Component
 * Reusable section title with subtitle and gold divider
 */

import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    centered = true,
    className = '',
}: SectionHeaderProps) {
    return (
        <motion.div
            className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
        >
            {subtitle && (
                <motion.span
                    className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 sm:mb-3 md:mb-4 block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {subtitle}
                </motion.span>
            )}
            <h2
                className="font-heading transition-colors duration-300"
            >
                {title}
            </h2>
            <motion.div
                className={`divider mt-4 sm:mt-6 md:mt-8 ${centered ? 'divider-center' : ''}`}
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
            />
        </motion.div>
    );
}
