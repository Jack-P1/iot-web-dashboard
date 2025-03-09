const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const userController = require('../controllers/userController')

const express = require('express')
const router = express.Router()

//define routes here
router.get('/', auth.verifyToken, userController.user_list)

router.post('/', urlencodedParser, userController.user_create)

router.post('/login', urlencodedParser, userController.user_login)

module.exports = router
