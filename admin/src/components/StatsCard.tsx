'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    description?: string;
    trend?: string;
    delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, description, trend, delay = 0 }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className="group relative h-full p-7 sm:p-8 bg-gradient-to-br from-bg-secondary/60 to-bg-tertiary/40 border border-border/50 rounded-xl hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10 transition-all duration-300"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Top section: Icon and trend */}
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 sm:p-4 bg-gold/10 rounded-lg text-gold group-hover:bg-gold/20 transition-all duration-300 flex-shrink-0">
                        <Icon size={28} />
                    </div>
                    {trend && (
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                            {trend}
                        </span>
                    )}
                </div>

                {/* Value and title */}
                <div className="flex-1">
                    <p className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                        {value.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-text-secondary uppercase tracking-widest group-hover:text-text-primary transition-colors">
                        {title}
                    </p>
                </div>

                {/* Description */}
                {description && (
                    <div className="mt-6 pt-6 border-t border-border/30">
                        <p className="text-xs sm:text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                            {description}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
