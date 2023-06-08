import connection from "../db/connectionDB.js";

// Gets all registered users
export const getAllUsers = (req, res) => {
    const query = `SELECT * 
                    FROM users`;

    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });

        try {
            return res
                .status(200)
                .json({ message: "Users", data: result, check: true });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });
        }
    });
};

// Get information about a user by a specific id
export const getUserById = (req, res) => {
    const { id } = req.user;

    const query = `SELECT * FROM users WHERE id=${id}`;

    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });

        try {
            return res.status(200).json({
                message: "User information",
                data: result,
                check: true,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });
        }
    });
};

// Change user information
export const modiifyUser = (req, res) => {
    const { id } = req.user;
    const data = req.body;

    const query = `UPDATE users SET ? WHERE id=${id}`;

    connection.query(query, data, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });

        try {
            return res.status(200).json({
                message: "User changed successfully",
                data: result,
                check: true,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });
        }
    });
};

// Delete user
export const deleteUser = (req, res) => {
    const { id } = req.user;

    const query = `DELETE FROM users WHERE id=${id}`;

    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });

        try {
            return res.status(200).json({
                message: "User successfully deleted",
                data: result,
                check: true,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });
        }
    });
};
