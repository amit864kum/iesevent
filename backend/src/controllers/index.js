/**
 * Controllers Index
 * Exports all controllers
 */

const galleryController = require('./galleryController');
const testimonialController = require('./testimonialController');
const contactController = require('./contactController');

module.exports = {
    ...galleryController,
    ...testimonialController,
    ...contactController,
};
