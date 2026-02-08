/**
 * Routes Index
 * Exports all API routes
 */

const galleryRoutes = require('./galleryRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const contactRoutes = require('./contactRoutes');
const authRoutes = require('./authRoutes');

module.exports = {
    galleryRoutes,
    testimonialRoutes,
    contactRoutes,
    authRoutes,
};
