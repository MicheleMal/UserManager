import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.email,
        pass: process.env.pwEmail,
    },
});

export const sendEmailRegister = (email, name, tokenConfirmation) => {
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Confirmation account",
        html: `
        <h1>Dear ${name}</h1>
        <p>Thank you for registering on our website. \nTo complete the registration, please click on the confirmation link below:</p>
        <a href="http://localhost:3000/auth/confirm/${tokenConfirmation}">http://localhost:5000/auth/confirm/${tokenConfirmation}</a>
        <p>If you didn't request the registration, you can ignore this email.</p> `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email ${error.message}`);
        } else {
            console.log(`Email send ${info.response}`);
        }
    });
};

export const sendChangeRoleEmail = (email, role) => {
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Role Change Notification",
        text: `Your role has been changed to ${role} by an administrator or owner.\n\nBest regards,\nThe Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email ${error.message}`);
        } else {
            console.log(`Email send ${info.response}`);
        }
    });
};

export const sendChangeAccountEmail = (email, name) => {
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Account information update",
        text: `Dear ${name},\n\nWe are writing to inform you that changes have been made to your account information personal.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email ${error.message}`);
        } else {
            console.log(`Email send ${info.response}`);
        }
    });
};

export const sendResetPasswordRequest = (email, otp) => {
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Reset Password Request",
        html: `<p>Per cambiare la password inserisci il codice OTP seguente:</p> \n <b>${otp}</b>\n
        <p>Non condividere questo OTP con nessuno.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email ${error.message}`);
        } else {
            console.log(`Email send ${info.response}`);
        }
    });
};
