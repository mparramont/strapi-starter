afterEach(async () => {
  await cleanup();
});

const cleanup = async () => {
  // cleanup plugin-users-permissions
  await cleanupContentType("plugin::users-permissions.user");

  // cleanup api content types
  // This is one way to get a list of the existing content types, might be better ones
  const contentTypes = Object.keys(strapi.services).filter((service) =>
    service.startsWith("api"),
  );
  for (const contentType of contentTypes) {
    await cleanupContentType(contentType);
  }
};

const cleanupContentType = async (contentType) => {
  try {
    await strapi.query(contentType).deleteMany();
  } catch (error) {
    // ignore errors related to missing models, in case services are created
    // that are not tied to Content-Types
    // if (!error.message.match(/Model .+ not found/)) throw error;
  }
};

export { cleanup };
