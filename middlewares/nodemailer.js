import nodemailer from "nodemailer";

const sendMail = async (email, otp) => {

    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: "08mjarir@gmail.com",
            pass:'adffrhxvenocbcsm'
        }

    });

    const mailOptions = {

        from: "08mjarir@gmail.com",

        to: email,

        subject: "OTP Verification",

        html: `
            <h2>Your OTP is: ${otp}</h2>
        `
    };

    await transporter.sendMail(mailOptions);

};

export default sendMail;