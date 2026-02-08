'use client';

import { Menu, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminTopbar({
    onMenuClick,
    onRefresh,
}: {
    onMenuClick: () => void;
    onRefresh?: () => void;
}) {
    return (
        <motion.header 
            className="sticky top-0 z-40 h-20 bg-bg-secondary/80 backdrop-blur-sm border-b border-border/30 flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 md:hidden rounded-lg hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-text-primary"
                    title="Toggle menu"
                >
                    <Menu size={24} />
                </button>
                <div className="hidden md:block">
                    <p className="text-sm text-text-secondary font-medium">Admin Panel</p>
                    <h1 className="text-lg font-semibold tracking-tight">Luxe Events Management</h1>
                </div>
            </div>

            {onRefresh && (
                <button
                    onClick={onRefresh}
                    className="hidden sm:flex items-center justify-center gap-2 px-5 py-2.5 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                    <RefreshCcw size={16} />
                    Refresh
                </button>
            )}
        </motion.header>
    );
}
