module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'mail.qualitasglobal.ai'),
        port: env.int('SMTP_PORT', 465),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        secure: env.int('SMTP_PORT') === 465, // true for 465, false for 587
        tls: {
          rejectUnauthorized: true,
        },
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'info@qualitasglobal.ai'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'info@qualitasglobal.ai'),
      },
    },
  },
});
