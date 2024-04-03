const format = require("pg-format");
const db = require("../connection");

const { dropTables, createTables } = require("./manage-tables");

const seed = async ({ categories, baskets, items, orders, users }) => {
  await dropTables();
  await createTables();

  const insertCategoriesQueryStr = format(
    `INSERT INTO categories(category_name) VALUES %L RETURNING *`,
    categories.map(({ category_name }) => [category_name])
  );

  const insertUsersQueryStr = format(
    `INSERT INTO users(username, avatar_url) VALUES %L RETURNING *`,
    users.map(({ username, avatar_url }) => [username, avatar_url])
  );

  const insertItemsQueryStr = format(
    `INSERT INTO items(item_name,description, img_url,price, category_name, listed_by) VALUES %L RETURNING *`,
    items.map(
      ({
        item_name,
        description,
        img_url,
        price,
        category_name,
        listed_by,
      }) => [item_name, description, img_url, price, category_name, listed_by]
    )
  );

  const insertOrdersQueryStr = format(
    `INSERT INTO orders( username, item_id) VALUES %L RETURNING *`,
    orders.map(({ user, item_id }) => [user, item_id])
  );

  const insertBasketsQueryStr = format(
    `INSERT INTO baskets(username, item_id) VALUES %L RETURNING *`,
    baskets.map(({ user, item_id }) => [user, item_id])
  );
  const categoriesInsert = db.query(insertCategoriesQueryStr);
  const usersInsert = db.query(insertUsersQueryStr);

  await Promise.all([categoriesInsert, usersInsert]);

  await db.query(insertItemsQueryStr);
  const ordersInsert = db.query(insertOrdersQueryStr);
  const basketsInsert = db.query(insertBasketsQueryStr);

  await Promise.all([ordersInsert, basketsInsert]);
};

module.exports = seed;
