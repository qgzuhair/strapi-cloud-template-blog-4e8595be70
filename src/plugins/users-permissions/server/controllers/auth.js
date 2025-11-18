"use strict";

module.exports = (plugin) => {
  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    console.log("🔥 CUSTOM REGISTER OVERRIDE EXECUTED");

    const { userType, ...rest } = ctx.request.body;

    const allowedTypes = ["candidate", "company"];
    const finalUserType = allowedTypes.includes(userType)
      ? userType
      : "candidate";

    ctx.request.body = { ...rest };

    const response = await originalRegister(ctx);

    if (response.user) {
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        response.user.id,
        { data: { userType: finalUserType } }
      );

      await strapi
        .plugin("users-permissions")
        .service("user")
        .sendConfirmationEmail(response.user);

      console.log("📧 Confirmation email triggered for:", response.user.email);
    }

    return response;
  };

  return plugin;
};
