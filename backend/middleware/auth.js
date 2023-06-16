import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res
            .status(400)
            .json({ message: "Token nullo", data: [], check: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });
        }

        req.user = user;
        next();
    });
};
