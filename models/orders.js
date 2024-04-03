const db = require("../db/connection");

exports.selectOrdersByUsername = async (username) => {
  const queryStr = `WITH joinedItems AS (
  SELECT 
    items.item_id, 
    items.item_name, 
    items.description, 
    items.img_url, 
    items.price, 
    items.category_name, 
    items.listed_by, 
    orders.username AS order_username
  FROM items
  INNER JOIN orders ON items.item_id = orders.item_id
)
SELECT 
  joinedItems.*,
  users.username AS listed_by_username
FROM joinedItems
INNER JOIN users ON joinedItems.listed_by = users.user_id
WHERE joinedItems.order_username = $1;`;
  const { rows } = await db.query(queryStr, [username]);
  return rows;
};

exports.postItemToOrders = async (username, item_id) => {
  const { rows } = await db.query(
    `WITH inserted_order AS (
  INSERT INTO orders (username, item_id)
  VALUES ($1, $2)
  RETURNING *
)
SELECT items.*
FROM items
JOIN inserted_order ON items.item_id = inserted_order.item_id;`,
    [username, item_id]
  );

  return rows[0];
};
