let bodyParser = require("body-parser")
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let userController = require('../controllers/userController')

const express = require('express')
const router = express.Router()

//define routes here
router.get('/', userController.user_list)

router.post('/', urlencodedParser, userController.user_create)

module.exports = router
