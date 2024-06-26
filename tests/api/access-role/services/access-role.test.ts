import { AccessRolePermissions } from "../../../../src/api/access-role/enums/access-role";
import AccessRoleService from "../../../../src/api/access-role/services/access-role";
import {
  insertAccessRoles,
  noAccessRole,
  superAdminRole,
} from "../../../mocks/access-roles";
import { authenticatedUser, insertUsers } from "../../../mocks/users";

describe("acess-role services", () => {
  beforeEach(async () => {
    await insertAccessRoles();
    await insertUsers();
  });

  describe("hasPermission", () => {
    const userHasPermission = (user, permission) =>
      AccessRoleService({ strapi }).hasPermission(
        { state: { user } },
        permission,
      );

    it("returns true if no user, since it's being accessed by API Token -> allow everything", async () => {
      expect(
        await userHasPermission(null, AccessRolePermissions.accessRoles_find),
      ).toBe(true);
    });

    it("returns true if user has permission", async () => {
      expect(
        await userHasPermission(
          authenticatedUser,
          AccessRolePermissions.accessRoles_find,
        ),
      ).toBe(true);
    });

    it("returns false if user does not have permission", async () => {
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        authenticatedUser.id,
        { data: { accessRole: noAccessRole.id } },
      );

      expect(
        await userHasPermission(
          authenticatedUser,
          AccessRolePermissions.accessRoles_find,
        ),
      ).toBe(false);
    });

    it("returns false if user does not have an accessRole", async () => {
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        authenticatedUser.id,
        { data: { accessRole: null } },
      );

      expect(
        await userHasPermission(
          authenticatedUser,
          AccessRolePermissions.accessRoles_find,
        ),
      ).toBe(false);
    });
  });

  describe("hasAnyPermission", () => {
    const userHasAnyPermission = (user, permissions) =>
      AccessRoleService({ strapi }).hasAnyPermission(
        { state: { user } },
        permissions,
      );

    it("returns true if no user, since it's being accessed by API Token -> allow everything", async () => {
      expect(
        await userHasAnyPermission(null, [
          AccessRolePermissions.accessRoles_find,
        ]),
      ).toBe(true);
    });

    it("returns true if user has permission to all of them", async () => {
      expect(
        await userHasAnyPermission(authenticatedUser, [
          AccessRolePermissions.accessRoles_find,
          AccessRolePermissions.accessRoles_findOne,
        ]),
      ).toBe(true);
    });

    it("returns true if user has permission to at least one of them", async () => {
      await strapi.entityService.update(
        "api::access-role.access-role",
        superAdminRole.id,
        { data: { [AccessRolePermissions.accessRoles_find]: false } },
      );

      expect(
        await userHasAnyPermission(authenticatedUser, [
          AccessRolePermissions.accessRoles_find,
          AccessRolePermissions.accessRoles_findOne,
        ]),
      ).toBe(true);
    });

    it("returns false if user has permission to none of them", async () => {
      await strapi.entityService.update(
        "api::access-role.access-role",
        superAdminRole.id,
        {
          data: {
            [AccessRolePermissions.accessRoles_find]: false,
            [AccessRolePermissions.accessRoles_findOne]: false,
          },
        },
      );

      expect(
        await userHasAnyPermission(authenticatedUser, [
          AccessRolePermissions.accessRoles_find,
          AccessRolePermissions.accessRoles_findOne,
        ]),
      ).toBe(false);
    });
  });

  describe("redactFields", () => {
    const redactFields = (data, fields) =>
      AccessRoleService({ strapi }).redactFields(data, fields);

    it("redacts specified fields from data", async () => {
      const data = {
        id: 1,
        attributes: {
          name: "John",
          email: "john@example.com",
          phone: null,
          address: {
            data: {
              id: 2,
              attributes: {
                street: "123 Main St",
                city: "New York",
                country: "USA",
              },
            },
          },
          orders: {
            data: [
              {
                id: 3,
                attributes: {
                  sku: "123",
                  quantity: 2,
                },
              },
              {
                id: 4,
                attributes: {
                  sku: "456",
                  quantity: 1,
                },
              },
            ],
          },
        },
      };

      await redactFields(data, ["email", "phone", "address", "orders"]);

      expect(data).toEqual({
        id: 1,
        attributes: {
          name: "John",
          address: {
            data: {
              id: null,
              attributes: {},
            },
          },
          orders: {
            data: [
              {
                id: null,
                attributes: {},
              },
              {
                id: null,
                attributes: {},
              },
            ],
          },
        },
      });
    });
  });
});
