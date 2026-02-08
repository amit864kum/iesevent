/**
 * Contact Routes
 * API routes for contact form operations
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
    getContactMessages,
    getContactMessage,
    submitContactForm,
    updateContactMessage,
    deleteContactMessage,
    getUnreadCount,
} = require('../controllers');

const { adminAuth, validate, formLimiter } = require('../middleware');

// Validation rules for public contact form
const contactValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name cannot exceed 100 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('phone')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Phone number cannot exceed 20 characters'),
    body('subject')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Subject cannot exceed 200 characters'),
    body('eventType')
        .optional()
        .trim()
        .isIn(['wedding', 'corporate', 'private', 'celebration', 'other', ''])
        .withMessage('Invalid event type'),
    body('eventDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10 })
        .withMessage('Message must be at least 10 characters')
        .isLength({ max: 2000 })
        .withMessage('Message cannot exceed 2000 characters'),
];

// Admin update validation
const updateValidation = [
    body('isRead')
        .optional()
        .isBoolean()
        .withMessage('isRead must be a boolean'),
    body('isArchived')
        .optional()
        .isBoolean()
        .withMessage('isArchived must be a boolean'),
];

// Public route (rate limited)
router.post('/', formLimiter, contactValidation, validate, submitContactForm);

// Admin routes (protected)
router.get('/', adminAuth, getContactMessages);
router.get('/unread/count', adminAuth, getUnreadCount);
router.get('/:id', adminAuth, getContactMessage);
router.put('/:id', adminAuth, updateValidation, validate, updateContactMessage);
router.delete('/:id', adminAuth, deleteContactMessage);

module.exports = router;
