import connection from "../utils/connectionDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import { v4 as uuidv4 } from "uuid";
import {
    sendEmailRegister,
    sendResetPasswordRequest,
} from "../utils/emailServices.js";
import { encryptEmail } from "../utils/cryptDecryptEmail.js";

// Register user
export const registerUser = async (req, res) => {
    const { name, surname, email, password, tel_number } = req.body;

    const emailCrypt = encryptEmail(email, process.env.key, process.env.iv);

    const salt = bcrypt.genSaltSync(10);
    const pwHashed = await bcrypt.hash(password, salt);

    const query = `INSERT INTO users(name, surname, email, password, tel_number, role)
                VALUES('${name}', '${surname}', '${emailCrypt}', '${pwHashed}', '${tel_number}', 'user')`;

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
            // Genera token univoco
            const tokenConfirmation = uuidv4();
            sendEmailRegister(email, name, tokenConfirmation);

            const queryToken = `UPDATE users SET token = '${tokenConfirmation}' WHERE id_user = ${result.insertId}`;

            connection.query(queryToken, (error, result2) => {
                if (error) {
                    return res.status(500).json({
                        message: error.message,
                        data: [],
                        check: false,
                    });
                }
                return res.status(201).json({
                    message: "Registration done",
                    data: result,
                    check: false,
                });
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
    const emailCrypt = encryptEmail(email, process.env.key, process.env.iv);

    const query = `SELECT * FROM users WHERE email="${emailCrypt}"`;

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
            if (
                (await bcrypt.compare(password, result[0].password)) &&
                result[0].isVerified === 1
            ) {
                const token = jwt.sign(
                    {
                        id: result[0].id_user,
                        role: result[0].role,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d", // 7 giorni
                    }
                );

                const expiresInMilliseconds = 7 * 24 * 60 * 60 * 1000;

                return res
                    .cookie("jwtToken", token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + expiresInMilliseconds), // 7 giorni
                    }) // Aggiungere httpOnly e secure
                    .status(200)
                    .json({
                        message: "Login is done",
                        data: token,
                        check: true,
                    });
                // return res.status(200).json({
                //     message: "Login in done",
                //     data: token,
                //     check: true,
                // });
            } else if (
                (await bcrypt.compare(password, result[0].password)) &&
                result[0].isVerified === 0
            ) {
                return res.status(401).json({
                    message: "Unverified account",
                    data: [],
                    check: false,
                });
            } else {
                return res.status(404).json({
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

export const confirmAccount = (req, res) => {
    const { tokenConfirmation } = req.params;

    const query = `UPDATE users SET isVerified = 1 WHERE token = '${tokenConfirmation}' `;

    connection.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: error.message,
                data: [],
                check: false,
            });
        }

        if (result.changedRows === 0) {
            return res.status(404).json({
                message: "Token null",
                data: [],
                check: false,
            });
        }

        try {
            return res.status(200).json({
                message: "Account verified",
                data: result,
                check: false,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                data: [],
                check: false,
            });
        }
    });
};

export const resetPasswordRequest = (req, res) => {
    const { email } = req.body;

    const otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: true,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    const emailCrypt = encryptEmail(email, process.env.key, process.env.iv);
    const query = `UPDATE users SET otp = '${otp}' WHERE email='${emailCrypt}' `;

    connection.query(query, (error, result) => {
        if (error) {
            return res.status(400).json({
                message: error.message,
                data: [],
                check: false,
            });
        }

        if (result.changedRows === 0) {
            return res.status(404).json({
                message: "Incorrect email",
                data: [],
                check: false,
            });
        }

        try {
            sendResetPasswordRequest(email, otp);
            return res.status(200).json({
                message: "OTP code created",
                data: result,
                check: true,
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                data: [],
                check: false,
            });
        }
    });

    console.log(`Codice otp: ${otp}`);
};

export const resetPassword = (req, res) => {
    const { otp, password } = req.body;

    const query = `SELECT email FROM users WHERE BINARY otp='${otp}' `;

    connection.query(query, async (error, result) => {
        if (error) {
            return res.status(400).json({
                message: error.message,
                data: [],
                check: false,
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Invalid otp code",
                data: [],
                check: false,
            });
        }

        try {
            const salt = bcrypt.genSaltSync(10);
            const pwHashed = await bcrypt.hash(password, salt);

            const updatePwQuery = `UPDATE users SET password = '${pwHashed}', otp=NULL WHERE email = '${result[0].email}' `;

            connection.query(updatePwQuery, (error, result2)=>{
                if (error) {
                    return res.status(400).json({
                        message: error.message,
                        data: [],
                        check: false,
                    });
                }

                try {
                    return res.status(200).json({
                        message: "Password successfully changed",
                        data: result2,
                        check: true,
                    });
                } catch (error) {
                    return res.status(400).json({
                        message: error.message,
                        data: [],
                        check: false,
                    });
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                data: [],
                check: false,
            });
        }
    });
};