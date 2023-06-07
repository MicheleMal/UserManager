import connection from "../db/connectionDB.js";

// Register user
// FIXME: Sostituire undefined con null
export const registerUser = (req, res) => {
    const {
        name,
        surname,
        email,
        password,
        fiscal_code,
        tel_number,
        address,
        postal_code
    } = req.body;

    const query = `INSERT INTO users(name, surname, email, password, fiscal_code, tel_number, address, postal_code)
                VALUES('${name}', '${surname}', '${email}', '${password}', '${fiscal_code}', '${tel_number}', '${address}', '${postal_code}')`;

                console.log(query);
    connection.query(query, (error, result) => {
        if (error)
            return res
                .status(400)
                .json({ message: error.message, data: result, check: false });

        try {
            return res
                .status(400)
                .json({
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
