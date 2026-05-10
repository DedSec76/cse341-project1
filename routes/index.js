const controller = require("../controllers/")
const router = require("express").Router()

router.get("/", (req, res) => { res.send("Hello World!!"); })

router.get("/contacts", controller.getAllData)
router.get("/contacts/:contact_id", controller.getData)

module.exports = router