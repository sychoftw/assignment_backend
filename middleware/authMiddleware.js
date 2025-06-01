const jwt = require("jsonwebtoken");
require('dotenv').config();

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization || req.body.token;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Request denied, no token provided",
            });
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.username !== process.env.ADMINS_USERNAME) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}

module.exports = authMiddleware;
