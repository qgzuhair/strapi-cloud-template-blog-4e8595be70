"use strict";

// Load the core controller
const coreAuth = require("@strapi/plugin-users-permissions/server/controllers/auth");

module.exports = {
  async register(ctx) {
    try {
      console.log("🔥 CUSTOM REGISTER — Controller loaded");

      // Extract custom fields
      const { userType, ...rest } = ctx.request.body;

      // Allowed values
      const allowedTypes = ["candidate", "company"];
      const finalUserType = allowedTypes.includes(userType)
        ? userType
        : "candidate";

      // Remove userType before sending to Strapi core
      ctx.request.body = rest;

      // Call Strapi default register
      const response = await coreAuth.register(ctx);

      console.log("🔥 User created:", response.user?.email);

      if (response.user) {
        // Update userType field
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          response.user.id,
          {
            data: { userType: finalUserType },
          }
        );

        console.log("🔥 userType updated to:", finalUserType);

        // Send confirmation email manually
        await strapi
          .plugin("users-permissions")
          .service("user")
          .sendConfirmationEmail(response.user);

        console.log("🔥 Confirmation email attempted to send");
      }

      return response;
    } catch (error) {
      console.error("❌ Custom register error:", error);
      throw error;
    }
  },
};