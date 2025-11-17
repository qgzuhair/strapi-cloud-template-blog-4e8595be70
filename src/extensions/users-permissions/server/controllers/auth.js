"use strict";

const authController =
  require("@strapi/plugin-users-permissions/server/controllers/auth");

module.exports = {
  async register(ctx) {
    strapi.log.info("🔥 CUSTOM REGISTER OVERRIDE ACTIVE!");

    // Run Strapi’s default logic
    const result = await authController.register(ctx);

    // If user created, send confirmation email manually
    if (result.user) {
      strapi.log.info("📧 Sending confirmation email…");

      await strapi
        .plugin("users-permissions")
        .service("user")
        .sendConfirmationEmail(result.user);
    }

    return result;
  },
};
