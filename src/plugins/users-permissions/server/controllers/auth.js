"use strict";

const coreAuth = require("@strapi/plugin-users-permissions/server/controllers/auth");

module.exports = {
  async register(ctx) {
    console.log("🔥 CUSTOM REGISTER — running");

    const { userType, ...rest } = ctx.request.body;

    const allowedTypes = ["candidate", "company"];
    const finalUserType = allowedTypes.includes(userType)
      ? userType
      : "candidate";

    // Remove userType before default register
    ctx.request.body = rest;

    const response = await coreAuth.register(ctx);

    if (response.user) {
      console.log("🔥 Updating userType to:", finalUserType);

      await strapi.entityService.update(
        "plugin::users-permissions.user",
        response.user.id,
        { data: { userType: finalUserType } }
      );

      console.log("🔥 Sending confirmation email…");

      await strapi
        .plugin("users-permissions")
        .service("user")
        .sendConfirmationEmail(response.user);
    }

    return response;
  },
};
