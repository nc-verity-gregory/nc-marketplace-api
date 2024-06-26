process.env.NODE_ENV = "development";

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test/index");

beforeEach(async () => {
  await seed(testData);
});

afterAll(async () => {
  await db.end();
});

describe("Rate Limiter", () => {
  it("should respond with an error if more than 25 requests are made within 3 minutes", async () => {
    const promiseToMakeApiRequest = [];
    for (let index = 0; index < 25; index++) {
      promiseToMakeApiRequest.push(request(app).get("/api/users"));
    }
    await Promise.all(promiseToMakeApiRequest);
    await request(app)
      .get("/api/users")
      .expect(429)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(
          "Received too many requests - check your code for infinite loops. You can send requests again in 3 minutes."
        );
      });
  });
});
