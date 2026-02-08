/**
 * Contact Model
 * Stores contact form submissions
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            trim: true,
            maxlength: [20, 'Phone number cannot exceed 20 characters'],
        },
        subject: {
            type: String,
            trim: true,
            maxlength: [200, 'Subject cannot exceed 200 characters'],
        },
        eventType: {
            type: String,
            trim: true,
            enum: {
                values: ['wedding', 'corporate', 'private', 'celebration', 'other', ''],
                message: '{VALUE} is not a valid event type',
            },
        },
        eventDate: {
            type: Date,
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient queries
contactSchema.index({ isRead: 1, createdAt: -1 });
contactSchema.index({ isArchived: 1 });

module.exports = mongoose.model('Contact', contactSchema);
