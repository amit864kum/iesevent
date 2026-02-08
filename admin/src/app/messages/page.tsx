'use client';

/**
 * Admin Messages Management Page
 * View contact form submissions
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    MailOpen,
    Archive,
    Trash2,
    X,
    Phone,
    Calendar,
    Eye,
} from 'lucide-react';
import {
    getContactMessages,
    markMessageAsRead,
    archiveMessage,
    deleteContactMessage,
    ContactMessage,
} from '@/lib/api';

export default function MessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [showArchived, setShowArchived] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (selectedMessage) setSelectedMessage(null);
                if (deleteConfirm) setDeleteConfirm(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMessage, deleteConfirm]);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await getContactMessages(showArchived);
            setMessages(res.data);
        } catch (err) {
            console.error('Failed to fetch messages:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [showArchived]);

    const handleMarkAsRead = async (id: string) => {
        try {
            await markMessageAsRead(id);
            fetchMessages();
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    const handleArchive = async (id: string) => {
        try {
            await archiveMessage(id);
            setSelectedMessage(null);
            fetchMessages();
        } catch (err) {
            console.error('Failed to archive:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteContactMessage(id);
            setDeleteConfirm(null);
            setSelectedMessage(null);
            fetchMessages();
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    const openMessage = async (message: ContactMessage) => {
        setSelectedMessage(message);
        if (!message.isRead) {
            handleMarkAsRead(message._id);
        }
    };

    const unreadCount = messages.filter((m) => !m.isRead).length;

    return (
        <div className="space-y-10 pb-8">
            {/* ===== HEADER ===== */}
            <div className="border-b border-border/30 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Messages</h1>
                        <p className="text-text-secondary mt-3 flex items-center gap-2">
                            <Mail size={16} className="text-gold" />
                            {unreadCount > 0
                                ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
                                : 'Contact form submissions'}
                        </p>
                    </div>
                    <div className="flex gap-2 p-1.5 bg-bg-secondary/50 rounded-lg border border-border/50 flex-shrink-0">
                        <button
                            onClick={() => setShowArchived(false)}
                            className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all ${!showArchived ? 'bg-gold/10 text-gold border border-gold/30 shadow-md shadow-gold/10' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            Inbox
                        </button>
                        <button
                            onClick={() => setShowArchived(true)}
                            className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${showArchived ? 'bg-gold/10 text-gold border border-gold/30 shadow-md shadow-gold/10' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            <Archive size={16} />
                            Archived
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== MESSAGES LIST ===== */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-bg-secondary/50 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : messages.length > 0 ? (
                <div className="space-y-3">
                    {messages.map((message) => (
                        <motion.div
                            key={message._id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => openMessage(message)}
                            className={`group p-6 rounded-xl border transition-all cursor-pointer ${!message.isRead 
                                ? 'bg-gradient-to-r from-gold/5 to-transparent border-gold/40 hover:border-gold/60 shadow-md shadow-gold/10' 
                                : 'bg-bg-secondary/30 border-border/50 hover:border-gold/30'
                            }`}
                        >
                            <div className="flex items-start gap-4 sm:gap-6">
                                <div className={`flex-shrink-0 p-3 rounded-lg transition-all ${!message.isRead ? 'bg-gold/15 text-gold' : 'bg-bg-tertiary text-text-secondary group-hover:text-gold'}`}>
                                    {message.isRead ? (
                                        <MailOpen size={24} />
                                    ) : (
                                        <Mail size={24} />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className={`font-semibold text-base sm:text-lg truncate transition-colors ${!message.isRead ? 'text-white' : 'text-text-primary group-hover:text-white'}`}>
                                            {message.name}
                                        </h3>
                                        {!message.isRead && (
                                            <span className="w-2.5 h-2.5 bg-gold rounded-full flex-shrink-0 animate-pulse" />
                                        )}
                                    </div>
                                    <p className="text-sm sm:text-base text-text-secondary truncate mb-2 group-hover:text-text-primary">
                                        {message.subject || 'No subject'}
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-text-secondary/70">
                                        {message.phone && (
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={12} />
                                                <span>{message.phone}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} />
                                            <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openMessage(message);
                                        }}
                                        className="flex items-center justify-center p-2.5 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors"
                                        title="View"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    {!showArchived && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleArchive(message._id);
                                            }}
                                            className="flex items-center justify-center p-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                                            title="Archive"
                                        >
                                            <Archive size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteConfirm(message._id);
                                        }}
                                        className="btn btn-icon hover:text-red-500"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="card text-center py-12">
                    <Mail size={48} className="mx-auto text-text-muted mb-4" />
                    <p className="text-text-secondary">
                        {showArchived ? 'No archived messages' : 'No messages yet'}
                    </p>
                </div>
            )}

            {/* Message Detail Modal */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMessage(null)}
                    >
                        <motion.div
                            className="modal-content max-w-2xl"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2 className="text-xl font-semibold">Message Details</h2>
                                <button onClick={() => setSelectedMessage(null)} className="btn btn-icon">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-body space-y-6">
                                {/* Sender Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-text-muted uppercase tracking-wider">From</label>
                                        <p className="font-semibold">{selectedMessage.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-text-muted uppercase tracking-wider">Email</label>
                                        <p className="text-gold">{selectedMessage.email}</p>
                                    </div>
                                    {selectedMessage.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} className="text-text-muted" />
                                            <span>{selectedMessage.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-text-muted" />
                                        <span className="text-sm">
                                            {new Date(selectedMessage.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Details */}
                                {(selectedMessage.eventType || selectedMessage.eventDate) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                                        {selectedMessage.eventType && (
                                            <div>
                                                <label className="text-xs text-text-muted uppercase tracking-wider">
                                                    Event Type
                                                </label>
                                                <p className="capitalize">{selectedMessage.eventType}</p>
                                            </div>
                                        )}
                                        {selectedMessage.eventDate && (
                                            <div>
                                                <label className="text-xs text-text-muted uppercase tracking-wider">
                                                    Event Date
                                                </label>
                                                <p>{new Date(selectedMessage.eventDate).toLocaleDateString()}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Subject & Message */}
                                <div className="pt-4 border-t border-border">
                                    {selectedMessage.subject && (
                                        <div className="mb-4">
                                            <label className="text-xs text-text-muted uppercase tracking-wider">
                                                Subject
                                            </label>
                                            <p className="font-semibold">{selectedMessage.subject}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-xs text-text-muted uppercase tracking-wider">
                                            Message
                                        </label>
                                        <p className="text-text-secondary whitespace-pre-wrap leading-relaxed mt-2">
                                            {selectedMessage.message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Inquiry'}`}
                                    className="btn btn-primary"
                                >
                                    Reply via Email
                                </a>
                                {!selectedMessage.isArchived && (
                                    <button
                                        onClick={() => handleArchive(selectedMessage._id)}
                                        className="btn btn-secondary"
                                    >
                                        <Archive size={16} />
                                        Archive
                                    </button>
                                )}
                            </div>
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
                                <h2 className="text-xl font-semibold">Delete Message</h2>
                                <button onClick={() => setDeleteConfirm(null)} className="btn btn-icon">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="text-text-secondary">
                                    Are you sure you want to delete this message? This action cannot be undone.
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
