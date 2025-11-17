module.exports = (plugin) => {
  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    console.log("🔥 OVERRIDE: Register called");
    console.log("🔥 Incoming body:", ctx.request.body);

    const { userType, ...rest } = ctx.request.body;

    const allowedTypes = ["candidate", "company"];
    const finalUserType = allowedTypes.includes(userType)
      ? userType
      : "candidate";

    console.log("🔥 Final userType:", finalUserType);

    ctx.request.body = { ...rest };

    const response = await originalRegister(ctx);

    console.log("🔥 Default register response:", response);

    if (response.user) {
      console.log("🔥 Updating user with userType...");
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        response.user.id,
        { data: { userType: finalUserType } }
      );

      console.log("🔥 Sending confirmation email...");
      await strapi
        .plugin("users-permissions")
        .service("user")
        .sendConfirmationEmail(response.user);

      console.log("🔥 Confirmation email sent (or attempted)");
    }

    return response;
  };

  console.log("🔥 OVERRIDE LOADED SUCCESSFULLY");

  return plugin;
};