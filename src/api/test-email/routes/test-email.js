export default {
  routes: [
    {
      method: "GET",
      path: "/test-email",
      handler: "test-email.sendTest",
      config: {
        auth: false,
      },
    },
  ],
};
