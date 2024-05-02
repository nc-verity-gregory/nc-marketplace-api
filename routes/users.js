const express = require("express");
const { withErrorHandling } = require("../controllers/errors");
const {
  getUsers,
  postUser,
  getUserByUsername,
  patchUserByUsername,
  getUsersBasket,
  postItemToBasket,
  deleteItemFromUsersBasket,
  getUsersOrders,
  postItemToOrders,
  getUsersItems,
} = require("../controllers/users");
const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(withErrorHandling(getUsers))
  .post(withErrorHandling(postUser));

usersRouter
  .route("/:username")
  .get(withErrorHandling(getUserByUsername))
  .patch(withErrorHandling(patchUserByUsername));

usersRouter
  .route("/:username/basket")
  .get(withErrorHandling(getUsersBasket))
  .post(withErrorHandling(postItemToBasket));

usersRouter
  .route("/:username/basket/:item_id")
  .delete(withErrorHandling(deleteItemFromUsersBasket));

usersRouter
  .route("/:username/orders")
  .get(withErrorHandling(getUsersOrders))
  .post(withErrorHandling(postItemToOrders));

usersRouter
  .route("/:username/listed_items")
  .get(withErrorHandling(getUsersItems));
module.exports = usersRouter;
