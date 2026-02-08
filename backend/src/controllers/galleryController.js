/**
 * Gallery Controller
 * Handles CRUD operations for gallery images
 */

const { Gallery } = require('../models');
const { deleteImage, getPublicIdFromUrl } = require('../config/cloudinary');

/**
 * Get all gallery images
 * GET /api/gallery
 * Query params: category, active
 */
const getGalleryImages = async (req, res, next) => {
    try {
        const { category, active } = req.query;
        const filter = {};

        // Filter by category if provided
        if (category && category !== 'all') {
            filter.category = category;
        }

        // Filter by active status (default to active only for public)
        if (active !== undefined) {
            filter.isActive = active === 'true';
        } else {
            filter.isActive = true;
        }

        const images = await Gallery.find(filter)
            .sort({ order: 1, createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: images.length,
            data: images,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single gallery image
 * GET /api/gallery/:id
 */
const getGalleryImage = async (req, res, next) => {
    try {
        const image = await Gallery.findById(req.params.id).lean();

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        res.status(200).json({
            success: true,
            data: image,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create new gallery image
 * POST /api/gallery (Admin only)
 */
const createGalleryImage = async (req, res, next) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image',
            });
        }

        const { title, description, category, order } = req.body;

        const image = await Gallery.create({
            title,
            description,
            category,
            order: order ? parseInt(order, 10) : 0,
            imageUrl: req.file.path,
            cloudinaryId: req.file.filename,
        });

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: image,
        });
    } catch (error) {
        // If error occurs, try to delete the uploaded image from Cloudinary
        if (req.file && req.file.filename) {
            await deleteImage(req.file.filename).catch(console.error);
        }
        next(error);
    }
};

/**
 * Update gallery image
 * PUT /api/gallery/:id (Admin only)
 */
const updateGalleryImage = async (req, res, next) => {
    try {
        const { title, description, category, order, isActive } = req.body;

        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        // Update fields
        if (title !== undefined) image.title = title;
        if (description !== undefined) image.description = description;
        if (category !== undefined) image.category = category;
        if (order !== undefined) image.order = parseInt(order, 10);
        if (isActive !== undefined) image.isActive = isActive;

        // If new image uploaded, replace old one
        if (req.file) {
            // Delete old image from Cloudinary
            const oldPublicId = image.cloudinaryId;
            if (oldPublicId) {
                await deleteImage(oldPublicId).catch(console.error);
            }

            // Update with new image
            image.imageUrl = req.file.path;
            image.cloudinaryId = req.file.filename;
        }

        await image.save();

        res.status(200).json({
            success: true,
            message: 'Image updated successfully',
            data: image,
        });
    } catch (error) {
        // If error occurs and new file was uploaded, clean up
        if (req.file && req.file.filename) {
            await deleteImage(req.file.filename).catch(console.error);
        }
        next(error);
    }
};

/**
 * Delete gallery image
 * DELETE /api/gallery/:id (Admin only)
 */
const deleteGalleryImage = async (req, res, next) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        // Delete image from Cloudinary
        if (image.cloudinaryId) {
            await deleteImage(image.cloudinaryId).catch(console.error);
        }

        await image.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get gallery categories with counts
 * GET /api/gallery/categories
 */
const getGalleryCategories = async (req, res, next) => {
    try {
        const categories = await Gallery.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        const formattedCategories = categories.map((cat) => ({
            name: cat._id,
            count: cat.count,
        }));

        res.status(200).json({
            success: true,
            data: formattedCategories,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getGalleryImages,
    getGalleryImage,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    getGalleryCategories,
};
