/**
 * access-role-can-access policy
 */

import AccessRoleService from "../api/access-role/services/access-role";
import { errors } from "@strapi/utils";
const { ApplicationError } = errors;

export default async (policyContext, config, { strapi }) => {
  const service = AccessRoleService({ strapi });

  if (config.permission)
    return service.hasPermission(policyContext, config.permission);
  if (config.permissions)
    return service.hasAnyPermission(policyContext, config.permissions);

  throw new ApplicationError(
    "access-role-can-access policy requires passing `permission` or `permissions`",
  );
};
