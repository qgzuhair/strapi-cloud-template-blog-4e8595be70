module.exports = (plugin) => {
  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    const { userType, ...rest } = ctx.request.body;

    // Validate safe userTypes
    const allowedTypes = ["candidate", "company"];
    const finalUserType = allowedTypes.includes(userType)
      ? userType
      : "candidate";

    // Clean request body before forwarding
    ctx.request.body = { ...rest };

    // Run default Strapi register method
    const response = await originalRegister(ctx);

    if (response.user) {
      // Assign userType after user is created
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        response.user.id,
        { data: { userType: finalUserType } }
      );

      // 🔥 VERY IMPORTANT: Send confirmation email manually
      await strapi
        .plugin("users-permissions")
        .service("user")
        .sendConfirmationEmail(response.user);
    }

    return response;
  };

  return plugin;
};
