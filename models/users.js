const db = require("../db/connection");

exports.selectUsers = async () => {
  const queryStr = "SELECT * FROM users";
  const { rows } = await db.query(queryStr);
  return rows;
};

exports.insertUser = async (userObj) => {
  const passedKeys = Object.keys(userObj);
  if (passedKeys.length > 2) {
    return Promise.reject({ status: 400, msg: "Unexpected additional key(s)" });
  }
  const { username, avatar_url } = userObj;
  if (!username) {
    return Promise.reject({ status: 400, msg: "username is a required field" });
  }

  const queryStr =
    "INSERT INTO users(username, avatar_url) values ($1,$2) RETURNING *";
  const { rows } = await db.query(queryStr, [username, avatar_url]);
  return rows[0];
};

exports.selectUserByUsername = async (username) => {
  const queryStr = `SELECT
  u.username,
  u.avatar_url,
  u.kudos,
  CAST(COUNT(DISTINCT b.item_id) AS INT) items_in_basket,
  CAST(COUNT(DISTINCT o.item_id) AS INT) items_ordered
FROM
  users u
  LEFT JOIN baskets b ON u.username = b.username
  LEFT JOIN orders o ON u.username = o.username
 WHERE u.username = $1
GROUP BY
  u.username, u.avatar_url,u.kudos;`;

  const { rows } = await db.query(queryStr, [username]);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "username not found" });
  }
  return rows[0];
};

exports.updateUserByUsername = async (
  username,
  { kudos_inc = 0, ...userUpdates }
) => {
  const columnsToUpdate = { kudos: kudos_inc, ...userUpdates };
  let queryStr = `UPDATE users SET`;
  const valuesArr = [username];

  // build a nested array of column/value pairs
  const valueGroups = [];
  for (const col in columnsToUpdate) {
    if (col === "kudos" && !Number.isInteger(columnsToUpdate[col])) {
      return Promise.reject({
        status: 400,
        msg: "kudos_inc must be an integer",
      });
    }
    if (col === "username" && columnsToUpdate[col].includes(" ")) {
      return Promise.reject({
        status: 400,
        msg: "usernames cannot contain spaces",
      });
    }
    valueGroups.push([col, columnsToUpdate[col]]);
  }

  // loop the nested array to build a query string
  for (let i = 0; i < valueGroups.length; i++) {
    const [col, value] = valueGroups[i];

    if (col === "kudos") {
      queryStr += ` ${col} = ${col} + ${value}`;
    } else {
      valuesArr.push(value);
      const currPos = valuesArr.length;
      queryStr += `${col} = $${currPos}`;
    }

    if (i !== valueGroups.length - 1) queryStr += `, `;
  }

  queryStr += ` WHERE username = $1 RETURNING *`;

  const { rows } = await db.query(queryStr, valuesArr);

  return rows[0];
};
