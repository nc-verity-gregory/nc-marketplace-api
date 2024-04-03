const { selectCategories, insertCategory } = require("../models/categories");

exports.getCategories = async (req, res, next) => {
  const categories = await selectCategories();
  res.status(200).send({ categories });
};

exports.postCategory = async (req, res, next) => {
  const { category_name } = req.body;
  const category = await insertCategory(category_name);

  res.status(201).send({ category });
};
