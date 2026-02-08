/**
 * Services Index
 * Exports all services
 */

const emailService = require('./emailService');

module.exports = {
    ...emailService,
};
