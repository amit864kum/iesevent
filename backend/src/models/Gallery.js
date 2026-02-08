/**
 * Gallery Model
 * Stores event gallery images with categories
 */

const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Image title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        cloudinaryId: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ['weddings', 'corporate', 'private', 'celebrations', 'other'],
                message: '{VALUE} is not a valid category',
            },
            default: 'other',
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient queries
gallerySchema.index({ category: 1, order: 1 });
gallerySchema.index({ isActive: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
