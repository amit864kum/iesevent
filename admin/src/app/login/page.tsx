'use client';

/**
 * Admin Login Page
 * Secure authentication with username/password
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2, User, Key } from 'lucide-react';
import { checkAuth } from '@/lib/auth';
import { login } from '@/lib/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // If already authenticated, redirect to dashboard
        if (checkAuth()) {
            router.push('/');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!email || !password) {
                throw new Error('Please enter both email and password');
            }

            await login(email, password);

            // If success, full reload to ensure API client picks up token
            window.location.href = '/';
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
                        <Lock className="text-gold" size={32} />
                    </div>
                    <h1 className="text-3xl font-heading mb-2">Admin Access</h1>
                    <p className="text-text-secondary">Sign in to manage your luxury events</p>
                </div>

                <div className="card bg-bg-secondary border-border shadow-xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-muted uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10 bg-bg-tertiary"
                                    placeholder="Enter your E-mail"
                                    autoFocus
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2 text-text-muted uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10 bg-bg-tertiary font-mono tracking-widest"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full justify-center group"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Login
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-xs text-text-muted">
                    Luxe Events Management System &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
