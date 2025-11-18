module.exports = {
  type: "content-api",
  routes: [
    {
      method: "POST",
      path: "/auth/local/register",
      handler: "auth.customRegister",
      config: {
        auth: false,
      },
    },
  ],
};
