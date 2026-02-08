/**
 * Cloudinary Configuration
 * Sets up Cloudinary for image uploads
 */

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'luxury-events-gallery', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
            { width: 1920, height: 1080, crop: 'limit', quality: 'auto:best' }
        ],
    },
});

// Multer upload middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});

/**
 * Delete image from Cloudinary
 * @param {string} publicId - The public ID of the image to delete
 */
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary image URL
 */
const getPublicIdFromUrl = (url) => {
    if (!url) return null;
    // Extract public ID from URL (format: .../folder/public_id.extension)
    const matches = url.match(/\/luxury-events-gallery\/([^.]+)/);
    return matches ? `luxury-events-gallery/${matches[1]}` : null;
};

module.exports = {
    cloudinary,
    upload,
    deleteImage,
    getPublicIdFromUrl,
};
