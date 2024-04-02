const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  try {
    //To be used in case of an update to passport js
    res.status(200);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
};

module.exports = {
  logout,
};
