/**
 * Gallery Routes
 * API routes for gallery operations
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
    getGalleryImages,
    getGalleryImage,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    getGalleryCategories,
} = require('../controllers');

const { adminAuth, validate } = require('../middleware');
const { upload } = require('../config/cloudinary');

// Validation rules
const imageValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['weddings', 'corporate', 'private', 'celebrations', 'other'])
        .withMessage('Invalid category'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a positive integer'),
];

const updateValidation = [
    body('title')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),
    body('category')
        .optional()
        .trim()
        .isIn(['weddings', 'corporate', 'private', 'celebrations', 'other'])
        .withMessage('Invalid category'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
];

// Public routes
router.get('/', getGalleryImages);
router.get('/categories', getGalleryCategories);
router.get('/:id', getGalleryImage);

// Admin routes (protected)
router.post(
    '/',
    adminAuth,
    upload.single('image'),
    imageValidation,
    validate,
    createGalleryImage
);

router.put(
    '/:id',
    adminAuth,
    upload.single('image'),
    updateValidation,
    validate,
    updateGalleryImage
);

router.delete('/:id', adminAuth, deleteGalleryImage);

module.exports = router;
