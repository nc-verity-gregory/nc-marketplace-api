const devData = require("../data/dev/index");
const testData = require("../data/test/index");
const seedData = process.env.NODE_ENV === "test" ? testData : devData;
const seed = require("./seed");
const db = require("../connection");

const runSeed = async () => {
  await seed(seedData);
  await db.end();
};

runSeed();
