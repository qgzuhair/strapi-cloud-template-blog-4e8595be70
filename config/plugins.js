module.exports = {
  email: {
  config: {
    provider: 'sendmail',
    providerOptions: {
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // IMPORTANT for HostGator
      },
    },
    settings: {
      defaultFrom: process.env.SMTP_FROM,
      defaultReplyTo: process.env.SMTP_REPLY_TO,
    },
  },
},
};
