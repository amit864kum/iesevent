/**
 * Middleware Index
 * Exports all middleware
 */

const adminAuth = require('./adminAuth');
const validate = require('./validate');
const { apiLimiter, formLimiter, strictLimiter } = require('./rateLimiter');
const errorHandler = require('./errorHandler');

module.exports = {
    adminAuth,
    validate,
    apiLimiter,
    formLimiter,
    strictLimiter,
    errorHandler,
};
