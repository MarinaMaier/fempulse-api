const knex = require("knex")(require("../knexfile"));

const signupAttr = ["email", "password"];

const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    for (const field of signupAttr) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `invalid input: ${field} was null or empty`,
        });
      }
    }

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmailRegex.test(email)) {
      return res.status(400).json({
        message: `invalid input - contact_email: '${email}' is formatted incorrectly, please use '<example-email>@<example-domain>.<example-suffix>' format`,
      });
    }

    // Do the password check here
    const validPassword = /^(?=.*[a-zA-Z])(?=.*\d)/;
    if (!validPassword.test(password)) {
      return res.status(400).json({
        message: `invalid password`,
      });
    }

    // Check if user exists with the provided email and password
    const user = await knex("signup").where({ email, password }).first();

    if (user) {
      return res.status(401).json({
        message: "User exists",
      });
    }

    const result = await knex("signup").insert(req.body);

    const newUserId = result[0];
    const createdUser = await knex("signup")
      .where({ id: newUserId })
      .select(signupAttr)
      .first();

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to add new user: ${error}`,
    });
  }
};

module.exports = {
  addUser,
};
