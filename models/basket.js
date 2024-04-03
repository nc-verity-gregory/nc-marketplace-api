const db = require("../db/connection");

exports.selectBasketByUsername = async (username) => {
  const queryStr = `WITH joinedItems AS (
  SELECT 
    items.item_id, 
    items.item_name, 
    items.description, 
    items.img_url, 
    items.price, 
    items.category_name, 
    items.listed_by, 
    baskets.username AS basket_username
  FROM items
  INNER JOIN baskets ON items.item_id = baskets.item_id
)
SELECT 
  joinedItems.*,
  users.username AS listed_by_username
FROM joinedItems
INNER JOIN users ON joinedItems.listed_by = users.user_id
WHERE joinedItems.basket_username = $1;`;
  const { rows } = await db.query(queryStr, [username]);
  return rows;
};

exports.postItemToBasket = async (username, item_id) => {
  const { rows } = await db.query(
    `WITH inserted_basket AS (
  INSERT INTO baskets (username, item_id)
  VALUES ($1, $2)
  RETURNING *
)
SELECT items.*
FROM items
JOIN inserted_basket ON items.item_id = inserted_basket.item_id;`,
    [username, item_id]
  );
  return rows[0];
};

exports.deleteItemFromBasket = async (username, item_id) => {
  const queryStr = `DELETE FROM baskets WHERE username =$1 AND item_id =$2 RETURNING *`;
  const { rows } = await db.query(queryStr, [username, item_id]);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "item not found in basket" });
  }
};
