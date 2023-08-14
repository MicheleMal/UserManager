import connection from "../utils/connectionDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {  sendSignUpEmail } from "../utils/emailServices.js";

// Register user
export const registerUser = async (req, res) => {
    const { name, surname, email, password, tel_number } = req.body;

    const pwHashed = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users(name, surname, email, password, tel_number, role)
                VALUES('${name}', '${surname}', '${email}', '${pwHashed}', '${tel_number}', 'user')`;

    connection.query(query, (error, result) => {
        if (error) {
            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: error.message,
                    data: [],
                    check: false,
                });
            }

            return res.status(400).json({
                message: error.message,
                data: [],
                check: false,
            });
        }

        try {
            sendSignUpEmail(email, name);
            return res.status(200).json({
                message: "Registration done",
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

// Login user
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email="${email}"`;

    connection.query(query, async (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });

        if (result.length == 0) {
            return res.status(404).json({
                message: "Incorrect email or password",
                data: [],
                check: false,
            });
        }
        try {
            if (await bcrypt.compare(password, result[0].password)) {
                const token = jwt.sign(
                    {
                        id: result[0].id_user,
                        role: result[0].role,
                    },
                    process.env.JWT_SECRET
                );

                return res.status(200).json({
                    message: "Login in done",
                    data: token,
                    check: true,
                });
            } else {
                return res.status(400).json({
                    message: "Incorrect email or password",
                    data: [],
                    check: false,
                });
            }
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: [], check: false });
        }
    });
};
