const { selectCategoryByName } = require("../models/categories");
const { selectItems, insertItem, selectItemById } = require("../models/items");

exports.getItems = async (req, res) => {
  const { category_name, limit, p, ...queries } = req.query;
  const items = await selectItems(category_name, limit, p, queries);
  const total_items = items.length > 0 ? items[0].total_items : 0;
  res.status(200).send({ items, total_items, page: Number(p) });
};

exports.postItem = async (req, res) => {
  const itemToList = req.body;
  const item = await insertItem(itemToList);
  res.status(201).send({ item });
};

exports.getItemById = async (req, res) => {
  const { item_id } = req.params;
  const item = await selectItemById(item_id);
  res.status(200).send({ item });
};
