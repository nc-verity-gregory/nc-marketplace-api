const {
  selectBasketByUsername,
  postItemToBasket,
  deleteItemFromBasket,
} = require("../models/basket");
const { getColumnNames } = require("../models/getColNames");
const { selectItemById } = require("../models/items");
const {
  selectOrdersByUsername,
  postItemToOrders,
} = require("../models/orders");
const {
  selectUsers,
  insertUser,
  selectUserByUsername,
  updateUserByUsername,
  fetchUsersItems,
} = require("../models/users");

exports.getUsers = async (req, res) => {
  const users = await selectUsers();
  res.status(200).send({ users });
};

exports.postUser = async (req, res) => {
  const userObj = req.body;
  const user = await insertUser(userObj);
  res.status(201).send({ user });
};

exports.getUserByUsername = async (req, res) => {
  const user = await selectUserByUsername(req.params.username);
  res.status(200).send({ user });
};

exports.patchUserByUsername = async (req, res) => {
  const userUpdates = req.body;
  const { username } = req.params;
  const user = await updateUserByUsername(username, userUpdates);
  res.status(200).send({ user });
};

exports.getUsersBasket = async (req, res) => {
  const [items] = await Promise.all([
    selectBasketByUsername(req.params.username),
    selectUserByUsername(req.params.username),
  ]);

  res.send({ items });
};

exports.postItemToBasket = async (req, res) => {
  const [item] = await Promise.all([
    selectItemById(req.body.item_id),
    selectUserByUsername(req.params.username),
  ]);
  await postItemToBasket(req.params.username, req.body.item_id);

  res.status(201).send({ item });
};

exports.postItemToOrders = async (req, res) => {
  const [item] = await Promise.all([
    selectItemById(req.body.item_id),
    selectUserByUsername(req.params.username),
  ]);
  await postItemToOrders(req.params.username, req.body.item_id);
  res.status(201).send({ item });
};

exports.deleteItemFromUsersBasket = async (req, res) => {
  const { username, item_id } = req.params;
  await Promise.all([selectItemById(item_id), selectUserByUsername(username)]);
  await deleteItemFromBasket(username, item_id);
  res.status(204).send();
};

exports.getUsersOrders = async (req, res) => {
  const [items] = await Promise.all([
    selectOrdersByUsername(req.params.username),
    selectUserByUsername(req.params.username),
  ]);
  res.send({ items });
};

exports.getUsersItems = async (req, res) => {
  const { username } = req.params;
  const [_, items] = await Promise.all([
    selectUserByUsername(username),
    fetchUsersItems(username),
  ]);

  res.status(200).send({ items });
};
