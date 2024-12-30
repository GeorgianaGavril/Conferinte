const express = require("express")
const router = express.Router()
const { createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

router.get("/new", (req, res) =>{

})

router.get("/:id", getUserById)

router.post('/', createUser)

router.patch("/:id", updateUser)

router.delete("/:id", deleteUser)

module.exports = router