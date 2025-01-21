const express = require("express")
const router = express.Router()
const { createUser, getUserById, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');

// Am creat endpoint-uri CRUD (create, read, update, delete) 
router.get("/:id", getUserById)

// poate fi utilizat si pentru a selecta utilizatori cu un anumit rol
router.get("", getAllUsers)

router.post('/', createUser)

router.patch("/:id", updateUser)

router.delete("/:id", deleteUser)

module.exports = router