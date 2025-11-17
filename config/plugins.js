module.exports = {
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // TLS (not SSL)
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
},
      settings: {
        defaultFrom: process.env.SMTP_FROM,
        defaultReplyTo: process.env.SMTP_REPLY_TO,
      },
    },
  },
};
