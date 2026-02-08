/**
 * Testimonial Routes
 * API routes for testimonial operations
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require('../controllers');

const { adminAuth, validate, formLimiter } = require('../middleware');

// Validation rules for public submission
const createValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name cannot exceed 100 characters'),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('eventType')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Event type cannot exceed 50 characters'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 20 })
        .withMessage('Message must be at least 20 characters')
        .isLength({ max: 1000 })
        .withMessage('Message cannot exceed 1000 characters'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
];

// Admin update validation (more flexible)
const updateValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Name cannot exceed 100 characters'),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('message')
        .optional()
        .trim()
        .isLength({ min: 20 })
        .withMessage('Message must be at least 20 characters')
        .isLength({ max: 1000 })
        .withMessage('Message cannot exceed 1000 characters'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
    body('isFeatured')
        .optional()
        .isBoolean()
        .withMessage('isFeatured must be a boolean'),
];

// Public routes
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);

// Public submission (rate limited)
router.post('/', formLimiter, createValidation, validate, createTestimonial);

// Admin routes (protected)
router.put('/:id', adminAuth, updateValidation, validate, updateTestimonial);
router.delete('/:id', adminAuth, deleteTestimonial);

module.exports = router;
