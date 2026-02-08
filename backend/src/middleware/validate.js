/**
 * Validation Middleware
 * Handles express-validator validation results
 */

const { validationResult } = require('express-validator');

/**
 * Process validation results and return errors if any
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }

    next();
};

module.exports = validate;
