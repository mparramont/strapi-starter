import Strapi, { Strapi as StrapiType } from "@strapi/strapi";
import {
  insertRoles,
  insertPermissions,
} from "../mocks/strapi-roles-and-permissions";
import typescriptUtils from "@strapi/typescript-utils";

let instance: StrapiType;

async function setupStrapi() {
  if (!instance) {
    await typescriptUtils.compile("");

    await Strapi({ distDir: "./dist" }).load();
    instance = strapi;

    await instance.server.mount();

    await insertRoles(instance);
    await insertPermissions(instance);
  }
  return instance;
}

async function cleanupStrapi() {
  //close server to release the db-file
  strapi.server.httpServer.close();

  // drop the schema and thereby all contained objects
  await strapi.db.schema.drop();

  // close db connection
  await strapi.db.connection.destroy();
}

export { setupStrapi, cleanupStrapi };
