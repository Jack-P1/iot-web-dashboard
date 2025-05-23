const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
const branch = require('../controllers/branchController')

const express = require('express')
const router = express.Router()

router.get('/', branch.get_branches_for_company)
router.get('/user', auth.verifyToken, branch.get_branches_for_user)

module.exports = router
