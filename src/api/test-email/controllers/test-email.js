export default {
  async sendTest(ctx) {
    try {
      const emailService = strapi.plugin('email').service('email');

      await emailService.send({
        to: "syed.zuhair.naqvi@gmail.com",
        from: "info@qualitasglobal.ai",
        subject: "Strapi 5 BigRock SMTP Test Email",
        text: "Hello Zuhair! This is a working test email from Strapi 5.",
      });

      ctx.body = { message: "Email sent successfully!" };
    } catch (error) {
      console.error("Email send error:", error);
      ctx.status = 500;
      ctx.body = {
        error: "Failed to send email",
        details: error.message,
      };
    }
  },
};
