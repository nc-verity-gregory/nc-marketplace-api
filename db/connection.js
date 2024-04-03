const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});
console.log(`**Running in ${ENV} ENV**`);

module.exports = new Pool({ max: 2 });
