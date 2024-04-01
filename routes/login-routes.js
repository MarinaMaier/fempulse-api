const router = require("express").Router();
const loginController = require("../controllers/login-controller");

router.route("/").post(loginController.loginUser);

module.exports = router;