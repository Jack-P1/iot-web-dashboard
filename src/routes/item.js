const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const item = require("../controllers/itemController")
const permissions = require("../middleware/permissions")

const express = require('express')
const router = express.Router()

router.get('/', auth.verifyToken, permissions.check_item_ownership, item.get_item)

module.exports = router
