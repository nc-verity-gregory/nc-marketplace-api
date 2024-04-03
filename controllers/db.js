const db = require("../db/connection");
const devData = require("../db/data/test/index");
const testData = require("../db/data/test/index");
const seed = require("../db/seeds/seed");
const seedData = process.env.NODE_ENV === "test" ? testData : devData;

exports.resetDb = async (req, res, next) => {
  try {
    await db.query(`BEGIN;
LOCK TABLE baskets, orders, items, users, categories;
DROP TABLE baskets;
DROP TABLE orders;
DROP TABLE items;
DROP TABLE users;
DROP TABLE categories;
COMMIT`);
    await seed(seedData);

    res
      .status(200)
      .send({ msg: `db seeded ok with ${process.env.NODE_ENV} data` });
  } catch (err) {
    console.log(err);
    await db.query(`ROLLBACK`);
  }
};
