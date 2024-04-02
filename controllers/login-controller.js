const knex = require("knex")(require("../knexfile"));
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if user exists with the provided email and password
      const user = await knex("signup")
        .where({ email, password })
        .first();
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const token = jwt.sign({username: user.id}, key)
      // If user exists, return success response
      res.status(200).json({
        message: "Login successful",
        token: token
      });
    } catch (error) {
      res.status(500).json({
        message: `Unable to login: ${error}`,
      });
    }
  };
  
  module.exports = {
    loginUser
  };