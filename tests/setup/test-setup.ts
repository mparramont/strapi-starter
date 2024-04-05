afterEach(async () => {
  await cleanup();
});

const cleanup = async () => {
  // cleanup plugin-users-permissions
  await cleanupContentType("plugin::users-permissions.user");

  const apiContentTypes = Object.keys(strapi.contentTypes).filter(
    (contentType) => contentType.startsWith("api::"),
  );
  for (const contentType of apiContentTypes) {
    await cleanupContentType(contentType);
  }
};

const cleanupContentType = async (contentType) => {
  await strapi.query(contentType).deleteMany();
};

export { cleanup };
