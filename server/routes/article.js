const express = require("express")
const router = express.Router()
const { createArticle, getArticleById, getAllArticles, updateArticle, deleteArticle, getArticlesByAuthorId, getArticlesForReviewers } = require('../controllers/articleController');

router.get("/author/:id", getArticlesByAuthorId)

router.get("/reviewer/:id", getArticlesForReviewers)

router.get("/:id", getArticleById)

router.get("/", getAllArticles)

router.post('/', createArticle)

router.patch("/:id", updateArticle)

router.delete("/:id", deleteArticle)

module.exports = router