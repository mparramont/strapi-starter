import { setupStrapi } from "./strapi";

export default async function globalSetup() {
  await setupStrapi();
}
