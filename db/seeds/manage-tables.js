const db = require("../connection");

const createTables = async () => {
  const categoriesTable = db.query(
    `CREATE TABLE categories(category_name varchar primary key)`
  );

  const usersTable = db.query(`
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    avatar_url VARCHAR,
    kudos INT DEFAULT 0
  );`);

  await Promise.all([categoriesTable, usersTable]);

  await db.query(`create table items(
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    img_url VARCHAR,
    price INT NOT NULL,
    category_name VARCHAR NOT NULL REFERENCES categories(category_name),
    listed_by INT NOT NULL REFERENCES users(user_id)
  )`);

  const orderTable = db.query(`create table orders(
    order_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL REFERENCES users(username) ON UPDATE CASCADE,
    item_id INT NOT NULL REFERENCES items(item_id)
  )`);

  const basketTable = db.query(`create table baskets(
    basket_id SERIAL PRIMARY KEY, 
    username VARCHAR NOT NULL REFERENCES users(username) ON UPDATE CASCADE,
    item_id INT NOT NULL REFERENCES items(item_id)
    )`);

  await Promise.all([orderTable, basketTable]);
};

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS baskets`);
  await db.query(`DROP TABLE IF EXISTS orders`);
  await db.query(`DROP TABLE IF EXISTS items`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS categories`);
};

module.exports = { createTables, dropTables };
