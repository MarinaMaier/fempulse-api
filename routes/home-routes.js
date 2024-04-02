const router = require("express").Router();
const homeController = require("../controllers/home-controller");

router.route("/calendar/:date").get(homeController.index).post(homeController.addEvents)

module.exports = router;