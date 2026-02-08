'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Image,
    MessageSquare,
    Mail,
    LogOut,
    X,
} from 'lucide-react';
import { useEffect } from 'react';
import { checkAuth, logout } from '@/lib/auth';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/gallery', label: 'Gallery', icon: Image },
    { href: '/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/messages', label: 'Messages', icon: Mail },
];

export function Sidebar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const pathname = usePathname();

    useEffect(() => {
        if (!checkAuth() && pathname !== '/login') {
            window.location.href = '/login';
        }
    }, [pathname]);

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-bg-secondary to-bg-primary border-r border-border/50 z-50
        transform transition-transform duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
            >
                {/* Header */}
                <div className="h-20 flex items-center justify-between px-6 sm:px-7 border-b border-border/30 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gold rounded-full" />
                        <span className="text-xl font-bold text-gold tracking-wider">LUXE</span>
                    </div>

                    <button
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 sm:p-5 space-y-2 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-medium transition-all duration-200
                ${isActive
                                        ? 'bg-gold/15 text-gold border border-gold/30 shadow-lg shadow-gold/10'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                                    }`}
                            >
                                <item.icon size={22} className="flex-shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 sm:p-5 border-t border-border/30 space-y-2 flex-shrink-0">
                    <a
                        href={process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors font-medium"
                    >
                        <Image size={20} className="flex-shrink-0" />
                        Website
                    </a>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium"
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Overlay (Mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
}
