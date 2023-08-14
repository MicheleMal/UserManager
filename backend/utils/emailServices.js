import nodemailer from "nodemailer";
import "dotenv/config"

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.email,
        pass: process.env.pwEmail,
    },
});

export const sendSignUpEmail = (email, name ) => {
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Registration Confirmation",
        text: `Dear ${name},\n\nThank you for registering on our website. Your account has been successfully created.\n\nBest regards,\nThe Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email ${error.message}`);
        } else {
            console.log(`Email send ${info.response}`);
        }
    });
};

export const sendChangeRoleEmail = (email, role)=>{
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
}