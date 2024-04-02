export default ({ env }) => ({
  connection: {
    client: env("TEST_DATABASE_CLIENT", "postgres"),
    connection: {
      connectionString: env("TEST_DATABASE_URL"),
      host: env("TEST_DATABASE_HOST", "localhost"),
      port: env.int("TEST_DATABASE_PORT", 5442),
      database: env("TEST_DATABASE_NAME", "strapi-starter-database"),
      user: env("TEST_DATABASE_USERNAME", "admin"),
      password: env("TEST_DATABASE_PASSWORD", "admin"),
      ssl: env.bool("TEST_DATABASE_SSL", false) && {
        key: env("TEST_DATABASE_SSL_KEY", undefined),
        cert: env("TEST_DATABASE_SSL_CERT", undefined),
        ca: env("TEST_DATABASE_SSL_CA", undefined),
        capath: env("TEST_DATABASE_SSL_CAPATH", undefined),
        cipher: env("TEST_DATABASE_SSL_CIPHER", undefined),
        rejectUnauthorized: env.bool(
          "TEST_DATABASE_SSL_REJECT_UNAUTHORIZED",
          true,
        ),
      },
      schema: env("TEST_DATABASE_SCHEMA", "public"),
    },
    pool: {
      min: env.int("TEST_DATABASE_POOL_MIN", 2),
      max: env.int("TEST_DATABASE_POOL_MAX", 10),
    },
  },
});
