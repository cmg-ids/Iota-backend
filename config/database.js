const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: process.env.NODE_APP_DATABASE_HOST,
  user: process.env.NODE_APP_DATABASE_USER,
  password: process.env.NODE_APP_DATABASE_PASSWORD,
  database: process.env.NODE_APP_DATABASE_NAME,
});

pool.getConnection((err, connection) => {
  try {
    if (err) {
      throw new Error(err.message);
    }
    connection.release();
    return console.log("Database connected successfully!");
  } catch (error) {
    return console.log(error.message);
  }
});

module.exports = pool.promise();
