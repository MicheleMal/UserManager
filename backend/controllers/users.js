import connection from "../db/connectionDB.js";

// Gets all registered users
export const getAllUsers = (req, res) => {
    const query = `SELECT * 
                    FROM users`;

    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });

        try {
            return res
                .status(200)
                .json({ message: "Utenti", data: result, check: true });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });
        }
    });
};

// Get information about a user by a specific id
export const getUserById = (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM users WHERE id=${id}`;

    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });

        try {
            return res.status(200).json({
                message: "Informazioni utente",
                data: result,
                check: true,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });
        }
    });
};

// Change user information
export const modiifyUser = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const query = `UPDATE users SET ? WHERE id=${id}`;

    connection.query(query, data, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });

        try {
            return res.status(200).json({
                message: "Utente modificato con successo",
                data: result,
                check: true,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });
        }
    });
};

// Delete user
export const deleteUser = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM users WHERE id=${id}`;

    connection.query(query, (error, result)=>{
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });

        try {
            return res.status(200).json({
                message: "Utente eliminato con successo",
                data: result,
                check: true,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });
        }
    })
};
