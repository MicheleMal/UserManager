import jwt from "jsonwebtoken";

export const checkUserRole = (req, res, next) => {
    if (req.user.role === "owner" || req.user.role === "admin") {
        next();
    } else {
        return res.status(401).json({
            message: "UNAUTHORIZED ACCESS",
            data: [],
            check: false,
        });
    }
};

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res
            .status(404)
            .json({ message: "Token nullo", data: [], check: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return res
                    .status(400)
                    .json({ message: error.message, data: [], check: false });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Expired token",
                data: [],
                check: false,
            });
        }
        return res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};
