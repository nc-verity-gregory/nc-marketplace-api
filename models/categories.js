const db = require("../db/connection");

exports.selectCategories = async () => {
  const queryStr = "SELECT * FROM categories";
  const { rows } = await db.query(queryStr);
  return rows;
};

exports.selectCategoryByName = async (category_name) => {
  const category = await db("categories")
    .select("*")
    .where("category_name", category_name)
    .first();
  if (!category)
    return Promise.reject({ status: 404, msg: "category not found" });
  return category;
};

exports.insertCategory = async (newCategory) => {
  if (!newCategory) {
    return Promise.reject({
      status: 400,
      msg: "category_name is a required field",
    });
  }
  const queryStr =
    "INSERT INTO categories(category_name) VALUES ($1) RETURNING *";
  const { rows } = await db.query(queryStr, [newCategory]);

  return rows[0];
};
