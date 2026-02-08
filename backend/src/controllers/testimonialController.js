/**
 * Testimonial Controller
 * Handles CRUD operations for testimonials
 */

const { Testimonial } = require('../models');

/**
 * Get all testimonials
 * GET /api/testimonials
 * Query params: featured, limit
 */
const getTestimonials = async (req, res, next) => {
    try {
        const { featured, limit, active } = req.query;
        const filter = {};

        // Filter by active status (default to active only)
        if (active !== undefined) {
            filter.isActive = active === 'true';
        } else {
            filter.isActive = true;
        }

        // Filter by featured if specified
        if (featured === 'true') {
            filter.isFeatured = true;
        }

        let query = Testimonial.find(filter).sort({ createdAt: -1 });

        // Apply limit if specified
        if (limit) {
            query = query.limit(parseInt(limit, 10));
        }

        const testimonials = await query.lean();

        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single testimonial
 * GET /api/testimonials/:id
 */
const getTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id).lean();

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        res.status(200).json({
            success: true,
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create new testimonial (Public - auto-published)
 * POST /api/testimonials
 */
const createTestimonial = async (req, res, next) => {
    try {
        const { name, email, eventType, message, rating } = req.body;

        const testimonial = await Testimonial.create({
            name,
            email,
            eventType,
            message,
            rating: rating ? parseInt(rating, 10) : 5,
            isActive: true, // Auto-published
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for your testimonial!',
            data: {
                id: testimonial._id,
                name: testimonial.name,
                createdAt: testimonial.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update testimonial
 * PUT /api/testimonials/:id (Admin only)
 */
const updateTestimonial = async (req, res, next) => {
    try {
        const { name, email, eventType, message, rating, isActive, isFeatured } = req.body;

        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        // Update fields
        if (name !== undefined) testimonial.name = name;
        if (email !== undefined) testimonial.email = email;
        if (eventType !== undefined) testimonial.eventType = eventType;
        if (message !== undefined) testimonial.message = message;
        if (rating !== undefined) testimonial.rating = parseInt(rating, 10);
        if (isActive !== undefined) testimonial.isActive = isActive;
        if (isFeatured !== undefined) testimonial.isFeatured = isFeatured;

        await testimonial.save();

        res.status(200).json({
            success: true,
            message: 'Testimonial updated successfully',
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete testimonial
 * DELETE /api/testimonials/:id (Admin only)
 */
const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        await testimonial.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
};
