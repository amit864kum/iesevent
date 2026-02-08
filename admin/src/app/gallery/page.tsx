'use client';

/**
 * Admin Gallery Management Page
 * CRUD operations with image upload
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Pencil,
    Trash2,
    X,
    Upload,
    Loader2,
} from 'lucide-react';
import {
    getGalleryImages,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    GalleryImage,
} from '@/lib/api';

const categories = [
    { value: 'weddings', label: 'Weddings' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'private', label: 'Private Events' },
    { value: 'celebrations', label: 'Celebrations' },
    { value: 'other', label: 'Other' },
];

interface FormData {
    title: string;
    description: string;
    category: string;
    order: string;
}

const initialFormData: FormData = {
    title: '',
    description: '',
    category: 'weddings',
    order: '0',
};

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const fetchImages = async () => {
        try {
            const res = await getGalleryImages();
            setImages(res.data);
        } catch (err) {
            console.error('Failed to fetch images:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const openModal = (image?: GalleryImage) => {
        if (image) {
            setEditingImage(image);
            setFormData({
                title: image.title,
                description: image.description || '',
                category: image.category,
                order: String(image.order),
            });
            setPreviewUrl(image.imageUrl);
        } else {
            setEditingImage(null);
            setFormData(initialFormData);
            setPreviewUrl(null);
        }
        setSelectedFile(null);
        setError('');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingImage(null);
        setFormData(initialFormData);
        setSelectedFile(null);
        setPreviewUrl(null);
        setError('');
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalOpen) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const formDataObj = new FormData();
            formDataObj.append('title', formData.title);
            formDataObj.append('description', formData.description);
            formDataObj.append('category', formData.category);
            formDataObj.append('order', formData.order);

            if (selectedFile) {
                formDataObj.append('image', selectedFile);
            }

            if (editingImage) {
                await updateGalleryImage(editingImage._id, formDataObj);
            } else {
                if (!selectedFile) {
                    setError('Please select an image');
                    setSubmitting(false);
                    return;
                }
                await createGalleryImage(formDataObj);
            }

            closeModal();
            fetchImages();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save image');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteGalleryImage(id);
            setDeleteConfirm(null);
            fetchImages();
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    return (
        <div className="space-y-10 pb-8">
            {/* ===== HEADER ===== */}
            <div className="border-b border-border/30 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Gallery Management</h1>
                        <p className="text-text-secondary mt-3 flex items-center gap-2">
                            <Upload size={16} className="text-gold" />
                            Curate and manage your event portfolio images
                        </p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-gold/40 sm:w-auto w-full"
                    >
                        <Plus size={20} />
                        Add Image
                    </button>
                </div>
            </div>

            {/* ===== GALLERY GRID ===== */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-[4/3] bg-bg-secondary/50 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
                    {images.map((image) => (
                        <motion.div
                            key={image._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group relative overflow-hidden rounded-xl border border-border/50 hover:border-gold/50 transition-all duration-300 bg-bg-secondary/30"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={image.imageUrl}
                                    alt={image.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openModal(image)}
                                            className="p-3 bg-white/15 backdrop-blur-sm rounded-lg text-white hover:bg-gold hover:text-black transition-all duration-300 transform scale-75 group-hover:scale-100"
                                            title="Edit"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(image._id)}
                                            className="p-3 bg-white/15 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 hover:text-white transition-all duration-300 transform scale-75 group-hover:scale-100"
                                            title="Delete"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                {/* Category badge */}
                                <div className="absolute top-3 right-3">
                                    <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-xs text-gold font-semibold border border-gold/30 uppercase tracking-wider">
                                        {image.category}
                                    </span>
                                </div>
                            </div>
                            {/* Image info */}
                            <div className="p-5 sm:p-6">
                                <h3 className="font-semibold text-base truncate text-white group-hover:text-gold transition-colors">
                                    {image.title}
                                </h3>
                                {image.description && (
                                    <p className="text-xs sm:text-sm text-text-secondary mt-2 line-clamp-2">
                                        {image.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 rounded-xl border-2 border-dashed border-border/50">
                    <Upload size={48} className="text-text-secondary/50 mb-4" />
                    <p className="text-text-secondary mb-6 text-center">No images in the gallery yet</p>
                    <button onClick={() => openModal()} className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-black font-semibold rounded-lg transition-all">
                        <Plus size={18} />
                        Add Your First Image
                    </button>
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2 className="text-xl font-semibold">
                                    {editingImage ? 'Edit Image' : 'Add New Image'}
                                </h2>
                                <button onClick={closeModal} className="btn btn-icon">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="modal-body space-y-4">
                                    {/* Image Upload */}
                                    <div>
                                        <label className="label">Image</label>
                                        <div
                                            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${previewUrl ? 'border-gold' : 'border-border hover:border-border-light'
                                                }`}
                                        >
                                            {previewUrl ? (
                                                <div className="relative aspect-video max-w-md mx-auto">
                                                    <Image
                                                        src={previewUrl}
                                                        alt="Preview"
                                                        fill
                                                        className="object-contain rounded"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="py-8">
                                                    <Upload className="mx-auto text-text-muted mb-2" size={40} />
                                                    <p className="text-text-secondary">
                                                        Click or drag to upload an image
                                                    </p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        {!editingImage && (
                                            <p className="text-xs text-text-muted mt-1">
                                                Supported: JPG, PNG, WebP (max 10MB)
                                            </p>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title" className="label">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            required
                                            className="input-field"
                                            placeholder="Enter image title"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category" className="label">
                                            Category *
                                        </label>
                                        <select
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({ ...formData, category: e.target.value })
                                            }
                                            className="input-field"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="label">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({ ...formData, description: e.target.value })
                                            }
                                            className="input-field"
                                            placeholder="Optional description"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Order */}
                                    <div>
                                        <label htmlFor="order" className="label">
                                            Display Order
                                        </label>
                                        <input
                                            type="number"
                                            id="order"
                                            value={formData.order}
                                            onChange={(e) =>
                                                setFormData({ ...formData, order: e.target.value })
                                            }
                                            className="input-field"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-500 text-sm">{error}</p>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        onClick={closeModal}
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
                                            'Save Image'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
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
                                <h2 className="text-xl font-semibold">Delete Image</h2>
                                <button onClick={() => setDeleteConfirm(null)} className="btn btn-icon">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="text-text-secondary">
                                    Are you sure you want to delete this image? This action cannot be undone.
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
