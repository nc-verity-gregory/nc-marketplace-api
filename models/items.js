const db = require("../db/connection");
const { selectCategories } = require("./categories");
const { getColumnNames } = require("./getColNames");

exports.selectItems = async (category_name, limit, p, queries) => {
  const cols = await getColumnNames("items");
  const categories = await selectCategories();
  const catNames = categories.map(({ category_name }) => category_name);
  const queryParams = [];

  if ((limit && !p) || (p && !limit)) {
    return Promise.reject({
      status: 400,
      msg: "limit and p queries must be provided in conjunction",
    });
  }

  // default query string
  let queryStr = `WITH allItems AS (
    SELECT items.*, users.username AS listed_by
    FROM items
    LEFT JOIN users ON items.listed_by = users.user_id
    LEFT JOIN orders ON items.item_id = orders.item_id
    WHERE orders.item_id IS NULL
),
totalCount AS (
    SELECT COUNT(*) ::INT as total FROM allItems
)
SELECT DISTINCT *, (SELECT total FROM totalCount) as total_items
FROM allItems`;

  // filter by category
  if (category_name) {
    if (catNames.includes(category_name)) {
      queryParams.push(category_name);
      const categoryIndex = queryParams.indexOf(category_name);
      queryStr += ` WHERE category_name = $${categoryIndex + 1}`;
    } else {
      return Promise.reject({ status: 404, msg: "category not found" });
    }
  }

  // min price
  if (queries.min_price) {
    const price = Number(queries.min_price);
    if (!Number.isInteger(price)) {
      return Promise.reject({
        status: 400,
        msg: "min_price must be an integer",
      });
    }
    queryParams.push(price);
    const priceIndex = queryParams.indexOf(price);
    queryStr += ` WHERE price >= $${priceIndex + 1}`;
  }

  // max price
  if (queries.max_price) {
    const price = Number(queries.max_price);
    if (!Number.isInteger(price)) {
      return Promise.reject({
        status: 400,
        msg: "max_price must be an integer",
      });
    }
    queryParams.push(price);
    const priceIndex = queryParams.indexOf(price);
    queryStr += ` WHERE price <= $${priceIndex + 1}`;
  }

  // search capability - fuzzy search not implemented
  if (queries.search) {
    const searchTerms = queries.search
      .split(" ")
      .filter((search) => search !== "or");

    queryStr += ` WHERE `;
    searchTerms.forEach((search, index) => {
      const caseInsensitiveSearch = `%${search}%`;
      queryParams.push(caseInsensitiveSearch);

      const searchIndex = queryParams.indexOf(caseInsensitiveSearch);

      queryStr += `(item_name ILIKE $${searchIndex + 1} OR description ILIKE $${
        searchIndex + 1
      } OR category_name ILIKE $${searchIndex + 1})`;
      if (index !== searchTerms.length - 1) {
        queryStr += ` OR `;
      }
    });
  }

  // sort by validation
  if (queries.sort_by) {
    if (cols.includes(queries.sort_by)) {
      queryStr += ` ORDER BY ${queries.sort_by}`;
    } else {
      return Promise.reject({
        status: 400,
        msg: "sort_by must be one of the following values: item_id, item_name, price, category_name",
      });
    }
  }

  // order validation
  if (queries.order) {
    if (["asc", "desc"].includes(queries.order)) {
      queryStr += ` ${queries.order}`;
    } else {
      return Promise.reject({
        status: 400,
        msg: "order must be one of the following values: asc, desc",
      });
    }
  }

  // if no sort by, default ordering
  if (!queries.sort_by) {
    queryStr += ` ORDER BY item_name ASC`;
  }

  if (limit && p) {
    queryStr += ` LIMIT ${limit} OFFSET ${p}`;
  }

  const { rows } = await db.query(queryStr, queryParams);

  return rows;
};

exports.selectItemById = async (item_id) => {
  if (!item_id) {
    return Promise.reject({
      status: 400,
      msg: "item_id is a required field",
    });
  }
  const { rows } = await db.query(
    `SELECT items.item_id, items.item_name, items.description, items.img_url, items.price, items.category_name, users.username AS listed_by FROM items LEFT JOIN users ON items.listed_by = users.user_id WHERE item_id = $1`,
    [item_id]
  );
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "item not found" });
  }
  return rows[0];
};

exports.insertItem = async (item) => {
  const validKeys = await getColumnNames("items");
  const categories = (await selectCategories()).map(
    ({ category_name }) => category_name
  );
  // key validation
  for (const key in item) {
    if (!validKeys.includes(key)) {
      return Promise.reject({
        status: 400,
        msg: `Unexpected additional key: ${key}`,
      });
    }
  }

  const { item_name, description, img_url, price, category_name, listed_by } =
    item;
  // category validation
  if (!categories.includes(category_name)) {
    return Promise.reject({ status: 404, msg: "Category not found" });
  }

  const queryStr = `INSERT INTO items(item_name,description, img_url,price, category_name, listed_by) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *`;

  const { rows } = await db.query(queryStr, [
    item_name,
    description,
    img_url,
    price,
    category_name,
    listed_by,
  ]);

  return rows[0];
};

exports.deleteItemById = async (item_id, username) => {
  const itemCheck = `
WITH allItems AS (
    SELECT items.item_id, items.item_name, items.description, items.price, items.category_name, users.username AS listed_by 
    FROM items 
    LEFT JOIN users ON items.listed_by = users.user_id
)
SELECT * 
FROM allItems
WHERE listed_by = $1 AND item_id = $2`;

  const foundItem = await db.query(itemCheck, [username, item_id]);
  if (foundItem.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "No item matches parameters" });
  }
  await db.query(`DELETE FROM orders WHERE item_id = $1  RETURNING *`, [
    item_id,
  ]);
  await db.query(`DELETE FROM baskets WHERE item_id = $1 RETURNING *`, [
    item_id,
  ]);
  const { rows } = await db.query(
    `DELETE FROM items WHERE item_id = $1 RETURNING *`,
    [item_id]
  );
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "item not found" });
  }
};
