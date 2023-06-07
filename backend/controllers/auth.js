import connection from "../db/connectionDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register user
export const registerUser = async (req, res) => {
    const { name, surname, email, password, tel_number } = req.body;

    const pwHashed = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users(name, surname, email, password, tel_number)
                VALUES('${name}', '${surname}', '${email}', '${pwHashed}', '${tel_number}')`;

    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });

        try {
            return res.status(400).json({
                message: "Registrazione effettuata",
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

// Login user
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email="${email}"`;

    connection.query(query, async (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });

        try {
            if (result.length == 0) {
                return res.status(400).json({
                    message: "Email o password errati",
                    data: result,
                    check: false,
                });
            }

            if(await bcrypt.compare(password, result[0].password)){
                const token = jwt.sign({
                    id: result[0].id
                },process.env.JWT_SECRET)
                
                return res.status(200).json({message:"Login effettuato", data:token, check:true})
            }

        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });
        }
    });
};
