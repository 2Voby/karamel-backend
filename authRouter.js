const Router = require("express");
const router = new Router();
const controller = require("./authController");
const roleMiddelware = require("./middelwares/roleMiddelware");

router.post("/login", controller.login);
router.post(
  "/karamelData",
  roleMiddelware(["ADMIN"]),
  controller.editKaramelData
);
router.get("/karamelData", controller.getKaramelData);

module.exports = router;
