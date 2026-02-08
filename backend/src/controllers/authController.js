/**
 * Auth Controller
 * Handles admin login
 */

/**
 * Admin Login
 * POST /api/auth/login
 * Body: { username, password }
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@luxeevents.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const adminToken = process.env.ADMIN_SECRET_TOKEN;

        // Verify credentials
        if (email === adminEmail && password === adminPassword) {
            res.status(200).json({
                success: true,
                message: 'Login successful',
                token: adminToken
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};
