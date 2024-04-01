import request from "supertest";
import { insertAccessRoles, noAccessRole } from "../mocks/access-roles";
import { authenticatedUser, insertUsers } from "../mocks/users";
import issueJwt from "../helpers/issueJwt";

describe("/api/access-roles", () => {
  beforeEach(async () => {
    await insertAccessRoles();
    await insertUsers();
  });

  describe("GET /api/access-roles", () => {
    const getAccessRoles = async ({ jwt }: { jwt?: string } = {}) => {
      const getRequest = request(strapi.server.httpServer).get(
        "/api/access-roles"
      );
      return jwt
        ? getRequest.set("Authorization", `Bearer ${jwt}`)
        : getRequest;
    };

    describe("with a public user (non-authenticated)", () => {
      it("returns 401", async () => {
        const response = await getAccessRoles();

        expect(response.status).toBe(401);
      });
    });

    describe("with an authenticated user", () => {
      let jwt: string;
      beforeAll(() => {
        jwt = issueJwt(authenticatedUser);
      });

      it("returns access roles, if the user has permission for it", async () => {
        const response = await getAccessRoles({ jwt });

        expect(response.status).toBe(200);
        expect(
          response.body.data
            .map((accessRole) => accessRole.attributes.name)
            .sort()
        ).toEqual(["No Access", "Super Admin"]);
      });

      it("returns 403, if the user does not have permission for it", async () => {
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          authenticatedUser.id,
          { data: { accessRole: noAccessRole.id } }
        );
        const response = await getAccessRoles({ jwt });

        expect(response.status).toBe(403);
      });
    });
  });
});
