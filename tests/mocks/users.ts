import { superAdminRole } from "./access-roles";
import { getRole } from "./strapi-roles-and-permissions";

export const authenticatedUser = {
  // high id to avoid clashing with ids Strapi uses when creating a model
  id: 10001,
  username: "internal-1",
  email: "internal-1@dap.com",
  provider: "local",
  confirmed: true,
  blocked: false,
  roleName: "Authenticated",
  accessRole: superAdminRole.id,
};

const users = [authenticatedUser];

export const insertUsers = async () => {
  for await (const user of users) {
    const userWithRole = {
      ...user,
      // we have to load the roles like this because we're not creating
      // the roles ourselves in tests, Strapi creates them on startup
      role: (await getRole(user.roleName)).id,
    };
    await strapi.db
      .query("plugin::users-permissions.user")
      .create({ data: userWithRole });
  }
};
