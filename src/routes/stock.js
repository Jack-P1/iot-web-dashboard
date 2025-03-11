const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const stock = require('../controllers/stockController')

const express = require('express')
const router = express.Router()

//define routes here
router.get('/', stock.stock_list)
router.post('/feed', stock.create_feed)
router.post('/group/feed', stock.create_group_feed)

module.exports = router
