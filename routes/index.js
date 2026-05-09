const controller = require("../controllers/")
const router = require("express").Router()

router.get("/", controller.getAllData)

router.get("/:contact_id", controller.getData)


module.exports = router