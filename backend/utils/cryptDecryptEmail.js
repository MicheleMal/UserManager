import crypto from "crypto";

const algorithm = "aes-256-cbc";

export const encryptEmail = (email, key, iv) => {
    const chiper = crypto.createCipheriv(
        algorithm,
        key,
        Buffer.from(iv, "hex")
    );

    let encryptedEmail = chiper.update(email, "utf-8", "hex");
    encryptedEmail += chiper.final("hex");
    return encryptedEmail;
};

export const decryptEmail = (email, key, iv) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(iv, "hex")
    );

    let decryptedEmail = decipher.update(email, "hex", "utf-8");
    decryptedEmail += decipher.final("utf-8");

    return decryptedEmail;
};
