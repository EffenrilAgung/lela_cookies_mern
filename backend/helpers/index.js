import nodemailer from 'nodemailer';

const sendEmail = (payload) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `${process.env.USERNAME_EMAIL}`,
      pass: `${process.env.PASSWORD_EMAIL}`,
    },
  });
  return transporter
    .sendMail(payload)
    .then((info) =>
      console.log(`email terkirim : ${JSON.stringify(info.envelope.to)}`)
    )
    .catch((err) => console.log(`terjadi kesalahan : ${err}`));
};

export default sendEmail;
