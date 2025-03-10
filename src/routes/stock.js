const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
const stock = require('../controllers/stockController')

const express = require('express')
const router = express.Router()

//define routes here
router.get('/', stock.stock_list)

module.exports = router
