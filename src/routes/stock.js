const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const stock = require('../controllers/stockController')
const permissions = require("../middleware/permissions")

const express = require('express')
const router = express.Router()

router.get('/', auth.verifyToken, permissions.check_branch_ownership, stock.get_items_for_branch)
router.post('/feed', stock.create_feed)
router.post('/group/feed', stock.create_group_feed)

module.exports = router
