import connection from "../utils/connectionDB.js";
import { decryptEmail } from "../utils/cryptDecryptEmail.js";
import {
    sendChangeAccountEmail,
    sendChangeRoleEmail,
} from "../utils/emailServices.js";

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

    const query = `SELECT * FROM users WHERE id_user=${id}`;

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

    const getEmailQuery = `SELECT email, name
                            FROM users
                            WHERE id_user = ${id}`;

    connection.query(getEmailQuery, (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });
        }

        const userEmail = decryptEmail(
            result[0].email,
            process.env.key,
            process.env.iv
        );
        const userName = result[0].name;

        const updateQuery = `UPDATE users SET ? WHERE id_user=${id}`;

        connection.query(updateQuery, data, (error, result) => {
            if (error)
                return res
                    .status(400)
                    .json({ message: error.message, data: [], check: false });

            try {
                sendChangeAccountEmail(userEmail, userName);
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
    });
};

// Change role user
export const modifyRoleUser = (req, res) => {
    const { email, role } = req.body;

    const query = `UPDATE users SET role='${role}' WHERE email='${email}'`;

    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });

        try {
            sendChangeRoleEmail(email, role);
            return res.status(200).json({
                message: "User role changed successfully",
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

    const query = `DELETE FROM users WHERE id_user=${id}`;

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
