"use strict";

const coreAuth = require("@strapi/plugin-users-permissions/server/controllers/auth");

module.exports = {
  async register(ctx) {
    console.log("🔥 CUSTOM REGISTER — running");

    // Run Strapi's default register logic
    const response = await coreAuth.register(ctx);

    if (response.user) {
      console.log("🔥 Sending confirmation email…");

      await strapi
        .plugin("users-permissions")
        .service("user")
        .sendConfirmationEmail(response.user);
    }

    return response;
  },
};
