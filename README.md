# Strapi Starter

This is a Strapi starter for the latest version as of its setup, 4.22.1. It includes:

- Strapi setup with Typescript and PostgreSQL
- Docker setup with docker-compose for development and test
- Test setup using PostgreSQL as test database
- ESLint and Prettier configuration
- CI configuration for GitHub Actions
- Simple Access Role setup as a Strapi Content-Type

For more information about the motivation for this Starter within PALO IT, check this [Sharepoint page](https://paloit2016.sharepoint.com/sites/WOW/SitePages/Strapi-Guidelines.aspx).

## Available commands

### `develop` (or `dev`)

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
yarn develop
```

### `test`

Launch your tests. Setup based on [this](https://docs.strapi.io/dev-docs/testing) + improved in this repo to allow running tests individually.

```console
yarn test
```

> [!NOTE]
> Because of the way the `strapi` constant is initialised and made available to the tests, the tests must run in band (already specified when running `yarn test`), and `--watch` is not available.

The tests use a test PostgreSQL database that is installed when you run `yarn docker:dev`. This database schema is setup and cleared every time you run the tests, check `tests/setup/strapi.ts` for more details.

If you get duplicate key errors while running tests, it might mean that the database was not cleared properly. To clear it manually, run:

```console
yarn test:reset-database
```

Which will drop the Docker test database container and volume and recreate it.

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.
