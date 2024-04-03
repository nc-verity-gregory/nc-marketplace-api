const db = require("../db/connection");

exports.getColumnNames = async (table) => {
  const { rows } = await db.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name = $1",
    [table]
  );

  return rows.map(({ column_name }) => column_name);
};
