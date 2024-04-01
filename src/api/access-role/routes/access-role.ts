/**
 * access-role router
 */

import { factories } from "@strapi/strapi";
import { AccessRolePermissions } from "../enums/access-role";

export default factories.createCoreRouter("api::access-role.access-role", {
  config: {
    find: {
      policies: [
        {
          name: "global::access-role-can-access",
          config: {
            permission: [AccessRolePermissions.accessRoles_find],
          },
        },
      ],
    },
    findOne: {
      policies: [
        {
          name: "global::access-role-can-access",
          config: {
            permission: [AccessRolePermissions.accessRoles_findOne],
          },
        },
      ],
    },
    create: {
      policies: [
        {
          name: "global::access-role-can-access",
          config: {
            permission: [AccessRolePermissions.accessRoles_create],
          },
        },
      ],
    },
    update: {
      policies: [
        {
          name: "global::access-role-can-access",
          config: {
            permission: [AccessRolePermissions.accessRoles_update],
          },
        },
      ],
    },
    delete: {
      policies: [
        {
          name: "global::access-role-can-access",
          config: {
            permission: [AccessRolePermissions.accessRoles_delete],
          },
        },
      ],
    },
  },
});
