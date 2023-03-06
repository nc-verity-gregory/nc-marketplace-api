const { NODE_ENV = "dev", SEMINAR_GROUP } = process.env;
require("dotenv").config({ path: `./.env.${NODE_ENV}.${SEMINAR_GROUP}` });

const { DATABASE_URL } = process.env;

const dbConfig = {
  client: "pg",
  connection: {
    database: NODE_ENV === "test" ? "nc_marketplace_test" : "nc_marketplace",
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
  pool: {
    min: 1,
    max: 2,
  },
};

if (NODE_ENV === "production") {
  dbConfig.connection = {
    connectionString: DATABASE_URL,
  };
}

module.exports = dbConfig;
