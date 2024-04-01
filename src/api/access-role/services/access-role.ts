/**
 * access-role service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::access-role.access-role",
  ({ strapi }) => ({
    async hasPermission(ctx, permission) {
      const { user } = ctx.state;
      // if there is no user, it's being accessed by access token, so allow everything
      if (!user) return true;

      // OPTIMIZATION: this can be improved by overriding the loading of the user
      // in the users-permissions plugin to include the accessRole
      const userWithAccessRole = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        user.id,
        { populate: ["accessRole"] }
      );

      if (!userWithAccessRole.accessRole) return false;

      return !!userWithAccessRole.accessRole[permission];
    },

    async hasAnyPermission(ctx, permissions) {
      // TODO: optimize by loading the userWithAccessRole only once
      return (
        await Promise.all(
          permissions.map((permission) => this.hasPermission(ctx, permission))
        )
      ).includes(true);
    },

    async redactFields(data, fields) {
      const redactStrapiData = (strapiData) => {
        strapiData.id = null;
        Object.keys(strapiData.attributes).forEach((nestedField) => {
          redactAttribute(strapiData, nestedField);
        });
      };
      const redactAttribute = (data, field) => {
        if (data.attributes[field]?.data) {
          if (Array.isArray(data.attributes[field].data)) {
            data.attributes[field].data.forEach((nestedData) => {
              redactStrapiData(nestedData);
            });
          } else if (typeof data.attributes[field].data === "object") {
            redactStrapiData(data.attributes[field].data);
          }
        } else {
          delete data.attributes[field];
        }
      };

      fields.forEach((field) => {
        redactAttribute(data, field);
      });
    },
  })
);
