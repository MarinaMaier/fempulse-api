const router = require("express").Router();
const signupController = require("../controllers/signup-controller");

router.route("/").post(signupController.addUser);

module.exports = router;