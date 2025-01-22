const express = require("express")
const router = express.Router()
const { createArticle, getArticleById, getAllArticles, updateArticle, deleteArticle } = require('../controllers/articleController');

router.get("/:id", getArticleById)

router.post("/user/", getAllArticles)

router.post('/', createArticle)

router.patch("/:id", updateArticle)

router.delete("/:id", deleteArticle)

module.exports = router