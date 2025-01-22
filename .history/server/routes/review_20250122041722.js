const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getAssignedArticles
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);
//router.get("/assigned/:reviewerId", getAssignedArticles);


module.exports = router;
