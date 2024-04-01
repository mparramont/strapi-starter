import { cleanupStrapi } from "./strapi";

export default async function globalTeardown() {
  await cleanupStrapi();
}
