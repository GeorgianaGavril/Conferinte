const express = require("express")
const router = express.Router()
const { loginUser } = require('../controllers/authController');
const { createUser } = require('../controllers/userController');

router.post('/sign-up', createUser)
router.post('/login', loginUser)

module.exports = router