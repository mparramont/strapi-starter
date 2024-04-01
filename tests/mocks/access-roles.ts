import { AccessRolePermissions } from "../../src/api/access-role/enums/access-role";

export const superAdminRole = {
  // high id to avoid clashing with ids Strapi uses when creating a model
  id: 10001,
  name: "Super Admin",
  [AccessRolePermissions.accessRoles_find]: true,
  [AccessRolePermissions.accessRoles_create]: true,
  [AccessRolePermissions.accessRoles_findOne]: true,
  [AccessRolePermissions.accessRoles_update]: true,
  [AccessRolePermissions.accessRoles_delete]: true,
};

export const noAccessRole = {
  id: 10002,
  name: "No Access",
  [AccessRolePermissions.accessRoles_find]: false,
  [AccessRolePermissions.accessRoles_create]: false,
  [AccessRolePermissions.accessRoles_findOne]: false,
  [AccessRolePermissions.accessRoles_update]: false,
  [AccessRolePermissions.accessRoles_delete]: false,
};

const accessRoles = [superAdminRole, noAccessRole];

export const insertAccessRoles = async () => {
  await strapi.db
    .query("api::access-role.access-role")
    .createMany({ data: accessRoles });
};

export default accessRoles;
