'use client';

/**
 * Animated Card Component
 * Card with hover effects and entrance animation
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedCard({
    children,
    className = '',
    delay = 0,
}: AnimatedCardProps) {
    return (
        <motion.div
            className={`card p-4 sm:p-5 md:p-6 lg:p-8 ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -8 }}
        >
            {children}
        </motion.div>
    );
}
