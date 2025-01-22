const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByArticleId,
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/article/:id", getReviewsByArticleId);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
