const router = require("express").Router();
const calendarController = require("../controllers/calendar-controller");

router.route("/").get(calendarController.index).post(calendarController.add);
router.route('/:id').get(warehousesController.findOne).put(warehousesController.update).delete(warehousesController.remove);
router.route('/:id/inventories').get(warehousesController.inventories);

module.exports = router;