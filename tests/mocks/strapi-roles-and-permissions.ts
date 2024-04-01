const customRole = {
  // high id to avoid clashing with ids Strapi uses when creating a model
  id: 10001,
  name: "Custom",
  type: "custom",
};

const publicRolePermissions = {
  "api::access-role": {
    controllers: {
      "access-role": {
        find: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
};

const authenticatedRolePermissions = {
  "api::access-role": {
    controllers: {
      "access-role": {
        find: {
          enabled: true,
          policy: "",
        },
      },
    },
  },
};

const roles = [customRole];

export const insertRoles = async (strapi) => {
  for (const role of roles) {
    await strapi.plugins["users-permissions"].services.role.createRole(role);
  }
};

export const getRole = async (name) => {
  return strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { name }, populate: ["permissions"] });
};

export const insertPermissions = async (strapi) => {
  const setRolePermissions = async (name, permissions) => {
    const role = await getRole(name);

    await strapi.plugins["users-permissions"].services.role.updateRole(
      role.id,
      { ...role, permissions }
    );
  };

  await setRolePermissions("Public", publicRolePermissions);
  await setRolePermissions("Authenticated", authenticatedRolePermissions);
};

export default roles;
