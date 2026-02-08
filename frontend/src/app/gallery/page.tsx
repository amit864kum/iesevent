'use client';

/**
 * Gallery Page
 * Event gallery with category-based filtering
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getGalleryImages, getGalleryCategories, GalleryImage } from '@/lib/api';

// Category labels
const categoryLabels: Record<string, string> = {
    all: 'All Events',
    weddings: 'Weddings',
    corporate: 'Corporate',
    private: 'Private Events',
    celebrations: 'Celebrations',
    other: 'Other',
};

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        // Fetch categories
        getGalleryCategories()
            .then((res) => setCategories(res.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        // Fetch images based on active category
        getGalleryImages(activeCategory === 'all' ? undefined : activeCategory)
            .then((res) => {
                setImages(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [activeCategory]);

    // Close lightbox on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <>
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20% left-10% w-72 h-72 bg-gold/10 rounded-full blur-3xl"
                        animate={{ y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-15% right-5% w-96 h-96 bg-gold/5 rounded-full blur-3xl"
                        animate={{ y: [0, -30, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8">
                            <span className="w-2 h-2 bg-gold rounded-full" />
                            <span className="text-xs sm:text-sm text-gold font-medium uppercase tracking-wider">Our Portfolio</span>
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 leading-tight">
                            A Glimpse of <span className="gold-gradient">Excellence</span>
                        </h1>

                        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Explore our curated collection of extraordinary events, each one a testament 
                            to our commitment to creating unforgettable experiences.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ==================== GALLERY SECTION ==================== */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="container max-w-6xl">
                    {/* Category Filters */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 sm:mb-20 md:mb-24"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            onClick={() => {
                                setLoading(true);
                                setActiveCategory('all');
                            }}
                            className={`px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-2 ${activeCategory === 'all'
                                ? 'bg-gold text-black border-gold'
                                : 'border-border text-text-secondary hover:border-gold hover:text-gold'
                                }`}
                        >
                            All Events
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => {
                                    setLoading(true);
                                    setActiveCategory(category.name);
                                }}
                                className={`px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-2 whitespace-nowrap ${activeCategory === category.name
                                    ? 'bg-gold text-black border-gold'
                                    : 'border-border text-text-secondary hover:border-gold hover:text-gold'
                                    }`}
                            >
                                {categoryLabels[category.name] || category.name}
                            </button>
                        ))}
                    </motion.div>

                    {/* Gallery Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="aspect-[4/3] bg-bg-secondary rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : images.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
                            layout
                        >
                            <AnimatePresence mode="popLayout">
                                {images.map((image, index) => (
                                    <motion.div
                                        key={image._id}
                                        className="relative aspect-[4/3] overflow-hidden group cursor-pointer rounded-xl border border-border/50 hover:border-gold/50 transition-all duration-300"
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                                                <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                                    {categoryLabels[image.category] || image.category}
                                                </span>
                                                <h4 className="text-white font-heading text-sm sm:text-lg md:text-xl mt-3">
                                                    {image.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-16 sm:py-20 md:py-24">
                            <p className="text-text-secondary text-base sm:text-lg md:text-xl">
                                No images found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ==================== LIGHTBOX ==================== */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 text-white hover:text-gold transition-colors p-2 hover:bg-white/10 rounded-lg"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close lightbox"
                        >
                            <X size={28} />
                        </button>

                        <motion.div
                            className="relative max-w-5xl max-h-[75vh] sm:max-h-[85vh] w-full"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gold/30">
                                <Image
                                    src={selectedImage.imageUrl}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority
                                />
                            </div>
                            <div className="text-center mt-6 sm:mt-8 md:mt-10">
                                <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                    {categoryLabels[selectedImage.category] || selectedImage.category}
                                </span>
                                <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-heading mt-3 sm:mt-4">
                                    {selectedImage.title}
                                </h3>
                                {selectedImage.description && (
                                    <p className="text-text-secondary text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
                                        {selectedImage.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
