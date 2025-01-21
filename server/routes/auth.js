const express = require("express")
const router = express.Router()
const { loginUser } = require('../controllers/authController');
const { createUser } = require('../controllers/userController');

// Rutele pentru inregistrare si pentru autentificare
router.post('/sign-up', createUser)
router.post('/login', loginUser)

module.exports = router