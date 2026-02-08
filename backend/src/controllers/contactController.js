/**
 * Contact Controller
 * Handles contact form submissions and admin operations
 */

const { Contact } = require('../models');
// Email services removed in favor of frontend EmailJS

/**
 * Get all contact messages (Admin only)
 * GET /api/contact
 * Query params: read, archived
 */
const getContactMessages = async (req, res, next) => {
    try {
        const { read, archived } = req.query;
        const filter = {};

        // Filter by read status
        if (read !== undefined) {
            filter.isRead = read === 'true';
        }

        // Filter by archived status (default to non-archived)
        if (archived !== undefined) {
            filter.isArchived = archived === 'true';
        } else {
            filter.isArchived = false;
        }

        const messages = await Contact.find(filter)
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single contact message (Admin only)
 * GET /api/contact/:id
 */
const getContactMessage = async (req, res, next) => {
    try {
        const message = await Contact.findById(req.params.id).lean();

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found',
            });
        }

        // Mark as read
        if (!message.isRead) {
            await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
        }

        res.status(200).json({
            success: true,
            data: message,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Submit contact form (Public)
 * POST /api/contact
 */
const submitContactForm = async (req, res, next) => {
    try {
        const { name, email, phone, subject, eventType, eventDate, message } = req.body;

        // Create contact message
        const contactMessage = await Contact.create({
            name,
            email,
            phone,
            subject,
            eventType,
            eventDate: eventDate ? new Date(eventDate) : undefined,
            message,
        });

        // Email sending moved to frontend via EmailJS
        // create contact message only

        res.status(201).json({
            success: true,
            message: 'Thank you for your message. We will get back to you soon!',
            data: {
                id: contactMessage._id,
                createdAt: contactMessage.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update contact message (Admin only)
 * PUT /api/contact/:id
 */
const updateContactMessage = async (req, res, next) => {
    try {
        const { isRead, isArchived } = req.body;

        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found',
            });
        }

        // Update fields
        if (isRead !== undefined) message.isRead = isRead;
        if (isArchived !== undefined) message.isArchived = isArchived;

        await message.save();

        res.status(200).json({
            success: true,
            message: 'Message updated successfully',
            data: message,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete contact message (Admin only)
 * DELETE /api/contact/:id
 */
const deleteContactMessage = async (req, res, next) => {
    try {
        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found',
            });
        }

        await message.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get unread message count (Admin only)
 * GET /api/contact/unread/count
 */
const getUnreadCount = async (req, res, next) => {
    try {
        const count = await Contact.countDocuments({
            isRead: false,
            isArchived: false,
        });

        res.status(200).json({
            success: true,
            data: { count },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getContactMessages,
    getContactMessage,
    submitContactForm,
    updateContactMessage,
    deleteContactMessage,
    getUnreadCount,
};
