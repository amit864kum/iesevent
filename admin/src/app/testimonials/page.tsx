'use client';

/**
 * Admin Testimonials Management Page
 * CRUD operations for testimonials
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Pencil,
    Trash2,
    X,
    Star,
    MessageSquare,
    Loader2,
    ToggleLeft,
    ToggleRight,
} from 'lucide-react';
import {
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
    Testimonial,
} from '@/lib/api';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (editingTestimonial) setEditingTestimonial(null);
                if (deleteConfirm) setDeleteConfirm(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [editingTestimonial, deleteConfirm]);

    const fetchTestimonials = async () => {
        try {
            const res = await getTestimonials();
            setTestimonials(res.data);
        } catch (err) {
            console.error('Failed to fetch testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleToggleFeatured = async (testimonial: Testimonial) => {
        try {
            await updateTestimonial(testimonial._id, {
                isFeatured: !testimonial.isFeatured,
            });
            fetchTestimonials();
        } catch (err) {
            console.error('Failed to update:', err);
        }
    };

    const handleToggleActive = async (testimonial: Testimonial) => {
        try {
            await updateTestimonial(testimonial._id, {
                isActive: !testimonial.isActive,
            });
            fetchTestimonials();
        } catch (err) {
            console.error('Failed to update:', err);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTestimonial) return;

        setSubmitting(true);
        setError('');

        try {
            await updateTestimonial(editingTestimonial._id, {
                name: editingTestimonial.name,
                email: editingTestimonial.email,
                eventType: editingTestimonial.eventType,
                message: editingTestimonial.message,
                rating: editingTestimonial.rating,
            });
            setEditingTestimonial(null);
            fetchTestimonials();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTestimonial(id);
            setDeleteConfirm(null);
            fetchTestimonials();
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    return (
        <div className="space-y-10 pb-8">
            {/* ===== HEADER ===== */}
            <div className="border-b border-border/30 pb-8">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Testimonials Management</h1>
                <p className="text-text-secondary mt-3 flex items-center gap-2">
                    <MessageSquare size={16} className="text-gold" />
                    Manage and approve client reviews and feedback
                </p>
            </div>

            {/* ===== TESTIMONIALS LIST ===== */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-72 bg-bg-secondary/50 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-xl border border-border/50 hover:border-gold/50 bg-gradient-to-br from-bg-secondary/60 to-bg-tertiary/30 transition-all duration-300 ${!testimonial.isActive ? 'opacity-60 grayscale' : ''}`}
                        >
                            {/* Top Section - Stars & Actions */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < testimonial.rating
                                                    ? 'text-gold fill-gold'
                                                    : 'text-border'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {testimonial.isFeatured && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-gold/10 text-gold border border-gold/30">
                                                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                                Featured
                                            </span>
                                        )}
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${testimonial.isActive ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
                                            {testimonial.isActive ? 'Active' : 'Hidden'}
                                        </span>
                                    </div>
                                </div>

                                {/* Message */}
                                <p className="text-text-secondary text-sm italic mb-8 leading-relaxed min-h-16 relative">
                                    <span className="text-4xl text-gold/15 font-serif absolute -top-2 -left-3">&ldquo;</span>
                                    {testimonial.message}
                                    <span className="text-4xl text-gold/15 font-serif absolute -bottom-4 -right-2">&rdquo;</span>
                                </p>
                            </div>

                            {/* Bottom Section - Author & Actions */}
                            <div className="space-y-4 pt-6 border-t border-border/30">
                                <div>
                                    <h3 className="font-semibold text-white text-base">{testimonial.name}</h3>
                                    <p className="text-xs sm:text-sm text-text-secondary mt-1 uppercase tracking-wider">
                                        {testimonial.eventType || 'Event Client'}
                                    </p>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                                    <button
                                        onClick={() => setEditingTestimonial(testimonial)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg text-sm font-medium transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={14} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(testimonial._id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleToggleFeatured(testimonial)}
                                        className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${testimonial.isFeatured ? 'bg-gold/10 text-gold' : 'bg-text-secondary/10 text-text-secondary hover:bg-text-secondary/20'}`}
                                        title={testimonial.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                                    >
                                        {testimonial.isFeatured ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 rounded-xl border-2 border-dashed border-border/50">
                    <MessageSquare size={48} className="text-text-secondary/50 mb-4" />
                    <p className="text-text-secondary text-center">
                        No testimonials yet. Testimonials submitted by users will appear here.
                    </p>
                </div>
            )}

            {/* Edit Modal */}
            <AnimatePresence>
                {editingTestimonial && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setEditingTestimonial(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2 className="text-xl font-semibold">Edit Testimonial</h2>
                                <button
                                    onClick={() => setEditingTestimonial(null)}
                                    className="btn btn-icon"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate}>
                                <div className="modal-body space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="label">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={editingTestimonial.name}
                                                onChange={(e) =>
                                                    setEditingTestimonial({
                                                        ...editingTestimonial,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="label">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={editingTestimonial.email || ''}
                                                onChange={(e) =>
                                                    setEditingTestimonial({
                                                        ...editingTestimonial,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="input-field"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="eventType" className="label">Event Type</label>
                                            <input
                                                type="text"
                                                id="eventType"
                                                value={editingTestimonial.eventType || ''}
                                                onChange={(e) =>
                                                    setEditingTestimonial({
                                                        ...editingTestimonial,
                                                        eventType: e.target.value,
                                                    })
                                                }
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="rating" className="label">Rating</label>
                                            <select
                                                id="rating"
                                                value={editingTestimonial.rating}
                                                onChange={(e) =>
                                                    setEditingTestimonial({
                                                        ...editingTestimonial,
                                                        rating: parseInt(e.target.value, 10),
                                                    })
                                                }
                                                className="input-field"
                                            >
                                                {[5, 4, 3, 2, 1].map((r) => (
                                                    <option key={r} value={r}>
                                                        {r} Star{r > 1 ? 's' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="label">Message</label>
                                        <textarea
                                            id="message"
                                            value={editingTestimonial.message}
                                            onChange={(e) =>
                                                setEditingTestimonial({
                                                    ...editingTestimonial,
                                                    message: e.target.value,
                                                })
                                            }
                                            required
                                            className="input-field"
                                            rows={4}
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-500 text-sm">{error}</p>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        onClick={() => setEditingTestimonial(null)}
                                        className="btn btn-secondary"
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setDeleteConfirm(null)}
                    >
                        <motion.div
                            className="modal-content max-w-md"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2 className="text-xl font-semibold">Delete Testimonial</h2>
                                <button onClick={() => setDeleteConfirm(null)} className="btn btn-icon">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="text-text-secondary">
                                    Are you sure you want to delete this testimonial? This action cannot be undone.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
