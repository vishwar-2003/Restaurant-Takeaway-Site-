const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.customerId = data.id;
        next();
    } catch (err) {
        console.error("JWT error:", err.message);
        res.sendStatus(403);
    }
};
