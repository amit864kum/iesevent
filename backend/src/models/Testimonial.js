/**
 * Testimonial Model
 * Stores client testimonials (auto-published on submit)
 */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Client name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        eventType: {
            type: String,
            trim: true,
            maxlength: [50, 'Event type cannot exceed 50 characters'],
        },
        message: {
            type: String,
            required: [true, 'Testimonial message is required'],
            trim: true,
            minlength: [20, 'Message must be at least 20 characters'],
            maxlength: [1000, 'Message cannot exceed 1000 characters'],
        },
        rating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
            default: 5,
        },
        isActive: {
            type: Boolean,
            default: true, // Auto-published on submit
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient queries
testimonialSchema.index({ isActive: 1, createdAt: -1 });
testimonialSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
