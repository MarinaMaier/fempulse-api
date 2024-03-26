require("dotenv").config();

//connect setup
module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_LOCAL_HOST,
    database: process.env.DB_LOCAL_DBNAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci", // Specify collation for proper sorting and comparison
    // Add the following line to ensure UTF-8 encoding
    charset: "utf8mb4",
  },
};